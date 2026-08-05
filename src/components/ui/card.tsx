"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card = ({
  children,
  className,
  hoverEffect = true,
  ...props
}: CardProps) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -6, transition: { duration: 0.3 } } : undefined}
      className={cn(
        "bg-white rounded-2xl p-6 sm:p-8 border border-brand-primary/20 shadow-glass transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
