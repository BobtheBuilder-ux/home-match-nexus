
import { Input } from "@/components/ui/input";

interface PropertyDetailsFormProps {
  formData: {
    title: string;
    description: string;
    address: string;
    city: string;
    state: string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
    propertyType: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PropertyDetailsForm = ({ formData, onInputChange }: PropertyDetailsFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Property Title
          </label>
          <Input
            name="title"
            value={formData.title}
            onChange={onInputChange}
            placeholder="e.g., Modern Downtown Apartment"
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Property Type
          </label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={onInputChange}
            className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="studio">Studio</option>
            <option value="shared">Shared Space</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onInputChange}
          rows={4}
          placeholder="Describe your property, its features, and what makes it special..."
          className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Address
          </label>
          <Input
            name="address"
            value={formData.address}
            onChange={onInputChange}
            placeholder="Street address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            City
          </label>
          <Input
            name="city"
            value={formData.city}
            onChange={onInputChange}
            placeholder="City"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            State
          </label>
          <Input
            name="state"
            value={formData.state}
            onChange={onInputChange}
            placeholder="State"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Monthly Rent ($)
          </label>
          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={onInputChange}
            placeholder="2500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Bedrooms
          </label>
          <Input
            name="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={onInputChange}
            placeholder="2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Bathrooms
          </label>
          <Input
            name="bathrooms"
            type="number"
            step="0.5"
            value={formData.bathrooms}
            onChange={onInputChange}
            placeholder="1.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Area (sq ft)
          </label>
          <Input
            name="area"
            type="number"
            value={formData.area}
            onChange={onInputChange}
            placeholder="1200"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsForm;
