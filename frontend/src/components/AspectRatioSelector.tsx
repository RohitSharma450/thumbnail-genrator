import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react";
import React from "react";
import { aspectRatios, type AspectRatio } from "../assets/assets";

const AspectRatioSelector = ({
  value,
  onChange,
}: {
  value: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
}) => {
  const mapRatios = {
    "16:9": <RectangleHorizontal className="w-5 h-5" />,
    "1:1": <Square className="w-5 h-5" />,
    "9:16": <RectangleVertical className="w-5 h-5" />,
  } as Record<AspectRatio, React.ReactNode>;

  return (
    <>
      <div className="space-y-6 dark">
        <label
          htmlFor="aspect-ratio-selector"
          className="block text-sm font-medium text-zinc-200"
        >
          Aspect Ratio
        </label>
        <div className="grid grid-cols-3 gap-4">
          {aspectRatios.map((ratio) => {
            const selected = value === ratio;
            return (
              <button
                key={ratio}
                type="button"
                onClick={() => onChange(ratio)}
                className={`p-3 rounded-lg border-2 ${selected ? "border-pink-500" : "border-white/10"} flex items-center justify-center hover:border-pink-500 transition-colors`}
              >
                {mapRatios[ratio]}
                <span className="ml-2">{ratio}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AspectRatioSelector;
