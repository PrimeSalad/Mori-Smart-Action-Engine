import { useState, useEffect, useRef } from "react";
import {
  AlertCircle,
  ArrowLeft,
  AtSign,
  Bell,
  Brain,
  Check,
  CheckCircle,
  FileImage,
  Hash,
  Image,
  Info,
  Mail,
  MailCheck,
  Mic,
  Pencil,
  Play,
  RotateCcw,
  Send,
  Tag,
  Trash2,
  Type,
  Upload,
  X,
} from "lucide-react";
import { processReport, submitReport } from "../services/reportService";

const AGENCIES = [
  {
    id: "ltfrb",
    name: "LTFRB",
    fullName: "Land Transportation Franchising and Regulatory Board",
    email: "contact@ltfrb.gov.ph",
    categories: ["transport", "fare", "franchise"],
  },
  {
    id: "bfp",
    name: "BFP",
    fullName: "Bureau of Fire Protection",
    email: "info@bfp.gov.ph",
    categories: ["fire", "emergency", "safety"],
  },
  {
    id: "dpwh",
    name: "DPWH",
    fullName: "Department of Public Works and Highways",
    email: "comms@dpwh.gov.ph",
    categories: ["infrastructure", "roads", "bridges"],
  },
  {
    id: "denr",
    name: "DENR",
    fullName: "Department of Environment and Natural Resources",
    email: "contact@denr.gov.ph",
    categories: ["environment", "pollution", "dumping"],
  },
  {
    id: "dilg",
    name: "DILG",
    fullName: "Department of the Interior and Local Government",
    email: "info@dilg.gov.ph",
    categories: ["governance", "local", "barangay"],
  },
  {
    id: "doh",
    name: "DOH",
    fullName: "Department of Health",
    email: "contact@doh.gov.ph",
    categories: ["health", "sanitation", "water"],
  },
  {
    id: "pnp",
    name: "PNP",
    fullName: "Philippine National Police",
    email: "pnp@pnp.gov.ph",
    categories: ["crime", "security", "safety"],
  },
  {
    id: "mmda",
    name: "MMDA",
    fullName: "Metropolitan Manila Development Authority",
    email: "info@mmda.gov.ph",
    categories: ["traffic", "transport", "road"],
  },
  {
    id: "nbi",
    name: "NBI",
    fullName: "National Bureau of Investigation",
    email: "nbi@nbi.gov.ph",
    categories: ["crime", "investigation", "fraud"],
  },
  {
    id: "bir",
    name: "BIR",
    fullName: "Bureau of Internal Revenue",
    email: "contact@bir.gov.ph",
    categories: ["tax", "fraud", "financial"],
  },
  {
    id: "dole",
    name: "DOLE",
    fullName: "Department of Labor and Employment",
    email: "info@dole.gov.ph",
    categories: ["labor", "employment", "workplace"],
  },
  {
    id: "dswd",
    name: "DSWD",
    fullName: "Department of Social Welfare and Development",
    email: "info@dswd.gov.ph",
    categories: ["social", "welfare", "community"],
  },
];

const WAVE_BAR_HEIGHTS = [
  8, 14, 20, 12, 24, 16, 10, 22, 18, 26,
  12, 20, 14, 24, 16, 10, 22, 18, 26, 12,
];

export default function ReportModal({ isOpen, onClose }) {
  const [step, setStep] = useState("input");
  const [activeTab, setActiveTab] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioResult, setAudioResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageDescription, setImageDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [editableReport, setEditableReport] = useState("");
  const [selectedAgencies, setSelectedAgencies] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailShake, setEmailShake] = useState(false);
  const [processingError, setProcessingError] = useState(null);
  const fileInputRef = useRef(null);
  const recordingTimerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const emailInputRef = useRef(null);
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
    handleFileSelect(e.dataTransfer.files[0]);
  };
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
  const validateEmail = (email) => {
    if (!email.trim()) return true; // optional
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const hasContent = textInput.trim() || audioResult || uploadedImage;
  
  const handleGenerateReport = async () => {
    setStep("generating");
    setProcessingError(null);

    try {
      let reportData;
      let inputType;

      // Determine input type and prepare data
      if (activeTab === "text" && textInput.trim()) {
        inputType = "text";
        reportData = { textInput: textInput.trim() };
      } else if (activeTab === "image" && uploadedImage) {
        inputType = "image";
        reportData = {
          imageFile: uploadedImage,
          imageDescription: imageDescription.trim(),
        };
      } else if (activeTab === "record" && audioResult) {
        inputType = "audio";
        // Convert audio URL to blob
        const response = await fetch(audioResult.url);
        const audioBlob = await response.blob();
        reportData = { audioBlob };
      } else {
        throw new Error("No valid input provided");
      }

      // Call backend API
      const aiResult = await processReport(inputType, reportData);

      // Generate report content with AI results
      const result = generateReportContent(
        textInput,
        audioResult,
        uploadedImage,
        aiResult
      );

      setGeneratedReport(result);
      setEditableReport(result.report);
      setSelectedAgencies(result.relevantAgencies.map((a) => a.id));
      setStep("review");
    } catch (error) {
      console.error("Error generating report:", error);
      setProcessingError(error.message || "Failed to generate report. Please try again.");
      setStep("input");
    }
  };
  const toggleAgency = (id) => {
    setSelectedAgencies((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };
  const handleSubmitReport = async () => {
    // Validate email if provided
    if (emailInput.trim() && !validateEmail(emailInput)) {
      setEmailError("Please enter a valid email address");
      setEmailShake(true);
      setTimeout(() => setEmailShake(false), 500);
      if (emailInputRef.current) emailInputRef.current.focus();
      return;
    }
    
    setEmailError("");
    setIsSubmitting(true);
    setProcessingError(null);

    try {
      // Prepare selected agencies data
      const agencies = selectedAgencies.map(id => {
        const agency = AGENCIES.find(a => a.id === id);
        return {
          id: agency.id,
          name: agency.name,
          fullName: agency.fullName,
          email: agency.email,
        };
      });

      // Submit report to backend
      await submitReport({
        reportContent: editableReport,
        referenceId: generatedReport.refId,
        selectedAgencies: agencies,
        userEmail: emailInput.trim(),
      });

      setIsSubmitting(false);
      setStep("submitted");
    } catch (error) {
      console.error("Error submitting report:", error);
      setIsSubmitting(false);
      setEmailError(error.message || "Failed to submit report. Please try again.");
      setEmailShake(true);
      setTimeout(() => setEmailShake(false), 500);
    }
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "text-primary";
      case "High":
        return "text-yellow-500";
      case "Medium":
        return "text-blue-400";
      default:
        return "text-body";
    }
  };
  const getPriorityBg = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-primary/10 border-primary/30";
      case "High":
        return "bg-yellow-500/10 border-yellow-500/30";
      case "Medium":
        return "bg-blue-400/10 border-blue-400/30";
      default:
        return "bg-canvas-elevated border-hairline";
    }
  };
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
        className="relative w-full max-w-[640px] bg-canvas border border-hairline modal-enter max-h-[90vh] flex flex-col"
        style={{ borderRadius: "0px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-xs sm:px-md py-[20px] border-b border-hairline flex-shrink-0">
          <div>
            <p className="text-[11px] font-600 uppercase tracking-[1.1px] text-primary">
              {step === "input"
                ? "New Report"
                : step === "generating"
                  ? "Generating Report"
                  : step === "review"
                    ? "Review & Send"
                    : "Report Submitted"}
            </p>
            <h2 className="text-[18px] font-500 leading-[1.4] text-ink mt-[4px]">
              {step === "input"
                ? "Report a Problem"
                : step === "generating"
                  ? "Mori ActionPoint AI is Working..."
                  : step === "review"
                    ? "Review Your Report"
                    : "Report Sent!"}
            </h2>
          </div>
          {step !== "generating" && (
            <button
              onClick={onClose}
              className="w-[40px] h-[40px] flex items-center justify-center text-body hover:text-ink transition-colors cursor-pointer"
            >
              <X className="w-[20px] h-[20px]"></X>
            </button>
          )}
        </div>
        {/* ─── STEP: INPUT ─── */}
        {step === "input" && (
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
                    <Info className="w-[14px] h-[14px] text-muted mt-[2px] flex-shrink-0"></Info>
                    <p className="text-[12px] font-400 leading-[1.5] text-muted">
                      Mori ActionPoint will analyze your text using Google Gemini AI, identify the issue type,
                      and generate a formal report you can review and send to
                      the correct agency.
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
                        <Mic className="w-[32px] h-[32px] text-body"></Mic>
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
                      <div className="flex items-center gap-[3px] h-[32px]">
                        {WAVE_BAR_HEIGHTS.map((height, i) => (
                          <div
                            key={i}
                            className="w-[3px] bg-primary wave-bar"
                            style={{
                              height: `${height}px`,
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
                          <Play className="w-[16px] h-[16px] text-white ml-[2px]"></Play>
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
                          <Trash2 className="w-[16px] h-[16px]"></Trash2>
                        </button>
                      </div>
                      <div className="w-full flex items-start gap-[8px]">
                        <CheckCircle className="w-[14px] h-[14px] text-primary mt-[2px] flex-shrink-0"></CheckCircle>
                        <p className="text-[12px] font-400 leading-[1.5] text-muted">
                          Recording saved. Mori ActionPoint will transcribe and analyze
                          your voice report using Google Gemini AI to generate a formal report.
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
                        <Upload className="w-[24px] h-[24px] text-body"></Upload>
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
                          <X className="w-[14px] h-[14px]"></X>
                        </button>
                      </div>
                      <div
                        className="bg-canvas-elevated border border-hairline p-[16px]"
                        style={{ borderRadius: "0px" }}
                      >
                        <div className="flex items-center gap-[8px] mb-[8px]">
                          <FileImage className="w-[14px] h-[14px] text-primary"></FileImage>
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
                        value={imageDescription}
                        onChange={(e) => setImageDescription(e.target.value)}
                        placeholder="Add a description of what's shown in the image (optional)..."
                        rows={3}
                        className="w-full bg-canvas-elevated border border-hairline text-ink text-[14px] font-400 leading-[1.5] p-[16px] resize-none placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
                        style={{ borderRadius: "0px" }}
                      />
                    </div>
                  )}
                  <div className="flex items-start gap-[8px]">
                    <Info className="w-[14px] h-[14px] text-muted mt-[2px] flex-shrink-0"></Info>
                    <p className="text-[12px] font-400 leading-[1.5] text-muted">
                      Mori ActionPoint will analyze your image using Google Gemini Vision AI to
                      detect the type of problem and generate a formal report.
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/* Footer */}
            <div className="border-t border-hairline px-xs sm:px-md py-[16px] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-[8px]">
                {processingError && (
                  <div className="flex items-center gap-[6px] text-primary">
                    <AlertCircle className="w-[14px] h-[14px]"></AlertCircle>
                    <span className="text-[11px] font-500">{processingError}</span>
                  </div>
                )}
                {!processingError && hasContent && (
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
                  onClick={handleGenerateReport}
                  disabled={!hasContent}
                  className={`text-[13px] font-700 uppercase tracking-[1.4px] px-[32px] py-[12px] transition-colors cursor-pointer ${
                    hasContent
                      ? "bg-primary text-white hover:bg-primary-active"
                      : "bg-hairline text-muted cursor-not-allowed"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  GENERATE REPORT
                </button>
              </div>
            </div>
          </>
        )}
        {/* ─── STEP: GENERATING ─── */}
        {step === "generating" && (
          <div className="flex-1 flex flex-col items-center justify-center py-[64px] px-[24px]">
            {/* Spinning loader */}
            <div className="relative mb-[32px]">
              <div
                className="w-[64px] h-[64px] border-[3px] border-hairline border-t-primary spinner"
                style={{ borderRadius: "50%" }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-[24px] h-[24px] text-primary"></Brain>
              </div>
            </div>
            <h3 className="text-[18px] font-500 text-ink mb-[8px] text-center">
              Analyzing Your Report
            </h3>
            <p className="text-[14px] font-400 leading-[1.5] text-body max-w-[360px] text-center mb-[24px]">
              Mori ActionPoint is classifying the issue using Google Gemini AI, identifying the category, and
              preparing a formal report.
            </p>
            {/* Progress bar */}
            <div
              className="w-full max-w-[320px] bg-canvas-elevated h-[4px] overflow-hidden"
              style={{ borderRadius: "0px" }}
            >
              <div className="h-full bg-primary progress-fill"></div>
            </div>
            {/* Status dots */}
            <div className="flex items-center gap-[8px] mt-[20px]">
              <div
                className="w-[6px] h-[6px] bg-primary dot-pulse-1"
                style={{ borderRadius: "50%" }}
              ></div>
              <div
                className="w-[6px] h-[6px] bg-primary dot-pulse-2"
                style={{ borderRadius: "50%" }}
              ></div>
              <div
                className="w-[6px] h-[6px] bg-primary dot-pulse-3"
                style={{ borderRadius: "50%" }}
              ></div>
            </div>
            <p className="text-[11px] font-600 uppercase tracking-[1.1px] text-muted mt-[16px]">
              Please wait...
            </p>
          </div>
        )}
        {/* ─── STEP: REVIEW ─── */}
        {step === "review" && generatedReport && (
          <>
            <div className="flex-1 overflow-y-auto">
              {/* Report info bar */}
              <div className="px-xs sm:px-md py-[16px] border-b border-hairline flex flex-wrap items-center gap-[8px] sm:gap-[16px]">
                <div className="flex items-center gap-[8px]">
                  <Hash className="w-[14px] h-[14px] text-muted"></Hash>
                  <span className="text-[12px] font-600 text-ink font-mono">
                    {generatedReport.refId}
                  </span>
                </div>
                <div className="w-[1px] h-[16px] bg-hairline hidden sm:block"></div>
                <div
                  className={`flex items-center gap-[6px] px-[10px] py-[4px] border ${getPriorityBg(generatedReport.priority)}`}
                >
                  <div
                    className={`w-[6px] h-[6px] ${getPriorityColor(generatedReport.priority)}`}
                    style={{ borderRadius: "50%" }}
                  ></div>
                  <span
                    className={`text-[11px] font-600 uppercase tracking-[1px] ${getPriorityColor(generatedReport.priority)}`}
                  >
                    {generatedReport.priority}
                  </span>
                </div>
                <div className="flex items-center gap-[6px] bg-canvas-elevated px-[10px] py-[4px] border border-hairline">
                  <Tag className="w-[10px] h-[10px] text-primary"></Tag>
                  <span className="text-[11px] font-600 uppercase tracking-[1px] text-ink">
                    {generatedReport.issueType}
                  </span>
                </div>
              </div>
              {/* Editable report */}
              <div className="px-xs sm:px-md py-md">
                <div className="flex items-center justify-between mb-[12px]">
                  <label className="block text-[11px] font-600 uppercase tracking-[1.1px] text-muted">
                    Generated Report — Editable
                  </label>
                  <div className="flex items-center gap-[8px]">
                    <button
                      onClick={() => setEditableReport(generatedReport.report)}
                      className="flex items-center gap-[6px] text-[11px] font-600 uppercase tracking-[1px] text-body hover:text-primary transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-[12px] h-[12px]"></RotateCcw>
                      Reset
                    </button>
                  </div>
                </div>
                <textarea
                  value={editableReport}
                  onChange={(e) => setEditableReport(e.target.value)}
                  rows={16}
                  className="w-full bg-canvas-elevated border border-hairline text-ink text-[13px] font-mono leading-[1.6] p-[16px] resize-y focus:outline-none focus:border-primary transition-colors"
                  style={{ borderRadius: "0px" }}
                />
                <div className="flex items-start gap-[8px] mt-[12px]">
                  <Pencil className="w-[14px] h-[14px] text-primary mt-[2px] flex-shrink-0"></Pencil>
                  <p className="text-[12px] font-400 leading-[1.5] text-muted">
                    You can edit any part of this report before sending. Changes
                    will be reflected in the final version sent to agencies.
                  </p>
                </div>
              </div>
              {/* Agency Selection */}
              <div className="px-xs sm:px-md pb-md">
                <div className="flex items-center justify-between mb-[12px]">
                  <label className="block text-[11px] font-600 uppercase tracking-[1.1px] text-muted">
                    Send Report To
                  </label>
                  <span className="text-[11px] font-600 uppercase tracking-[1px] text-primary">
                    {selectedAgencies.length} selected
                  </span>
                </div>
                <div className="flex flex-col gap-[4px]">
                  {AGENCIES.map((agency) => {
                    const isSelected = selectedAgencies.includes(agency.id);
                    const isRecommended = generatedReport.relevantAgencies.some(
                      (r) => r.id === agency.id,
                    );
                    return (
                      <button
                        key={agency.id}
                        onClick={() => toggleAgency(agency.id)}
                        className={`w-full flex items-start gap-[12px] p-[14px] border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-hairline bg-transparent hover:border-muted"
                        }`}
                        style={{ borderRadius: "0px" }}
                      >
                        {/* Checkbox */}
                        <div
                          className={`w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center border mt-[2px] transition-colors ${
                            isSelected
                              ? "bg-primary border-primary"
                              : "border-muted bg-transparent"
                          }`}
                        >
                          {isSelected && (
                            <Check
                              className="w-[12px] h-[12px] text-white"
                              strokeWidth={3}
                            ></Check>
                          )}
                        </div>
                        {/* Agency info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-[8px] flex-wrap">
                            <span className="text-[13px] font-600 text-ink">
                              {agency.name}
                            </span>
                            {isRecommended && (
                              <span className="text-[9px] font-700 uppercase tracking-[1px] text-primary bg-primary/10 px-[6px] py-[2px]">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="text-[12px] text-muted mt-[2px] leading-[1.4]">
                            {agency.fullName}
                          </p>
                          <div className="flex items-center gap-[6px] mt-[4px]">
                            <Mail className="w-[10px] h-[10px] text-muted"></Mail>
                            <span className="text-[11px] text-muted font-mono">
                              {agency.email}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* ─── EMAIL FOR UPDATES ─── */}
              <div className="px-xs sm:px-md pb-md border-t border-hairline pt-md">
                <div className="flex items-center gap-[8px] mb-[12px]">
                  <Mail className="w-[14px] h-[14px] text-primary flex-shrink-0"></Mail>
                  <label className="block text-[11px] font-600 uppercase tracking-[1.1px] text-muted">
                    Email for Updates
                    <span className="text-muted-soft normal-case tracking-normal font-400 ml-[6px]">
                      (optional)
                    </span>
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute left-[16px] top-1/2 -translate-y-1/2 pointer-events-none">
                    <AtSign className="w-[16px] h-[16px] text-muted"></AtSign>
                  </div>
                  <input
                    ref={emailInputRef}
                    type="email"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    placeholder="you@example.com"
                    className={`w-full bg-canvas-elevated border text-ink text-[14px] font-400 leading-[1.5] pl-[44px] pr-[16px] py-[14px] placeholder:text-muted focus:outline-none focus:border-primary transition-colors ${
                      emailError ? "border-primary" : "border-hairline"
                    } ${emailShake ? "shake" : ""}`}
                    style={{ borderRadius: "0px" }}
                  />
                </div>
                {emailError && (
                  <div className="flex items-center gap-[6px] mt-[8px] fade-in-up">
                    <AlertCircle className="w-[12px] h-[12px] text-primary flex-shrink-0"></AlertCircle>
                    <p className="text-[12px] font-500 text-primary">
                      {emailError}
                    </p>
                  </div>
                )}
                <div className="flex items-start gap-[8px] mt-[12px]">
                  <Bell className="w-[14px] h-[14px] text-muted mt-[2px] flex-shrink-0"></Bell>
                  <p className="text-[12px] font-400 leading-[1.5] text-muted">
                    Provide your email to receive status updates on your report.
                    We'll notify you when the agency responds or the issue is
                    resolved. This is entirely optional.
                  </p>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="border-t border-hairline px-xs sm:px-md py-[16px] flex items-center justify-between flex-shrink-0">
              <button
                onClick={() => setStep("input")}
                className="flex items-center gap-[6px] text-[13px] font-600 uppercase tracking-[1px] text-body hover:text-ink px-[20px] py-[10px] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-[14px] h-[14px]"></ArrowLeft>
                Back
              </button>
              <div className="flex items-center gap-[8px]">
                <button
                  onClick={onClose}
                  className="text-[13px] font-600 uppercase tracking-[1px] text-body hover:text-ink px-[20px] py-[10px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReport}
                  disabled={selectedAgencies.length === 0 || isSubmitting}
                  className={`text-[13px] font-700 uppercase tracking-[1.4px] px-[32px] py-[12px] transition-colors cursor-pointer flex items-center gap-[8px] ${
                    selectedAgencies.length > 0 && !isSubmitting
                      ? "bg-primary text-white hover:bg-primary-active"
                      : "bg-hairline text-muted cursor-not-allowed"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  {isSubmitting ? (
                    <>
                      <div
                        className="w-[14px] h-[14px] border-[2px] border-white/30 border-t-white spinner"
                        style={{ borderRadius: "50%" }}
                      ></div>
                      SENDING...
                    </>
                  ) : (
                    <>
                      <Send className="w-[14px] h-[14px]"></Send>
                      SEND REPORT ({selectedAgencies.length})
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
        {/* ─── STEP: SUBMITTED ─── */}
        {step === "submitted" && (
          <div className="flex flex-col items-center justify-center py-[48px] px-[24px] text-center">
            <div
              className="w-[64px] h-[64px] bg-primary flex items-center justify-center mb-[24px]"
              style={{ borderRadius: "50%" }}
            >
              <Check
                className="w-[32px] h-[32px] text-white"
                strokeWidth={3}
              ></Check>
            </div>
            <h3 className="text-[20px] font-500 text-ink mb-[8px]">
              Report Submitted
            </h3>
            <p className="text-[14px] font-400 leading-[1.5] text-body max-w-[360px] mb-[16px]">
              Your report has been sent to {selectedAgencies.length}{" "}
              {selectedAgencies.length === 1 ? "agency" : "agencies"}.{" "}
              {emailInput.trim()
                ? "A confirmation has been sent to your email. You'll receive updates as the case progresses."
                : "You will receive a confirmation shortly."}
            </p>
            {/* Show selected agencies */}
            <div className="flex flex-wrap justify-center gap-[8px] mb-[24px] max-w-[400px]">
              {selectedAgencies.map((id) => {
                const agency = AGENCIES.find((a) => a.id === id);
                return agency ? (
                  <span
                    key={id}
                    className="bg-canvas-elevated border border-hairline text-[11px] font-600 uppercase tracking-[1px] text-ink px-[12px] py-[6px]"
                  >
                    {agency.name}
                  </span>
                ) : null;
              })}
            </div>
            {/* Show email confirmation note */}
            {emailInput.trim() && (
              <div className="flex items-center gap-[8px] bg-canvas-elevated border border-hairline px-[16px] py-[12px] mb-[24px] w-full max-w-[400px]">
                <MailCheck className="w-[16px] h-[16px] text-primary flex-shrink-0"></MailCheck>
                <p className="text-[12px] font-400 text-body text-left">
                  Updates will be sent to{" "}
                  <span className="text-ink font-500">{emailInput.trim()}</span>
                </p>
              </div>
            )}
            <p className="text-[12px] text-muted mb-[24px]">
              Reference:{" "}
              <span className="font-mono text-ink">
                {generatedReport?.refId}
              </span>
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

function generateReportContent(textInput, audioResult, uploadedImage, aiResult = null) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-PH", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const refId =
    "AP-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  let issueType = "General Complaint";
  let priority = "Normal";
  let category = "general";
  let aiSummary = "";
  let aiAgencies = [];

  // Use AI results if available
  if (aiResult) {
    aiSummary = aiResult.summary || "";
    aiAgencies = aiResult.agencies || [];
    
    // Try to determine category from AI agencies
    const agencyLower = aiAgencies.join(" ").toLowerCase();
    if (agencyLower.includes("ltfrb") || agencyLower.includes("transport") || agencyLower.includes("mmda")) {
      category = "transport";
      issueType = "Fare / Transport Violation";
      priority = "High";
    } else if (agencyLower.includes("bfp") || agencyLower.includes("fire")) {
      category = "fire";
      issueType = "Fire / Emergency";
      priority = "Critical";
    } else if (agencyLower.includes("dpwh") || agencyLower.includes("infrastructure")) {
      category = "infrastructure";
      issueType = "Infrastructure / Road Concern";
      priority = "High";
    } else if (agencyLower.includes("denr") || agencyLower.includes("environment")) {
      category = "environment";
      issueType = "Environmental Violation";
      priority = "High";
    } else if (agencyLower.includes("pnp") || agencyLower.includes("nbi") || agencyLower.includes("police")) {
      category = "crime";
      issueType = "Criminal Incident";
      priority = "Critical";
    } else if (agencyLower.includes("doh") || agencyLower.includes("health")) {
      category = "health";
      issueType = "Public Health Concern";
      priority = "High";
    }
  } else {
    // Fallback to keyword detection
    const inputLower = (textInput || "").toLowerCase();
    if (
      inputLower.includes("fare") ||
      inputLower.includes("driver") ||
      inputLower.includes("overcharg") ||
      inputLower.includes("transport") ||
      inputLower.includes("jeep") ||
      inputLower.includes("taxi") ||
      inputLower.includes("bus")
    ) {
      issueType = "Fare / Transport Violation";
      priority = "High";
      category = "transport";
    } else if (
      inputLower.includes("fire") ||
      inputLower.includes("sunog") ||
      inputLower.includes("emergency") ||
      inputLower.includes("burn") ||
      inputLower.includes("flame")
    ) {
      issueType = "Fire / Emergency";
      priority = "Critical";
      category = "fire";
    } else if (
      inputLower.includes("road") ||
      inputLower.includes("street") ||
      inputLower.includes("pothole") ||
      inputLower.includes("dark") ||
      inputLower.includes("light") ||
      inputLower.includes("dilim") ||
      inputLower.includes("infrastructure")
    ) {
      issueType = "Infrastructure / Road Concern";
      priority = "High";
      category = "infrastructure";
    } else if (
      inputLower.includes("dump") ||
      inputLower.includes("waste") ||
      inputLower.includes("pollution") ||
      inputLower.includes("trash") ||
      inputLower.includes("basura") ||
      inputLower.includes("environment")
    ) {
      issueType = "Environmental Violation";
      priority = "High";
      category = "environment";
    } else if (
      inputLower.includes("crime") ||
      inputLower.includes("theft") ||
      inputLower.includes("stolen") ||
      inputLower.includes("assault") ||
      inputLower.includes("security")
    ) {
      issueType = "Criminal Incident";
      priority = "Critical";
      category = "crime";
    } else if (
      inputLower.includes("water") ||
      inputLower.includes("health") ||
      inputLower.includes("sanitation") ||
      inputLower.includes("sick") ||
      inputLower.includes("hospital")
    ) {
      issueType = "Public Health Concern";
      priority = "High";
      category = "health";
    } else if (
      inputLower.includes("traffic") ||
      inputLower.includes("congestion") ||
      inputLower.includes("vehicle") ||
      inputLower.includes("mmda")
    ) {
      issueType = "Traffic / Road Management";
      priority = "Medium";
      category = "traffic";
    }
  }

  // Match AI agencies to our AGENCIES list
  const relevantAgencies = AGENCIES.filter((a) => {
    // First check if AI suggested this agency
    if (aiAgencies.some(aiAgency => 
      aiAgency.toLowerCase().includes(a.name.toLowerCase()) ||
      aiAgency.toLowerCase().includes(a.fullName.toLowerCase())
    )) {
      return true;
    }
    
    // Fallback to category matching
    return a.categories.some(
      (c) =>
        c === category ||
        (category === "infrastructure" && (c === "roads" || c === "local")) ||
        (category === "fire" && c === "emergency") ||
        (category === "transport" && (c === "fare" || c === "traffic")),
    );
  });

  if (relevantAgencies.length === 0) {
    AGENCIES.slice(0, 3).forEach((a) => {
      if (!relevantAgencies.find((r) => r.id === a.id))
        relevantAgencies.push(a);
    });
  }

  const description =
    textInput ||
    (audioResult
      ? aiResult?.transcription || "[Voice report transcribed — audio attached]"
      : uploadedImage
        ? aiSummary || "[Image-based report — visual evidence attached]"
        : "");

  const report = aiResult?.email || `OFFICIAL INCIDENT REPORT
Reference: ${refId}
Date: ${dateStr}
Time: ${timeStr}
──────────────────────────────────────
ISSUE TYPE: ${issueType}
PRIORITY: ${priority}
──────────────────────────────────────
SUMMARY:
${aiSummary || description}

DESCRIPTION OF INCIDENT:
${description}
──────────────────────────────────────
OBSERVATIONS:
• Report submitted via ActionPoint Orbit platform
• Source: ${textInput ? "Text input" : audioResult ? "Voice recording" : uploadedImage ? "Image upload" : "Mixed input"}
• ${audioResult ? "Audio evidence included\n• " : ""}${uploadedImage ? "Visual evidence attached\n• " : ""}AI classification confidence: High

RECOMMENDED ACTIONS:
1. Immediate review by responsible agency
2. Investigation of reported incident
3. Feedback to complainant within 5-7 business days
4. Case resolution and status update
──────────────────────────────────────
This report was auto-generated by Mori ActionPoint AI powered by Google Gemini.
For follow-ups, reference: ${refId}`;

  return {
    report,
    refId,
    issueType,
    priority,
    category,
    dateStr,
    timeStr,
    relevantAgencies,
  };
}
