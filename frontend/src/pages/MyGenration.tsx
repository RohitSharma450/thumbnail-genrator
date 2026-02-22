import React, { useEffect, useState } from "react";
import SoftBackDrop from "../components/SoftBackDrop";
import { dummyThumbnails, type IThumbnail } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Download, DownloadIcon, TrashIcon } from "lucide-react";

const MyGeneration = () => {
  const navigate = useNavigate();
  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);
  const [loading, setLoading] = useState(false);

  const aspectRatioClassMap: Record<string, string> = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  };

  const fetchThumbnails = async () => {
    setThumbnails(dummyThumbnails as unknown as IThumbnail[]);
    setLoading(false);
  };
  console.log(thumbnails);

  const handleDownload = (image_url: string) => {
    window.open(image_url, "_blank");
  };

  const handleDelete = (id: string) => {
    console.log(id);
  };

  useEffect(() => {
    fetchThumbnails();
  }, []);

  return (
    <>
      <SoftBackDrop />
      <div className="min-h-screen px-6 mt-32 md:px-16 lg:px-24 xl:px-32 ">
        <h1 className="text-4xl font-bold mt-20">My Generation</h1>
        <p className="mt-1 mb-4 text-zinc-400">
          View your generated thumbnails here.
        </p>

        {loading && (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-[260px] border border-white/10 animate-pulse bg-white/6 rounded-2xl"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {thumbnails.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-zinc-200 text-2xl">
              No thumbnails generated yet.
            </p>
            <p className="text-zinc-400 text-xl">
              Generate your first thumbnail.
            </p>
          </div>
        )}

        {!loading && thumbnails.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8">
            {thumbnails.map((thumb: IThumbnail) => {
              const aspectClass =
                aspectRatioClassMap[thumb.aspect_ratio] || "16:9";
              return (
                <div
                  key={thumb._id}
                  onClick={() => navigate(`/generate/${thumb._id}`)}
                  className="mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 transition shadow-xl break-inside-avoid"
                >
                  <div
                    className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}
                  >
                    {thumb.image_url ? (
                      <img src={thumb.image_url} alt={thumb.title} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                        <span className="text-zinc-400">
                          {thumb.isGenerating ? "Generating..." : "No Image"}
                        </span>
                      </div>
                    )}

                    {thumb.isGenerating && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white animate-pulse">
                          Generating...
                        </span>
                      </div>
                    )}
                  </div>

                  {/* {Content} */}
                  <div className="space-y-2 p-4">
                    <h3 className="text-lg font-semibold">{thumb.title}</h3>
                    <div className="flex flex-wrap gap-2 text-sm text-zinc-400">
                      <span className="px-2 py-0.5 rounded bg-white/8">
                        {thumb.style}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/8">
                        {thumb.color_scheme}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/8">
                        {thumb.aspect_ratio}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">
                      {new Date(thumb.createdAt!).toDateString()}
                    </p>
                  </div>
                  {/* Hover Actions */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-2 right-2 max-sm:flex sm:hidden group-hover:flex gap-1.5"
                  >
                    <TrashIcon
                      onClick={() => handleDelete(thumb._id)}
                      className="size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all"
                    />
                    <DownloadIcon
                      onClick={() => handleDownload(thumb._id)}
                      className="size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all"
                    />
                    <ArrowUpRight
                      onClick={() => window.open(thumb.image_url, "_blank")}
                      className="size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyGeneration;
