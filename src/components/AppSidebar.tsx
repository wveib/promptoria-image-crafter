
import React from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarTrigger,
  SidebarRail
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyRound, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppSidebarProps {
  onApiKeySaved: (key: string) => void;
  apiKey: string | null;
}

export function AppSidebar({ onApiKeySaved, apiKey }: AppSidebarProps) {
  const [inputKey, setInputKey] = React.useState("");
  const { toast } = useToast();

  React.useEffect(() => {
    const storedKey = localStorage.getItem("gemini-api-key");
    if (storedKey) {
      onApiKeySaved(storedKey);
    }
  }, [onApiKeySaved]);

  const handleSaveApiKey = () => {
    if (!inputKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("gemini-api-key", inputKey);
    onApiKeySaved(inputKey);
    setInputKey("");

    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved",
    });
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <ImageIcon className="h-6 w-6 text-accent mr-2" />
        <span className="text-lg font-semibold">Promptoria</span>
        <div className="ml-auto">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      {/* Add the rail to make the sidebar retrievable */}
      <SidebarRail />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center">
            <KeyRound className="h-4 w-4 mr-2" />
            Gemini API Key
          </SidebarGroupLabel>
          
          <div className="px-2 space-y-3">
            {apiKey && (
              <div className="text-xs text-muted-foreground">
                <span>Key saved: </span>
                <code className="bg-muted px-1 py-0.5 rounded">
                  {apiKey.substring(0, 4)}...{apiKey.substring(apiKey.length - 4)}
                </code>
              </div>
            )}
            
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Enter API key"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="h-8 text-sm"
              />
              <Button size="sm" variant="outline" onClick={handleSaveApiKey}>
                Save
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              <a
                href="https://ai.google.dev/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-accent"
              >
                Get key from Google AI Studio
              </a>
            </p>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
