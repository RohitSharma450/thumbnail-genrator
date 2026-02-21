import React from "react";
import type { ThumbnailStyle } from "../assets/assets";
import {
  ChevronDownIcon,
  CpuIcon,
  ImageIcon,
  PenToolIcon,
  SparkleIcon,
  SquareIcon,
} from "lucide-react";

const StyleSelector = ({
  value,
  onChange,
  isOpen,
  setIsOpen,
}: {
  value: ThumbnailStyle;
  onChange: (style: ThumbnailStyle) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const styleDescriptions: Record<ThumbnailStyle, string> = {
    "Bold and Vibrant": "Bright colors and dynamic compositions.",
    Minimalist: "Clean lines, simple shapes, and limited color palettes.",
    photorealistic:
      "Highly detailed and realistic imagery that looks like a photo.",
    Illustrative:
      "Hand-drawn or digitally created illustrations with a unique artistic style.",
    "Tech & Futuristic":
      "Sleek designs, neon colors, and elements inspired by technology and the future.",
  };

  const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
    "Bold and Vibrant": <SparkleIcon className="h-4 w-4" />,
    Minimalist: <SquareIcon className="h-4 w-4" />,
    photorealistic: <ImageIcon className="h-4 w-4" />,
    Illustrative: <PenToolIcon className="h-4 w-4" />,
    "Tech & Futuristic": <CpuIcon className="h-4 w-4" />,
  };
  console.log(value);

  return (
    <div className="relative space-y-3 dark">
      <label htmlFor="styleSelector" className="block text-sm font-medium">
        Thumbnail Style
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-white/12 border border-white/12 rounded-lg flex items-center justify-between"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-medium">
            {styleIcons[value]}
            <span className="ml-2">{value}</span>
          </div>
          <p className="text-xs text-gray-400 text-left">
            {styleDescriptions[value]}
          </p>
        </div>
        <ChevronDownIcon
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-white/12 bg-black/20 backdrop-blur-3xl shadow-lg">
          {Object.keys(styleDescriptions).map((key) => (
            <button
              key={key}
              type="button"
              className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-black/30"
              onClick={() => {
                onChange(key as ThumbnailStyle);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                {styleIcons[key as ThumbnailStyle]}
                <span className="ml-2">{key}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyleSelector;
