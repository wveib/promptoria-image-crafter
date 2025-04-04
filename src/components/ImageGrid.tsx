
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import { GeneratedImage } from "@/pages/Index";

interface ImageGridProps {
  images: GeneratedImage[];
}

export function ImageGrid({ images }: ImageGridProps) {
  const handleDownload = (image: GeneratedImage) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `${image.prompt.replace(/\s+/g, "_") || "image"}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image download started");
  };
  const handleShare = async (image: GeneratedImage) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      toast.success("Image copied");
    } catch (error) {
      toast.error("Failed to copy image");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Generated Images</h2>
      <div className="image-grid">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="relative aspect-[4/3] w-full bg-muted">
              <img
                src={image.url}
                alt={image.prompt}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="mb-2">
                  {image.style}
                </Badge>
              </div>
              <p className="text-sm line-clamp-2 text-muted-foreground">
                {image.prompt}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between p-4 pt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(image)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare(image)}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
