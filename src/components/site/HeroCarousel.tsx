import { useEffect, useState } from "react";

interface HeroCarouselProps {
  images: { src: string; alt: string }[];
  interval?: number;
}

export function HeroCarousel({ images, interval = 5000 }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === index ? 1 : 0,
            transform: i === index ? "scale(1.05)" : "scale(1)",
            transition:
              "opacity 1.6s var(--ease-out-expo), transform 7s var(--ease-out-expo)",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-background/40" />

      {/* indicator dots */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            className="h-px w-8 transition-all duration-500"
            style={{
              backgroundColor: i === index ? "var(--foreground)" : "var(--muted-foreground)",
              opacity: i === index ? 1 : 0.4,
              height: i === index ? "2px" : "1px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
