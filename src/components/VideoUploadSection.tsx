
import FileUpload from './FileUpload';

interface VideoUploadSectionProps {
  onFilesSelect: (files: File[]) => void;
  disabled?: boolean;
}

const VideoUploadSection = ({ onFilesSelect, disabled }: VideoUploadSectionProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        Property Videos
      </label>
      <FileUpload 
        onFileSelect={onFilesSelect}
        acceptedTypes=".mp4,.mov"
        maxFiles={2}
        maxSizeMB={50}
        category="videos"
        disabled={disabled}
      />
    </div>
  );
};

export default VideoUploadSection;
