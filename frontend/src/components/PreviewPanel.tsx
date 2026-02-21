import React from "react";
import type { AspectRatio, IThumbnail } from "../assets/assets";
import { DownloadIcon, ImageIcon, Loader2Icon } from "lucide-react";

const PreviewPanel = ({
  thumbnail,
  isLoading,
  aspectRatio,
}: {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
}) => {
  const aspectClasses = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  } as Record<AspectRatio, string>;

  const downloadThumbnail = () => {
    if (!thumbnail?.image_url) return;
    window.open(thumbnail.image_url, "_blank");
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl rounded-lg bg-white/5 border border-white/10 overflow-hidden">
      <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2Icon className="animate-spin text-pink-500" />
            <div className="text-center">
              <p className="text-zinc-200 text-xs font-medium">
                AI is generating your thumbnail...
              </p>
              <p className="text-zinc-400 text-xs mt-1">
                This may take a few seconds.
              </p>
            </div>
          </div>
        )}

        {/* Image Preview */}
        {!isLoading && thumbnail?.image_url && (
          <div className="group relative w-full h-full">
            <img
              src={thumbnail?.image_url}
              alt="Generated thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={downloadThumbnail}
                className="bg-white/80 text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-white transition-colors"
              >
                <DownloadIcon className="w-4 h-4 inline-block mr-2" />
                Download Thumbnail
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !thumbnail?.image_url && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="text-zinc-400 text-sm">
              <ImageIcon className="w-6 h-6 mb-2 opacity-50" />
            </div>
            <div>
              <p className="text-zinc-200 text-center text-lg">
                Generate your first thumbnail.{" "}
              </p>
              <p className="text-zinc-400 text-center text-xs mt-1">
                fill out the form and click "Generate Thumbnail"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
