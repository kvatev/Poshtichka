"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar, AdminTab, adminNavItems } from "@/components/admin/admin-sidebar";
import { DashboardOverview } from "@/components/admin/dashboard-overview";
import { CalendarView } from "@/components/admin/calendar-view";
import { BookingsManager } from "@/components/admin/bookings-manager";
import { CustomersManager } from "@/components/admin/customers-manager";
import { GalleryManager } from "@/components/admin/gallery-manager";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";
import { FAQManager } from "@/components/admin/faq-manager";
import { PricingManager } from "@/components/admin/pricing-manager";
import { ProductsManager } from "@/components/admin/products-manager";
import { SettingsManager } from "@/components/admin/settings-manager";
import { MediaLibraryManager } from "@/components/admin/media-library-manager";
import { WebsiteContentManager } from "@/components/admin/website-content-manager";
import { HomepageEditor } from "@/components/admin/homepage-editor";
import { SeoManager } from "@/components/admin/seo-manager";
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard";
import { PopupManager } from "@/components/admin/popup-manager";
import { BannerManager } from "@/components/admin/banner-manager";
import { ShieldCheck } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Client-side session check
    fetch("/api/admin/session")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-brand-dark/70 uppercase tracking-widest font-semibold">
            Зареждане на административния панел...
          </p>
        </div>
      </div>
    );
  }

  const currentTabObj = adminNavItems.find((item) => item.id === activeTab);

  return (
    <div className="min-h-screen bg-brand-bg/60 flex text-brand-dark font-sans selection:bg-brand-primary selection:text-brand-dark">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Sticky Header */}
        <header className="bg-white border-b border-brand-primary/20 py-4 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-3">
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">
              {currentTabObj?.label || "Администрация"}
            </h1>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-2 bg-brand-secondary/60 px-3 py-1.5 rounded-full border border-brand-primary/20">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span className="font-bold text-brand-dark">admin</span>
              <span className="text-[10px] text-brand-muted uppercase font-mono">
                (Супер Администратор)
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Module Body */}
        <main className="p-6 sm:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === "dashboard" && (
            <DashboardOverview onNavigateToTab={(tab) => setActiveTab(tab as AdminTab)} />
          )}
          {activeTab === "calendar" && <CalendarView />}
          {activeTab === "bookings" && <BookingsManager />}
          {activeTab === "customers" && <CustomersManager />}
          {activeTab === "media" && <MediaLibraryManager />}
          {activeTab === "homepage" && <HomepageEditor />}
          {activeTab === "content" && <WebsiteContentManager />}
          {activeTab === "gallery" && <GalleryManager />}
          {activeTab === "testimonials" && <TestimonialsManager />}
          {activeTab === "faq" && <FAQManager />}
          {activeTab === "pricing" && <PricingManager />}
          {activeTab === "products" && <ProductsManager />}
          {activeTab === "popups" && <PopupManager />}
          {activeTab === "banners" && <BannerManager />}
          {activeTab === "seo" && <SeoManager />}
          {activeTab === "analytics" && <AnalyticsDashboard />}
          {activeTab === "settings" && <SettingsManager />}
        </main>
      </div>
    </div>
  );
}
