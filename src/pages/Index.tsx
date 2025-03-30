
import React, { useState } from "react";
import { ImageGrid } from "@/components/ImageGrid";
import { Spinner } from "@/components/Spinner";
import { useToast } from "@/hooks/use-toast";
import { generateImages } from "@/services/geminiService";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ChatInterface } from "@/components/ChatInterface";

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
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar onApiKeySaved={handleApiKeySaved} apiKey={apiKey} />
        
        <SidebarInset className="flex flex-col">
          <div className="flex-1 overflow-auto px-4 py-6">
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
          </div>
          
          <div className="mt-auto border-t">
            <ChatInterface onGenerate={handleGenerateImages} />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
