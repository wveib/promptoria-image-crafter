
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { CheckIcon, WandIcon, ChevronUpIcon } from "lucide-react";

interface ChatInterfaceProps {
  onGenerate: (prompt: string, styles: string[], count: number) => void;
}

const availableStyles = [
  { id: "realistic", name: "Realistic", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
  { id: "anime", name: "Anime", color: "bg-pink-100 text-pink-800 hover:bg-pink-200" },
  { id: "sketch", name: "Sketch", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
  { id: "oil-painting", name: "Oil Painting", color: "bg-amber-100 text-amber-800 hover:bg-amber-200" },
  { id: "watercolor", name: "Watercolor", color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" },
  { id: "3d-render", name: "3D Render", color: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200" },
  { id: "digital-art", name: "Digital Art", color: "bg-rose-100 text-rose-800 hover:bg-rose-200" },
  { id: "pixel-art", name: "Pixel Art", color: "bg-lime-100 text-lime-800 hover:bg-lime-200" },
];

export function ChatInterface({ onGenerate }: ChatInterfaceProps) {
  const [prompt, setPrompt] = useState("");
  const [imageCount, setImageCount] = useState(4);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["realistic", "anime", "sketch"]);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleStyleToggle = (styleId: string) => {
    if (selectedStyles.includes(styleId)) {
      // Don't allow deselecting if it's the last selected style
      if (selectedStyles.length > 1) {
        setSelectedStyles(selectedStyles.filter((id) => id !== styleId));
      }
    } else {
      setSelectedStyles([...selectedStyles, styleId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() === "") return;
    
    onGenerate(prompt, selectedStyles, imageCount);
  };

  return (
    <div className="border-t">
      <Collapsible
        open={isOptionsOpen}
        onOpenChange={setIsOptionsOpen}
        className="w-full"
      >
        <CollapsibleContent className="px-4 py-4 space-y-4 border-b">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Select styles ({selectedStyles.length} selected)
            </label>
            <div className="flex flex-wrap gap-2">
              {availableStyles.map((style) => {
                const isSelected = selectedStyles.includes(style.id);
                return (
                  <Badge
                    key={style.id}
                    variant="outline"
                    className={`${
                      style.color
                    } cursor-pointer px-3 py-1 ${
                      isSelected ? "ring-2 ring-accent" : ""
                    }`}
                    onClick={() => handleStyleToggle(style.id)}
                  >
                    {isSelected && <CheckIcon className="mr-1 h-3 w-3" />}
                    {style.name}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">
                Number of images to generate
              </label>
              <span className="font-medium text-accent">{imageCount}</span>
            </div>
            <Slider
              value={[imageCount]}
              min={1}
              max={9}
              step={1}
              onValueChange={(value) => setImageCount(value[0])}
              className="py-2"
            />
          </div>
        </CollapsibleContent>
        
        <div className="flex px-4 py-3 items-center">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="px-2">
              <ChevronUpIcon className={`h-5 w-5 ${isOptionsOpen ? "rotate-180" : ""} transition-transform`} />
              <span className="ml-1 text-xs">
                {isOptionsOpen ? "Hide options" : "Show options"}
              </span>
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <form onSubmit={handleSubmit} className="px-4 py-2 pb-4">
          <div className="flex gap-2">
            <Input
              placeholder="Describe the image you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" disabled={prompt.trim() === ""}>
              <WandIcon className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </div>
        </form>
      </Collapsible>
    </div>
  );
}
