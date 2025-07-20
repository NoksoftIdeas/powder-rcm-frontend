import Image from "next/image";

interface LogoProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  tagline?: string;
  className?: string;
}

export default function Logo({ src = "/logo.png", alt = "Company Logo", width = 100, height = 100, tagline, className }: LogoProps) {
  return (
    <div className={`flex flex-col items-center ${className || ""}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="mb-2"
      />
      {tagline && <span className="text-xs text-center text-red-600 font-semibold mt-1">{tagline}</span>}
    </div>
  );
}
