import { useState, useEffect, useRef } from "react";
import {
  Check,
  CheckCircle,
  FileImage,
  Image,
  Info,
  Mic,
  Play,
  Trash2,
  Type,
  Upload,
  X,
} from "lucide-react";

export default function ReportModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioResult, setAudioResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  const recordingTimerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setActiveTab("text");
      setTextInput("");
      setIsRecording(false);
      setRecordingTime(0);
      setAudioResult(null);
      setUploadedImage(null);
      setImagePreview(null);
      setIsDragging(false);
      setIsSubmitting(false);
      setSubmitted(false);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const url = URL.createObjectURL(blob);
        setAudioResult({ url, duration: recordingTime });
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access denied", err);
      alert(
        "Microphone access is required to record audio. Please allow microphone permission and try again.",
      );
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    clearInterval(recordingTimerRef.current);
  };

  const cancelRecording = () => {
    stopRecording();
    setRecordingTime(0);
    setAudioResult(null);
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    setUploadedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const hasContent = textInput.trim() || audioResult || uploadedImage;

  if (!isOpen) return null;

  const tabs = [
    { id: "text", icon: Type, label: "TYPE" },
    { id: "record", icon: Mic, label: "RECORD" },
    { id: "image", icon: Image, label: "UPLOAD" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-xs">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm overlay-enter"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="relative w-full max-w-[560px] bg-canvas border border-hairline modal-enter max-h-[90vh] flex flex-col"
        style={{ borderRadius: "0px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-xs sm:px-md py-[20px] border-b border-hairline flex-shrink-0">
          <div>
            <p className="text-[11px] font-600 uppercase tracking-[1.1px] text-primary">
              New Report
            </p>
            <h2 className="text-[18px] font-500 leading-[1.4] text-ink mt-[4px]">
              Report a Problem
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-[40px] h-[40px] flex items-center justify-center text-body hover:text-ink transition-colors cursor-pointer"
          >
            <X className="w-[20px] h-[20px]" />
          </button>
        </div>

        {!submitted && (
          <>
            {/* Tabs */}
            <div className="flex border-b border-hairline flex-shrink-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-[8px] py-[14px] text-[11px] font-600 uppercase tracking-[1.1px] transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? "text-primary border-b-2 border-primary bg-canvas-elevated/30"
                      : "text-body hover:text-ink border-b-2 border-transparent"
                  }`}
                >
                  <tab.icon className="w-[14px] h-[14px]"></tab.icon>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-xs sm:px-md sm:py-md">
              {/* TEXT TAB */}
              {activeTab === "text" && (
                <div className="flex flex-col gap-[16px]">
                  <div>
                    <label className="block text-[11px] font-600 uppercase tracking-[1.1px] text-muted mb-[8px]">
                      What's the problem?
                    </label>
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Describe the issue you've encountered. Be as specific as possible — what happened, where, and when..."
                      rows={6}
                      className="w-full bg-canvas-elevated border border-hairline text-ink text-[14px] font-400 leading-[1.5] p-[16px] resize-none placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
                      style={{ borderRadius: "0px" }}
                    />
                  </div>
                  <div className="flex items-start gap-[8px]">
                    <Info className="w-[14px] h-[14px] text-muted mt-[2px] flex-shrink-0" />
                    <p className="text-[12px] font-400 leading-[1.5] text-muted">
                      FixFinder will analyze your text, identify the issue type,
                      and route it to the correct agency automatically.
                    </p>
                  </div>
                </div>
              )}

              {/* RECORD TAB */}
              {activeTab === "record" && (
                <div className="flex flex-col items-center gap-[24px] py-[24px]">
                  {!audioResult && !isRecording && (
                    <>
                      <div
                        className="w-[80px] h-[80px] border border-hairline flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                        style={{ borderRadius: "50%" }}
                        onClick={startRecording}
                      >
                        <Mic className="w-[32px] h-[32px] text-body" />
                      </div>
                      <div className="text-center">
                        <p className="text-[14px] font-500 text-ink mb-[4px]">
                          Tap to start recording
                        </p>
                        <p className="text-[12px] font-400 text-muted">
                          Describe the problem you've observed. Speak clearly
                          and include relevant details.
                        </p>
                      </div>
                    </>
                  )}

                  {isRecording && (
                    <>
                      <div className="relative w-[80px] h-[80px] flex items-center justify-center record-pulse">
                        <button
                          onClick={stopRecording}
                          className="relative z-10 w-[80px] h-[80px] bg-primary flex items-center justify-center cursor-pointer hover:bg-primary-active transition-colors"
                          style={{ borderRadius: "50%" }}
                        >
                          <div
                            className="w-[24px] h-[24px] bg-white"
                            style={{ borderRadius: "4px" }}
                          ></div>
                        </button>
                      </div>
                      <div className="text-center">
                        <p className="text-[14px] font-500 text-primary mb-[4px]">
                          Recording...
                        </p>
                        <p className="text-[24px] font-600 text-ink tracking-[2px] font-mono">
                          {formatTime(recordingTime)}
                        </p>
                      </div>
                      {/* Waveform visualization */}
                      <div className="flex items-center gap-[3px] h-[32px]">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-[3px] bg-primary wave-bar"
                            style={{
                              height: `${Math.max(4, Math.random() * 20)}px`,
                              animationDelay: `${i * 0.08}s`,
                              borderRadius: "2px",
                            }}
                          ></div>
                        ))}
                      </div>
                      <button
                        onClick={cancelRecording}
                        className="text-[12px] font-600 uppercase tracking-[1px] text-body hover:text-ink transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {audioResult && !isRecording && (
                    <>
                      <div
                        className="w-full bg-canvas-elevated border border-hairline p-[16px] flex items-center gap-[16px]"
                        style={{ borderRadius: "0px" }}
                      >
                        <div
                          className="w-[40px] h-[40px] bg-primary flex items-center justify-center flex-shrink-0"
                          style={{ borderRadius: "50%" }}
                        >
                          <Play className="w-[16px] h-[16px] text-white -ml-[2px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-500 text-ink">
                            Voice Recording
                          </p>
                          <p className="text-[12px] text-muted">
                            Duration: {formatTime(audioResult.duration)}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setAudioResult(null);
                            setRecordingTime(0);
                          }}
                          className="text-body hover:text-primary transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-[16px] h-[16px]" />
                        </button>
                      </div>
                      <div className="w-full flex items-start gap-[8px]">
                        <CheckCircle className="w-[14px] h-[14px] text-primary mt-[2px] flex-shrink-0" />
                        <p className="text-[12px] font-400 leading-[1.5] text-muted">
                          Recording saved. FixFinder will transcribe and analyze
                          your voice report to identify the issue and route it
                          properly.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* IMAGE TAB */}
              {activeTab === "image" && (
                <div className="flex flex-col gap-[16px]">
                  {!imagePreview ? (
                    <div
                      className={`border-2 border-dashed flex flex-col items-center justify-center gap-[16px] py-[48px] px-[24px] transition-colors cursor-pointer ${
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-hairline hover:border-muted"
                      }`}
                      style={{ borderRadius: "0px" }}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div
                        className="w-[56px] h-[56px] border border-hairline flex items-center justify-center"
                        style={{ borderRadius: "50%" }}
                      >
                        <Upload className="w-[24px] h-[24px] text-body" />
                      </div>
                      <div className="text-center">
                        <p className="text-[14px] font-500 text-ink mb-[4px]">
                          Drop an image here or click to browse
                        </p>
                        <p className="text-[12px] font-400 text-muted">
                          Supports JPG, PNG, WEBP up to 10MB
                        </p>
                      </div>
                      <div className="flex items-center gap-[8px] text-[11px] font-600 uppercase tracking-[1px] text-muted">
                        <div className="h-[1px] w-[32px] bg-hairline"></div>
                        OR
                        <div className="h-[1px] w-[32px] bg-hairline"></div>
                      </div>
                      <button
                        className="bg-canvas-elevated text-ink text-[13px] font-600 uppercase tracking-[1px] px-[24px] py-[10px] border border-hairline hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-pointer"
                        style={{ borderRadius: "0px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                      >
                        Choose File
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect(e.target.files[0])}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[16px]">
                      <div
                        className="relative bg-canvas-elevated border border-hairline overflow-hidden"
                        style={{ borderRadius: "0px" }}
                      >
                        <img
                          src={imagePreview}
                          alt="Uploaded preview"
                          className="w-full max-h-[280px] object-contain"
                        />
                        <button
                          onClick={() => {
                            setUploadedImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-[8px] right-[8px] w-[32px] h-[32px] bg-canvas/90 border border-hairline flex items-center justify-center text-body hover:text-primary cursor-pointer transition-colors"
                          style={{ borderRadius: "0px" }}
                        >
                          <X className="w-[14px] h-[14px]" />
                        </button>
                      </div>
                      <div
                        className="bg-canvas-elevated border border-hairline p-[16px]"
                        style={{ borderRadius: "0px" }}
                      >
                        <div className="flex items-center gap-[8px] mb-[8px]">
                          <FileImage className="w-[14px] h-[14px] text-primary" />
                          <p className="text-[13px] font-500 text-ink truncate">
                            {uploadedImage?.name || "Image uploaded"}
                          </p>
                        </div>
                        {uploadedImage && (
                          <p className="text-[12px] text-muted">
                            {(uploadedImage.size / 1024 / 1024).toFixed(2)} MB ·{" "}
                            {uploadedImage.type}
                          </p>
                        )}
                      </div>
                      <textarea
                        placeholder="Add a description of what's shown in the image (optional)..."
                        rows={3}
                        className="w-full bg-canvas-elevated border border-hairline text-ink text-[14px] font-400 leading-[1.5] p-[16px] resize-none placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
                        style={{ borderRadius: "0px" }}
                      />
                    </div>
                  )}
                  <div className="flex items-start gap-[8px]">
                    <Info className="w-[14px] h-[14px] text-muted mt-[2px] flex-shrink-0" />
                    <p className="text-[12px] font-400 leading-[1.5] text-muted">
                      FixFinder will analyze your image using AI vision to
                      detect the type of problem and match it with the right
                      agency.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-hairline px-xs sm:px-md py-[16px] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-[8px]">
                {hasContent && (
                  <div className="flex items-center gap-[6px]">
                    <div
                      className="w-[6px] h-[6px] bg-primary"
                      style={{ borderRadius: "50%" }}
                    ></div>
                    <span className="text-[11px] font-600 uppercase tracking-[1px] text-primary">
                      Ready
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-[8px]">
                <button
                  onClick={onClose}
                  className="text-[13px] font-600 uppercase tracking-[1px] text-body hover:text-ink px-[20px] py-[10px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!hasContent || isSubmitting}
                  className={`text-[13px] font-700 uppercase tracking-[1.4px] px-[32px] py-[12px] transition-colors cursor-pointer ${
                    hasContent && !isSubmitting
                      ? "bg-primary text-white hover:bg-primary-active"
                      : "bg-hairline text-muted cursor-not-allowed"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  {isSubmitting ? "ANALYZING..." : "SUBMIT REPORT"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Submitted state */}
        {submitted && (
          <div className="flex flex-col items-center justify-center py-[48px] px-[24px] text-center">
            <div
              className="w-[64px] h-[64px] bg-primary flex items-center justify-center mb-[24px]"
              style={{ borderRadius: "50%" }}
            >
              <Check className="w-[32px] h-[32px] text-white" strokeWidth={3} />
            </div>
            <h3 className="text-[20px] font-500 text-ink mb-[8px]">
              Report Submitted
            </h3>
            <p className="text-[14px] font-400 leading-[1.5] text-body max-w-[360px] mb-[32px]">
              FixFinder is analyzing your report. It will be classified and
              routed to the correct agency within seconds.
            </p>
            <button
              onClick={onClose}
              className="bg-primary text-white text-[13px] font-700 uppercase tracking-[1.4px] px-[32px] py-[12px] hover:bg-primary-active transition-colors cursor-pointer"
              style={{ borderRadius: "0px" }}
            >
              DONE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
