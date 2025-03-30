"use client";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Carousel({images}) {
    const [emblaRef] = useEmblaCarousel({ loop: true
    }, [Autoplay()]);
    console.log(JSON.stringify(images));

    if (!images || images.length === 0) {
        return <div>No images available</div>;
    }

  
    return (
        <div className="w-[80vw] mx-auto flex flex-col h-[40vh] ">
            <div className="overflow-hidden embla" ref={emblaRef}>
                <div className="embla__container">
                    {/* Map through the images and create a slide for each */}
                    {images.map((image, index) => (
                        <div key={index} className="embla__slide">
                            <img className="" src={image.src} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}