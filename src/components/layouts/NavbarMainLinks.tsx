import React from "react";
import { NavLink } from "react-router-dom";
import { mainNavLinks } from "./navigation/navLinks";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavbarMainLinksProps {
  isRouteActive: (path: string) => boolean;
}

export function NavbarMainLinks({ isRouteActive }: NavbarMainLinksProps) {
  return (
    <nav className="hidden md:flex items-center space-x-4 w-full justify-center overflow-x-auto">
      {mainNavLinks.map((link, index) => {
        const Icon = link.icon;
        const isActive = isRouteActive(link.path);
        
        return (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              cn(
                "relative flex items-center text-sm font-medium transition-colors delay-150 whitespace-nowrap",
                "hover:text-moh-green hover:font-semibold",
                isActive
                  ? "text-moh-green font-semibold"
                  : "text-gray-600"
              )
            }
          >
            <div className="flex items-center gap-1.5">
              <Icon className="h-4 w-4" />
              <span>{link.label}</span>
            </div>
          </NavLink>
        );
      })}
    </nav>
  );
}
