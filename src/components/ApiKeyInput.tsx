
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyInputProps {
  onApiKeySaved: (apiKey: string) => void;
}

export function ApiKeyInput({ onApiKeySaved }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState<string>("");
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const { toast } = useToast();

  // Check localStorage on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem("gemini-api-key");
    if (storedKey) {
      setSavedKey(storedKey);
      onApiKeySaved(storedKey);
    }
  }, [onApiKeySaved]);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem("gemini-api-key", apiKey);
    setSavedKey(apiKey);
    onApiKeySaved(apiKey);

    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved locally",
    });

    // Clear input field
    setApiKey("");
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5" />
          Gemini API Key
        </CardTitle>
      </CardHeader>
      <CardContent>
        {savedKey ? (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              You have a saved API key. You can update it below if needed.
            </p>
            <div className="bg-muted p-2 rounded text-sm font-mono">
              {savedKey.substring(0, 4)}...{savedKey.substring(savedKey.length - 4)}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-4">
            Enter your Gemini API key to enable image generation. Your key is stored only in your browser's local storage.
          </p>
        )}
        
        <div className="flex gap-2">
          <Input
            type="password"
            placeholder="Enter your Gemini API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSaveApiKey} variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-3">
        <p className="text-xs text-muted-foreground">
          Don't have an API key? <a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="text-accent underline hover:text-accent/80">Get one from Google AI Studio</a>
        </p>
      </CardFooter>
    </Card>
  );
}
