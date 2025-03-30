
import React from "react";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export const SidebarRetriever = () => {
  const { state, toggleSidebar } = useSidebar();
  
  if (state !== "collapsed") return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleSidebar}
      className="fixed left-4 top-4 z-50 rounded-full h-10 w-10 shadow-md"
      aria-label="Open sidebar"
    >
      <PanelLeft className="h-5 w-5" />
    </Button>
  );
};
