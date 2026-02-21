import React from "react";
import { colorSchemes } from "../assets/assets";

const ColorSchemaSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-3">
      <label
        htmlFor="colorSchemaSelector"
        className="block text-sm font-medium"
      >
        Color Schema
      </label>
      <div className="grid grid-cols-6 gap-3">
        {colorSchemes.map((scheme) => {
          const selected = value === scheme.id;
          return (
            <button
              key={scheme.id}
              type="button"
              className={`w-full h-10 rounded-lg border ${
                selected ? "border-pink-500" : "border-white/12"
              }`}
              onClick={() => onChange(scheme.id)}
              title={scheme.name}
            >
              <div className="flex h-10 rounded-lg overflow-hidden">
                {scheme.colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-zinc-400">
        Selected: {colorSchemes.find((scheme) => scheme.id === value)?.name}
      </p>
    </div>
  );
};

export default ColorSchemaSelector;
