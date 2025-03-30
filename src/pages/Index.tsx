
import React, { useState } from "react";
import { ImageGenForm } from "@/components/ImageGenForm";
import { ImageGrid } from "@/components/ImageGrid";
import Navbar from "@/components/Navbar";
import { Spinner } from "@/components/Spinner";
import { useToast } from "@/hooks/use-toast";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { generateImages } from "@/services/geminiService";

export type GeneratedImage = {
  url: string;
  style: string;
  prompt: string;
  id: string;
};

const Index = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const { toast } = useToast();

  const handleApiKeySaved = (key: string) => {
    setApiKey(key);
  };

  const handleGenerateImages = async (
    userPrompt: string,
    styles: string[],
    count: number
  ) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key to generate images",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setPrompt(userPrompt);
    
    try {
      // Call the Gemini service to generate images
      const newImages = await generateImages(userPrompt, styles, count);
      setImages(newImages);
      
      toast({
        title: "Images Generated!",
        description: `Created ${count} images based on your prompt.`,
      });
    } catch (error) {
      console.error("Error generating images:", error);
      toast({
        title: "Generation Failed",
        description: "An error occurred while generating your images.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Promptoria <span className="text-accent">Image Crafter</span>
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-8">
            Create stunning AI-generated images in various styles with a simple prompt
          </p>
          
          {!apiKey && <ApiKeyInput onApiKeySaved={handleApiKeySaved} />}
          
          <ImageGenForm onGenerate={handleGenerateImages} />
        </div>
        
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Spinner size="lg" />
            <p className="mt-4 text-muted-foreground">
              Generating your images based on "{prompt}"...
            </p>
          </div>
        ) : (
          images.length > 0 && <ImageGrid images={images} />
        )}
        
        {!isGenerating && images.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">Enter a prompt to get started</h2>
            <p className="text-muted-foreground">
              Describe what you want to see, select styles, and let Gemini 2.0 create images for you
            </p>
          </div>
        )}
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} Promptoria Image Crafter. Powered by Gemini 2.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
