"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  Plus,
  ShieldCheck,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CrmLead, CrmNotification, leadStatusConfigs } from "@/lib/crm-store";

interface AdminHeaderProps {
  currentTabTitle: string;
  leads: CrmLead[];
  notifications: CrmNotification[];
  onSelectLead: (lead: CrmLead) => void;
  onOpenNewLeadForm: () => void;
  onMarkNotificationRead: (id: string) => void;
  onDeleteNotification?: (id: string) => void;
  onClearAllNotifications?: () => void;
}

export const AdminHeader = ({
  currentTabTitle,
  leads,
  notifications,
  onSelectLead,
  onOpenNewLeadForm,
  onMarkNotificationRead,
  onDeleteNotification,
  onClearAllNotifications,
}: AdminHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Filter search results across Name, Phone, Email, City, Booking ID
  const searchResults = searchQuery.trim()
    ? leads.filter((l) => {
        const q = searchQuery.toLowerCase();
        return (
          l.fullName.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q) ||
          l.venueLocation.toLowerCase().includes(q) ||
          l.id.toLowerCase().includes(q) ||
          l.eventType.toLowerCase().includes(q)
        );
      })
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-brand-primary/20 py-3 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs font-sans">
      {/* Title */}
      <div className="flex items-center space-x-3">
        <h1 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">
          {currentTabTitle}
        </h1>
      </div>

      {/* Controls: Search, Notifications, Super Admin badge */}
      <div className="flex items-center space-x-4">
        {/* Global Search Bar */}
        <div ref={searchRef} className="relative hidden md:block w-72 lg:w-96">
          <div className="relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Търсене на резервация, име, телефон, град..."
              className="w-full pl-9 pr-8 py-2 rounded-2xl border border-brand-primary/30 text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent bg-brand-bg/50 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Overlay Results */}
          {searchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-brand-primary/30 max-h-96 overflow-y-auto z-50 p-3 space-y-2">
              <div className="text-[10px] uppercase font-bold text-brand-muted px-2">
                Резултати от търсенето ({searchResults.length})
              </div>

              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-xs text-brand-muted">
                  Няма намерени резултати за &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                searchResults.map((lead) => {
                  const statusInfo = leadStatusConfigs[lead.status];
                  return (
                    <button
                      key={lead.id}
                      onClick={() => {
                        onSelectLead(lead);
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="w-full text-left p-3 rounded-xl hover:bg-brand-bg transition-colors border border-transparent hover:border-brand-primary/20 space-y-1 cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-brand-dark">
                          {lead.fullName}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${statusInfo.badgeClass}`}
                        >
                          {statusInfo.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-brand-dark/70 font-sans">
                        <span>📅 {lead.eventDate}</span>
                        <span>📍 {lead.city}</span>
                        <span>📞 {lead.phone}</span>
                        <span className="font-serif font-bold text-brand-accent ml-auto">
                          {lead.pricing.rentalPrice + lead.pricing.designPrice} €
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Quick Action Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={onOpenNewLeadForm}
          className="hidden sm:flex items-center space-x-1.5 text-xs py-2"
        >
          <Plus className="w-4 h-4" />
          <span>Ново запитване</span>
        </Button>

        {/* Notification Bell */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2.5 rounded-2xl bg-brand-bg hover:bg-brand-secondary border border-brand-primary/20 text-brand-dark transition-colors relative cursor-pointer"
            title="Известия"
          >
            <Bell className="w-5 h-5 text-brand-dark" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Drawer Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-brand-primary/30 p-4 space-y-3 z-50">
              <div className="flex items-center justify-between border-b border-brand-primary/10 pb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-serif font-bold text-base text-brand-dark">
                    Известия ({notifications.length})
                  </h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
                      {unreadCount} нови
                    </span>
                  )}
                </div>

                {notifications.length > 0 && onClearAllNotifications && (
                  <button
                    type="button"
                    onClick={onClearAllNotifications}
                    className="text-[11px] text-red-600 hover:text-red-800 font-semibold cursor-pointer px-2 py-0.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Изчисти всички
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-brand-muted">
                    Няма нови известия.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => onMarkNotificationRead(n.id)}
                      className={`p-3 rounded-2xl text-xs space-y-1 transition-colors cursor-pointer border relative group ${
                        n.read
                          ? "bg-gray-50 border-gray-100 text-gray-700"
                          : "bg-amber-50/60 border-amber-200 text-amber-950 font-medium"
                      }`}
                    >
                      <div className="flex justify-between items-center pr-6">
                        <span className="font-bold">{n.title}</span>
                        <span className="text-[10px] text-brand-muted">{n.timestamp}</span>
                      </div>
                      <p className="leading-relaxed text-brand-dark/80">{n.message}</p>

                      {/* Delete notification button */}
                      {onDeleteNotification && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteNotification(n.id);
                          }}
                          className="absolute top-2.5 right-2.5 p-1 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Изтрий известието"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Admin Badge */}
        <div className="hidden lg:flex items-center space-x-2 bg-brand-secondary/60 px-3 py-1.5 rounded-full border border-brand-primary/20 text-xs">
          <ShieldCheck className="w-4 h-4 text-brand-accent" />
          <span className="font-bold text-brand-dark">admin</span>
          <span className="text-[10px] text-brand-muted uppercase font-mono">(Супер Валидация)</span>
        </div>
      </div>
    </header>
  );
};
