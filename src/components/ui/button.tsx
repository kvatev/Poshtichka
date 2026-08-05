"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
      primary:
        "bg-brand-primary text-brand-dark hover:bg-[#E0A3A7] shadow-card focus:ring-brand-primary",
      secondary:
        "bg-brand-secondary text-brand-dark hover:bg-[#EFE0DC] focus:ring-brand-secondary",
      accent:
        "bg-brand-accent text-white hover:bg-[#B88A5C] shadow-glow focus:ring-brand-accent",
      outline:
        "border-2 border-brand-accent text-brand-dark hover:bg-brand-accent hover:text-white focus:ring-brand-accent",
      ghost:
        "bg-transparent text-brand-dark hover:bg-brand-secondary/50 focus:ring-brand-primary",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs tracking-wider uppercase",
      md: "px-6 py-3 text-sm tracking-wide",
      lg: "px-8 py-4 text-base tracking-wide font-semibold",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.03, y: disabled ? 0 : -2 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
