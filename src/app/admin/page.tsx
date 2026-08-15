"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar, AdminTab, adminNavItems } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { DashboardOverview } from "@/components/admin/dashboard-overview";
import { LeadsKanbanManager } from "@/components/admin/leads-kanban-manager";
import { CalendarView } from "@/components/admin/calendar-view";
import { FinanceManager } from "@/components/admin/finance-manager";
import { ServicesManager } from "@/components/admin/services-manager";
import { GalleryManager } from "@/components/admin/gallery-manager";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";
import { FAQManager } from "@/components/admin/faq-manager";
import { PricingManager } from "@/components/admin/pricing-manager";
import { SettingsManager } from "@/components/admin/settings-manager";
import { WebsiteContentManager } from "@/components/admin/website-content-manager";
import { HomepageEditor } from "@/components/admin/homepage-editor";
import { SeoManager } from "@/components/admin/seo-manager";
import { BookingDetailModal } from "@/components/admin/booking-detail-modal";
import {
  CrmLead,
  CrmNotification,
  defaultMockLeads,
  defaultNotifications,
} from "@/lib/crm-store";
import { X, Plus, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  // CRM State
  const [leads, setLeads] = useState<CrmLead[]>(defaultMockLeads);
  const [notifications, setNotifications] = useState<CrmNotification[]>(defaultNotifications);
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventType: "Сватбено тържество",
    eventDate: "",
    startTime: "16:00",
    endTime: "22:00",
    city: "Бургас",
    venueLocation: "",
    guestCount: 100,
    message: "",
  });

  useEffect(() => {
    // Client-side session check & initial lead fetch
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

    // Fetch live bookings
    fetch("/api/bookings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.bookings) && data.bookings.length > 0) {
          const mapped: CrmLead[] = data.bookings.map((b: any) => ({
            id: b.id,
            fullName: b.fullName || "Резервация",
            phone: b.phone || "",
            email: b.email || "",
            eventType: b.eventType || "Сватбено тържество",
            eventDate: b.eventDate || "",
            startTime: b.startTime || "16:00",
            endTime: b.endTime || "23:00",
            city: b.city || b.venueLocation?.split(",")[0] || "София",
            venueLocation: b.venueLocation || "",
            guestCount: Number(b.guestCount) || 100,
            requestedProducts: b.requestedProducts || ["Персонализирани картички"],
            message: b.message || "",
            createdAt: b.createdAt || new Date().toISOString(),
            status: b.status || "confirmed",
            pricing: b.pricing || {
              rentalPrice: Number(b.price) || 0,
              designPrice: 0,
              distanceKm: 0,
              transportPrice: 0,
              additionalServicesPrice: 0,
              discountAmount: 0,
              depositPaid: Number(b.depositPaid) || 0,
              paymentStatus: "unpaid",
            },
            internalNotes: b.internalNotes || [],
            attachedFiles: b.attachedFiles || [],
            communicationHistory: b.communicationHistory || [],
          }));
          setLeads(mapped);
        }
      })
      .catch(() => {});
  }, [router]);

  const handleUpdateLead = (updated: CrmLead) => {
    setLeads((prev) => {
      const updatedList = prev.map((l) => (l.id === updated.id ? updated : l));
      try {
        localStorage.setItem("poshtichka_cached_bookings", JSON.stringify(updatedList));
      } catch {}
      fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "bookings", value: updatedList }),
      }).catch(() => {});
      return updatedList;
    });
  };

  const handleDeleteLead = (id: string) => {
    setLeads((prev) => {
      const updatedList = prev.filter((l) => l.id !== id);
      try {
        localStorage.setItem("poshtichka_cached_bookings", JSON.stringify(updatedList));
      } catch {}
      fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "bookings", value: updatedList }),
      }).catch(() => {});
      return updatedList;
    });
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleCreateNewLead = (e: React.FormEvent) => {
    e.preventDefault();
    const created: CrmLead = {
      id: `BK-${1000 + leads.length + 1}`,
      fullName: newLeadForm.fullName,
      phone: newLeadForm.phone,
      email: newLeadForm.email,
      eventType: newLeadForm.eventType,
      eventDate: newLeadForm.eventDate || new Date().toISOString().split("T")[0],
      startTime: newLeadForm.startTime,
      endTime: newLeadForm.endTime,
      city: newLeadForm.city,
      venueLocation: newLeadForm.venueLocation || newLeadForm.city,
      guestCount: newLeadForm.guestCount,
      requestedProducts: ["Акварелни Картички"],
      message: newLeadForm.message,
      createdAt: new Date().toLocaleString("bg-BG"),
      status: "new",
      pricing: {
        rentalPrice: 400,
        designPrice: 35,
        distanceKm: 10,
        transportPrice: 0,
        additionalServicesPrice: 0,
        discountAmount: 0,
        depositPaid: 0,
        paymentStatus: "unpaid",
      },
      internalNotes: [],
      attachedFiles: [],
      communicationHistory: [],
    };

    setLeads([created, ...leads]);
    setShowNewLeadModal(false);

    // Add internal notification
    const newNotif: CrmNotification = {
      id: `notif-${Date.now()}`,
      title: "Ново запитване въведено",
      message: `${created.fullName} (${created.eventType}) беше добавен ръчно.`,
      type: "lead",
      timestamp: "Току-що",
      read: false,
      leadId: created.id,
    };
    setNotifications([newNotif, ...notifications]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-brand-dark/70 uppercase tracking-widest font-semibold">
            Зареждане на Poshtichka CRM...
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

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Global Admin Header */}
        <AdminHeader
          currentTabTitle={currentTabObj?.label || "Администрация"}
          leads={leads}
          notifications={notifications}
          onSelectLead={(lead) => setSelectedLead(lead)}
          onOpenNewLeadForm={() => setShowNewLeadModal(true)}
          onMarkNotificationRead={handleMarkNotificationRead}
        />

        {/* Dynamic CRM Modules Body */}
        <main className="p-6 sm:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === "dashboard" && (
            <DashboardOverview
              leads={leads}
              onNavigateToTab={(tab) => setActiveTab(tab as AdminTab)}
              onSelectLead={(lead) => setSelectedLead(lead)}
              onOpenNewLeadModal={() => setShowNewLeadModal(true)}
            />
          )}

          {activeTab === "leads" && (
            <LeadsKanbanManager
              leads={leads}
              onUpdateLead={handleUpdateLead}
              onOpenNewLeadModal={() => setShowNewLeadModal(true)}
            />
          )}

          {activeTab === "calendar" && (
            <CalendarView
              leads={leads}
              onUpdateLeads={(newLeads) => {
                setLeads(newLeads);
                try {
                  localStorage.setItem("poshtichka_cached_bookings", JSON.stringify(newLeads));
                } catch {}
              }}
              onSelectLead={(lead) => setSelectedLead(lead)}
            />
          )}

          {activeTab === "finance" && (
            <FinanceManager
              leads={leads}
              onUpdateLead={handleUpdateLead}
              onDeleteLead={handleDeleteLead}
            />
          )}

          {activeTab === "services" && <ServicesManager />}
          {activeTab === "homepage" && <HomepageEditor />}
          {activeTab === "content" && <WebsiteContentManager />}
          {activeTab === "gallery" && <GalleryManager />}
          {activeTab === "testimonials" && <TestimonialsManager />}
          {activeTab === "faq" && <FAQManager />}
          {activeTab === "pricing" && <PricingManager />}
          {activeTab === "seo" && <SeoManager />}
          {activeTab === "settings" && <SettingsManager />}
        </main>
      </div>

      {/* Selected Lead Details Modal */}
      {selectedLead && (
        <BookingDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdateLead={(updated) => {
            handleUpdateLead(updated);
            setSelectedLead(updated);
          }}
        />
      )}

      {/* New Lead Creator Modal */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 bg-brand-dark/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-brand-primary/30 space-y-6 relative">
            <div className="flex justify-between items-center border-b border-brand-primary/10 pb-4">
              <h3 className="font-serif text-2xl font-bold text-brand-dark">
                Добавяне на Ново Запитване
              </h3>
              <button
                onClick={() => setShowNewLeadModal(false)}
                className="text-brand-muted hover:text-brand-dark p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-brand-dark">Име и фамилия *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.fullName}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, fullName: e.target.value })
                    }
                    placeholder="напр. Георги Попов"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-brand-dark">Телефон *</label>
                  <input
                    type="tel"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, phone: e.target.value })
                    }
                    placeholder="+359 888 123 456"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-brand-dark">Имейл *</label>
                  <input
                    type="email"
                    required
                    value={newLeadForm.email}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, email: e.target.value })
                    }
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-brand-dark">Град *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.city}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, city: e.target.value })
                    }
                    placeholder="напр. Созопол"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-brand-dark">Дата на събитието</label>
                  <input
                    type="date"
                    value={newLeadForm.eventDate}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, eventDate: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-brand-dark">Вид събитие</label>
                  <select
                    value={newLeadForm.eventType}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, eventType: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30"
                  >
                    <option value="Сватбено тържество">Сватбено тържество</option>
                    <option value="Корпоративно събитие">Корпоративно събитие</option>
                    <option value="Рожден ден / Юбилей">Рожден ден / Юбилей</option>
                    <option value="Друго">Друго събитие</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-brand-dark">Локация / Веню</label>
                <input
                  type="text"
                  value={newLeadForm.venueLocation}
                  onChange={(e) =>
                    setNewLeadForm({ ...newLeadForm, venueLocation: e.target.value })
                  }
                  placeholder="напр. Комплекс Морски Бриз"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-brand-dark">Бележки / Изисквания</label>
                <textarea
                  rows={3}
                  value={newLeadForm.message}
                  onChange={(e) =>
                    setNewLeadForm({ ...newLeadForm, message: e.target.value })
                  }
                  placeholder="Допълнителна информация..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                >
                  Отказ
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Запази Запитването
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
