import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File, shouldAnalyze?: boolean) => Promise<void>;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadOnly = async () => {
    if (selectedFile) {
      await onFileUpload(selectedFile, false);
      setSelectedFile(null);
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (selectedFile) {
      await onFileUpload(selectedFile, true);
      setSelectedFile(null);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        className="hidden"
        onChange={handleFileInput}
        accept=".pdf,.doc,.docx,.txt"
        id="file-upload"
      />
      {!selectedFile ? (
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Upload Policy Document</h3>
          <p className="mt-1 text-xs text-gray-500">
            Drop your file here, or click to browse
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Supported formats: PDF, DOC, DOCX, TXT
          </p>
        </label>
      ) : (
        <div>
          <p className="text-sm font-medium text-gray-900 mb-4">
            Selected: {selectedFile.name}
          </p>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleUploadOnly}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Upload Only
            </button>
            <button
              onClick={handleUploadAndAnalyze}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Upload & Analyze
            </button>
          </div>
          <button
            onClick={() => setSelectedFile(null)}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;