
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const ImageUploadSection = () => {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        Property Images
      </label>
      <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center">
        <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
        <p className="text-neutral-600 mb-2">Drag and drop images here, or click to browse</p>
        <p className="text-sm text-neutral-500">Upload up to 10 high-quality photos</p>
        <Button variant="outline" className="mt-4">
          Choose Files
        </Button>
      </div>
    </div>
  );
};

export default ImageUploadSection;
