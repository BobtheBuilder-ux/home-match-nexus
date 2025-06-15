
import { useState } from "react";
import { Property } from "@/types/property";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

interface PropertyImagesProps {
  property: Property;
}

const PropertyImages = ({ property }: PropertyImagesProps) => {
  const [selected, setSelected] = useState(0);

  // Merge images and videos as items for the gallery
  const galleryItems = [
    ...(property.images || []).map((src) => ({ type: "image", src })),
    ...(property.videos || []).map((src) => ({ type: "video", src })),
  ];

  if (galleryItems.length === 0) {
    return (
      <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
        No image available
      </div>
    );
  }

  return (
    <div className="mb-8">
      <Carousel>
        <CarouselContent>
          {galleryItems.map((item, idx) => (
            <CarouselItem key={idx}>
              <div className="aspect-video w-full rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={`Property media ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={item.src}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {galleryItems.length > 1 && (
          <>
            <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default PropertyImages;
