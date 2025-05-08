
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Lightbulb, Trophy, Users, Clock, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function MegaMenu({ isOpen, onClose, className }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    // Close menu on escape key
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  return (
    <div 
      ref={menuRef}
      className={cn(
        "absolute top-full left-0 w-full md:w-auto md:min-w-[600px] bg-white shadow-lg rounded-lg overflow-hidden z-50",
        "transform transition-all duration-300 ease-in-out",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
        className
      )}
    >
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div>
          <h3 className="font-semibold text-moh-darkGreen mb-3">Challenge Categories</h3>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/challenges?category=Digital%20Health" 
                className="flex items-center gap-2 text-gray-700 hover:text-moh-green transition-colors p-2 rounded-md hover:bg-moh-lightGreen"
                onClick={onClose}
              >
                <Lightbulb className="h-5 w-5 text-moh-green" />
                <span>Digital Health</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/challenges?category=Artificial%20Intelligence" 
                className="flex items-center gap-2 text-gray-700 hover:text-moh-green transition-colors p-2 rounded-md hover:bg-moh-lightGreen"
                onClick={onClose}
              >
                <Brain className="h-5 w-5 text-moh-green" />
                <span>Artificial Intelligence</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/challenges?category=Operations" 
                className="flex items-center gap-2 text-gray-700 hover:text-moh-green transition-colors p-2 rounded-md hover:bg-moh-lightGreen"
                onClick={onClose}
              >
                <Users className="h-5 w-5 text-moh-green" />
                <span>Operations</span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-moh-darkGreen mb-3">Browse By</h3>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/challenges?status=open" 
                className="flex items-center gap-2 text-gray-700 hover:text-moh-green transition-colors p-2 rounded-md hover:bg-moh-lightGreen"
                onClick={onClose}
              >
                <Trophy className="h-5 w-5 text-moh-green" />
                <span>Open Challenges</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/challenges?status=upcoming" 
                className="flex items-center gap-2 text-gray-700 hover:text-moh-green transition-colors p-2 rounded-md hover:bg-moh-lightGreen"
                onClick={onClose}
              >
                <Clock className="h-5 w-5 text-moh-green" />
                <span>Upcoming Challenges</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-moh-lightGreen p-4 flex justify-between items-center">
        <p className="text-sm text-moh-darkGreen">Discover healthcare innovation challenges across the Kingdom</p>
        <Link 
          to="/challenges" 
          className="text-sm font-medium text-moh-green hover:text-moh-darkGreen transition-colors"
          onClick={onClose}
        >
          View All Challenges
        </Link>
      </div>
    </div>
  );
}

