"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Users,
  Image as ImageIcon,
  MessageSquareQuote,
  HelpCircle,
  Tag,
  Package,
  Settings,
  LogOut,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminTab =
  | "dashboard"
  | "calendar"
  | "bookings"
  | "customers"
  | "gallery"
  | "testimonials"
  | "faq"
  | "pricing"
  | "products"
  | "settings";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export const adminNavItems: { id: AdminTab; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Табло", icon: LayoutDashboard },
  { id: "calendar", label: "Календар", icon: Calendar },
  { id: "bookings", label: "Запитвания", icon: ClipboardList },
  { id: "customers", label: "Клиенти", icon: Users },
  { id: "gallery", label: "Галерия", icon: ImageIcon },
  { id: "testimonials", label: "Отзиви", icon: MessageSquareQuote },
  { id: "faq", label: "ЧЗВ", icon: HelpCircle },
  { id: "pricing", label: "Цени", icon: Tag },
  { id: "products", label: "Продукти", icon: Package },
  { id: "settings", label: "Настройки", icon: Settings },
];

export const AdminSidebar = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
}: AdminSidebarProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <aside
      className={cn(
        "bg-brand-dark text-white border-r border-white/10 flex flex-col justify-between transition-all duration-300 min-h-screen sticky top-0 z-40",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center text-brand-primary flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-white leading-tight">
                  Пощичка
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-primary font-sans">
                  Admin Panel
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white/50 hover:text-white text-xs p-1 rounded-lg hover:bg-white/5 hidden md:block"
            title={collapsed ? "Разгъни" : "Свий"}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Nav List */}
        <nav className="space-y-1">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-sans text-sm transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-brand-accent text-white font-medium shadow-md"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
                title={item.label}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className={cn(
            "w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs font-sans text-white/60 hover:bg-white/5 hover:text-white transition-colors"
          )}
          title="Преглед на уебсайта"
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Виж сайта</span>}
        </Link>

        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-sans text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
          )}
          title="Изход"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Изход</span>}
        </button>
      </div>
    </aside>
  );
};
