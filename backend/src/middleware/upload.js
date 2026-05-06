const multer = require('multer');

// Configure multer for memory storage (no disk writes)
const storage = multer.memoryStorage();

// Allowed MIME types
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const ALLOWED_AUDIO_TYPES = new Set(['audio/webm', 'audio/wav', 'audio/mpeg', 'audio/ogg']);

// Magic byte signatures for file type verification
// Prevents MIME spoofing — client-supplied mimetype is not trusted alone
const MAGIC_SIGNATURES = [
  // JPEG: FF D8 FF
  { mime: 'image/jpeg', offset: 0, bytes: [0xff, 0xd8, 0xff] },
  // PNG: 89 50 4E 47
  { mime: 'image/png', offset: 0, bytes: [0x89, 0x50, 0x4e, 0x47] },
  // WEBP: RIFF....WEBP
  { mime: 'image/webp', offset: 0, bytes: [0x52, 0x49, 0x46, 0x46], extraOffset: 8, extraBytes: [0x57, 0x45, 0x42, 0x50] },
  // WAV: RIFF....WAVE
  { mime: 'audio/wav', offset: 0, bytes: [0x52, 0x49, 0x46, 0x46], extraOffset: 8, extraBytes: [0x57, 0x41, 0x56, 0x45] },
  // MP3: ID3 or FF FB / FF F3 / FF F2
  { mime: 'audio/mpeg', offset: 0, bytes: [0x49, 0x44, 0x33] },
  { mime: 'audio/mpeg', offset: 0, bytes: [0xff, 0xfb] },
  // OGG: OggS
  { mime: 'audio/ogg', offset: 0, bytes: [0x4f, 0x67, 0x67, 0x53] },
  // WEBM: 1A 45 DF A3
  { mime: 'audio/webm', offset: 0, bytes: [0x1a, 0x45, 0xdf, 0xa3] },
];

/**
 * Verify file buffer magic bytes match the declared MIME type.
 * Returns true if a matching signature is found.
 */
function verifyMagicBytes(buffer, declaredMime) {
  const signatures = MAGIC_SIGNATURES.filter((s) => s.mime === declaredMime);
  if (signatures.length === 0) return false; // unknown type — reject

  for (const sig of signatures) {
    const primary = sig.bytes.every((b, i) => buffer[sig.offset + i] === b);
    if (!primary) continue;

    // Some formats need a secondary check (WEBP vs WAV both start with RIFF)
    if (sig.extraBytes) {
      const secondary = sig.extraBytes.every((b, i) => buffer[sig.extraOffset + i] === b);
      if (!secondary) continue;
    }

    return true;
  }

  return false;
}

// MIME type filter (first pass — checked before file is fully read)
const fileFilter = (req, file, cb) => {
  if (ALLOWED_IMAGE_TYPES.has(file.mimetype) || ALLOWED_AUDIO_TYPES.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type. Only images (JPEG, PNG, WEBP) and audio (WEBM, WAV, MP3, OGG) are allowed.'
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
    files: 1,                   // single file only
  },
  fileFilter,
});

/**
 * Middleware that runs after multer to verify magic bytes.
 * Attach after upload.single('file') in routes.
 */
function verifyFileSignature(req, res, next) {
  if (!req.file) return next(); // no file — let controller handle it

  if (!verifyMagicBytes(req.file.buffer, req.file.mimetype)) {
    return res.status(400).json({
      success: false,
      error: 'File content does not match the declared file type.',
    });
  }

  next();
}

module.exports = upload;
module.exports.verifyFileSignature = verifyFileSignature;
