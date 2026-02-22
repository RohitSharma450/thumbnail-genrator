import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  colorSchemes,
  dummyThumbnails,
  type AspectRatio,
  type IThumbnail,
} from "../assets/assets";
import SoftBackDrop from "../components/SoftBackDrop";
import AspectRatioSelector from "../components/AspectRatioSelector";
import StyleSelector from "../components/StyleSelector";
import ColorSchemaSelector from "../components/ColorSchemaSelector";
import PreviewPanel from "../components/PreviewPanel";

const Generate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorSchemeId, setColorSchemeId] = useState<string>(
    colorSchemes[0].id,
  );
  const [style, setStyle] = useState<IThumbnail>("Bold and Vibrant");

  const [styleDropDownOpen, setStyleDropDownOpen] = useState(false);

  const handleGenrate = async () => {};

  const fetchThumbnail = async () => {
    if (id) {
      const thumbnail: any = dummyThumbnails.find((t) => t._id === id);
      setThumbnail(thumbnail);
      setAdditionalInfo(thumbnail.user_prompt);
      setTitle(thumbnail.title);
      setColorSchemeId(thumbnail.colorScheme);
      setAspectRatio(thumbnail.aspectRatio);
      setStyle(thumbnail.style);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchThumbnail();
    }
  }, [id]);

  return (
    <>
      <SoftBackDrop />
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* Left Side */}
            <div className={`space-y-6 ${id && "pointer-events-none"}`}>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Create your thumbnail</h2>
                  <p className="text-sm text-zinc-400">
                    Describe your vision and let AI generate a thumbnail for you
                  </p>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium"
                    >
                      Title or topic
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-3 bg-white/12 border border-white/12 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="e.g, 10 Tips For Better Sleep"
                    />
                    <div className="flex justify-end">
                      <span className="text-xs">{title.length}/100</span>
                    </div>
                  </div>

                  {/* AspectRatioSelector */}
                  <AspectRatioSelector
                    value={aspectRatio}
                    onChange={setAspectRatio}
                  />

                  {/* StyleSelector */}
                  <StyleSelector
                    value={style}
                    onChange={setStyle}
                    isOpen={styleDropDownOpen}
                    setIsOpen={setStyleDropDownOpen}
                  />

                  {/* ColorSchemaSelector */}
                  <ColorSchemaSelector
                    value={colorSchemeId}
                    onChange={setColorSchemeId}
                  />

                  <div className="space-y-2">
                    <label
                      htmlFor="additionalInfo"
                      className="block text-sm font-medium"
                    >
                      Additional Information
                      <span className="text-xs ml-1">(optional)</span>
                    </label>
                    <textarea
                      id="additionalInfo"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      className="w-full p-3 bg-white/12 border border-white/12 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      rows={4}
                      placeholder="Add any specific styling and mood or any prefrence..."
                    />
                  </div>
                </div>
                {!id && (
                  <button
                    type="button"
                    onClick={handleGenrate}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    {loading ? "Generating..." : "Generate Thumbnail"}
                  </button>
                )}
              </div>
            </div>

            {/* Right Side */}
            <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Thumbnail Preview</h2>
                <PreviewPanel
                  thumbnail={thumbnail}
                  isLoading={loading}
                  aspectRatio={aspectRatio}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
