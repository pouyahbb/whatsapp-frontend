// Clean Code Principles Applied

const FILE_TYPE_MAP = {
  "text/plain": "TXT",
  "application/pdf": "PDF",
  "application/msword": "DOCX",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "DOCX",
  "application/vnd.ms-powerpoint": "PPTX",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "PPTX",
  "application/vnd.ms-excel": "XLSX",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
  "application/vnd.rar": "RAR",
  "application/zip": "ZIP",
  "audio/mpeg": "AUDIO",
  "audio/wav": "AUDIO",
  "video/mp4": "VIDEO",
  "video/mpeg": "VIDEO",
};

// Return the file type based on MIME type
export const getFileType = (mimeType) => {
  return FILE_TYPE_MAP[mimeType] || "IMAGE"; // Default to 'IMAGE' if not found
};
