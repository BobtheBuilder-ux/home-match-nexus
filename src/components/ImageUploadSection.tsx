
import FileUpload from './FileUpload';

interface ImageUploadSectionProps {
  onFilesSelect: (files: File[]) => void;
  disabled?: boolean;
}

const ImageUploadSection = ({ onFilesSelect, disabled }: ImageUploadSectionProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        Property Images
      </label>
      <FileUpload 
        onFileSelect={onFilesSelect}
        acceptedTypes=".jpg,.jpeg,.png,.gif"
        maxFiles={10}
        maxSizeMB={5}
        category="images"
        disabled={disabled}
      />
    </div>
  );
};

export default ImageUploadSection;
