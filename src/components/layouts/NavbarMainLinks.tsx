
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
    <nav className="hidden md:flex items-center space-x-8">
      {mainNavLinks.map((link, index) => {
        const Icon = link.icon;
        const isActive = isRouteActive(link.path);
        
        return (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              cn(
                "relative flex items-center text-sm font-medium transition-colors delay-150",
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
            {isActive && (
              <motion.div
                className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-moh-green"
                layoutId="navbar-active-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
