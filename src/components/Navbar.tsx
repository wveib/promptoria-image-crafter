
import React from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold">Promptoria</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-accent">
            Home
          </a>
          <a href="#" className="text-sm font-medium hover:text-accent">
            Explore
          </a>
          <a href="#" className="text-sm font-medium hover:text-accent">
            How It Works
          </a>
          <a href="#" className="text-sm font-medium hover:text-accent">
            About
          </a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
