"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-10 h-10"
    >
      <div className="relative w-6 h-6">
        {/* Sol */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : -180,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Sun className="w-6 h-6 text-yellow-500" strokeWidth={2.5} />
        </motion.div>

        {/* Lua */}
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 180,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Moon className="w-6 h-6 text-blue-400" strokeWidth={2.5} />
        </motion.div>
      </div>
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}