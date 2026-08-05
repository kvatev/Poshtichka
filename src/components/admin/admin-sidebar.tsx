"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  FolderOpen,
  FileText,
  Home as HomeIcon,
  Search,
  BarChart3,
  Gift,
  Megaphone,
  Kanban,
  DollarSign,
  Database,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminTab =
  | "dashboard"
  | "leads"
  | "calendar"
  | "finance"
  | "customers"
  | "media"
  | "homepage"
  | "content"
  | "gallery"
  | "map-events"
  | "testimonials"
  | "faq"
  | "pricing"
  | "products"
  | "popups"
  | "banners"
  | "seo"
  | "analytics"
  | "backup"
  | "settings";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export const adminNavItems: { id: AdminTab; label: string; icon: React.ElementType; section?: string }[] = [
  { id: "dashboard", label: "Табло", icon: LayoutDashboard },
  { id: "leads", label: "Запитвания (Канбан)", icon: Kanban },
  { id: "calendar", label: "Календар Заетост", icon: Calendar },
  { id: "finance", label: "Финанси & Плащания", icon: DollarSign },
  { id: "customers", label: "Клиенти & Профили", icon: Users },
  { id: "media", label: "Медийна Библиотека", icon: FolderOpen, section: "Управление" },
  { id: "homepage", label: "Начална Страница", icon: HomeIcon },
  { id: "content", label: "Текстове & Съдържание", icon: FileText },
  { id: "gallery", label: "Галерия", icon: ImageIcon },
  { id: "map-events", label: "Карта & Локации", icon: MapPin },
  { id: "testimonials", label: "Отзиви", icon: MessageSquareQuote },
  { id: "faq", label: "ЧЗВ", icon: HelpCircle },
  { id: "pricing", label: "Цени & Калкулатор", icon: Tag },
  { id: "products", label: "Продукти & Сувенири", icon: Package },
  { id: "popups", label: "Попъп Мениджър", icon: Gift, section: "Маркетинг" },
  { id: "banners", label: "Промо Банери", icon: Megaphone },
  { id: "seo", label: "SEO & Метатегове", icon: Search },
  { id: "analytics", label: "Аналитика & Отчети", icon: BarChart3 },
  { id: "backup", label: "Бекъп & Сигурност", icon: Database, section: "Система" },
  { id: "settings", label: "Общи Настройки", icon: Settings },
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
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)]">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-brand-accent/40 flex-shrink-0 relative">
              <Image
                src="/media/logos/logo.webp"
                alt="Пощичка Лого"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-white leading-tight">
                  Пощичка
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-primary font-sans">
                  SaaS Business CRM
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
            const showSectionLabel = item.section && !collapsed;

            return (
              <React.Fragment key={item.id}>
                {showSectionLabel && (
                  <div className="pt-3 pb-1 px-3 text-[10px] uppercase tracking-widest font-mono text-brand-primary/70 font-semibold">
                    {item.section}
                  </div>
                )}
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl font-sans text-xs sm:text-sm transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-brand-accent text-white font-semibold shadow-md"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                  title={item.label}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="p-4 border-t border-white/10 space-y-2 bg-brand-dark">
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
            "w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl font-sans text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
          )}
          title="Изход"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Изход</span>}
        </button>
      </div>
    </aside>
  );
};
