
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, File, X, Check } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  acceptedTypes?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  category?: string;
  disabled?: boolean;
}

const FileUpload = ({ 
  onFileSelect, 
  acceptedTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png", 
  maxFiles = 5,
  maxSizeMB = 10,
  category = "documents",
  disabled = false
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const validateFile = (file: File): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    
    if (file.size > maxSizeBytes) {
      toast.error(`File "${file.name}" is too large. Maximum size is ${maxSizeMB}MB.`);
      return false;
    }
    
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      toast.error(`File type "${fileExtension}" is not supported for ${category}.`);
      return false;
    }
    
    return true;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(validateFile);
    
    if (selectedFiles.length + validFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed.`);
      return;
    }
    
    const newFiles = [...selectedFiles, ...validFiles];
    setSelectedFiles(newFiles);
    onFileSelect(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFileSelect(newFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (!disabled) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      <Card 
        className={`border-2 border-dashed transition-colors ${
          dragOver ? 'border-primary bg-primary/5' : 'border-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && fileInputRef.current?.click()}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label={`Upload ${category} files. ${acceptedTypes} accepted, maximum ${maxFiles} files, ${maxSizeMB}MB each`}
        aria-disabled={disabled}
      >
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Upload className="w-8 h-8 text-gray-400 mb-4" aria-hidden="true" />
          <p className="text-center text-gray-600 mb-2">
            Drop files here or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Accepted: {acceptedTypes} | Max {maxFiles} files | Max {maxSizeMB}MB each
          </p>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        disabled={disabled}
        aria-label={`Select ${category} files to upload`}
      />

      {selectedFiles.length > 0 && (
        <div className="space-y-2" role="region" aria-label="Selected files">
          <h4 className="font-medium">Selected Files:</h4>
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg" role="listitem">
              <File className="w-4 h-4 text-gray-500" aria-hidden="true" />
              <div className="flex-1">
                <p className="font-medium text-sm">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                disabled={disabled}
                aria-label={`Remove ${file.name}`}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
