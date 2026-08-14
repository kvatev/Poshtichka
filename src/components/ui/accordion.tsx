"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("space-y-4 max-w-4xl mx-auto", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border-2 border-[#2d3a37]/80 rounded-[32px] bg-[#f9f6f0] overflow-hidden shadow-md transition-all duration-300 hover:border-[#00b4b6]"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full text-left p-5 sm:p-6 flex justify-between items-center space-x-4 cursor-pointer focus:outline-none group"
              aria-expanded={isOpen}
            >
              <span className="font-salongbeach text-base sm:text-lg lg:text-xl font-bold uppercase tracking-wider text-[#182b2c] group-hover:text-[#00b4b6] transition-colors leading-snug">
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-9 h-9 rounded-full bg-[#00b4b6] text-white flex items-center justify-center shadow-sm"
              >
                <ChevronDown className="w-5 h-5 stroke-[2.5]" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-3 text-[#182b2c]/85 font-sans leading-relaxed text-sm sm:text-base border-t border-[#00b4b6]/20">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
