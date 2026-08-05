"use client";

import React, { useState } from "react";
import {
  X,
  User,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Truck,
  FileText,
  Paperclip,
  MessageSquare,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Phone,
  Mail,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CrmLead,
  LeadStatus,
  PaymentStatus,
  leadStatusConfigs,
  calculateTransportCost,
  calculateTotalPrice,
  calculateRemainingBalance,
} from "@/lib/crm-store";

interface BookingDetailModalProps {
  lead: CrmLead;
  onClose: () => void;
  onUpdateLead: (updated: CrmLead) => void;
}

type TabType = "info" | "finance" | "transport" | "notes" | "files" | "communication";

export const BookingDetailModal = ({
  lead,
  onClose,
  onUpdateLead,
}: BookingDetailModalProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("info");
  const [currentLead, setCurrentLead] = useState<CrmLead>(lead);
  const [newNoteText, setNewNoteText] = useState("");
  const [newCommText, setNewCommText] = useState("");
  const [newCommType, setNewCommType] = useState<"call" | "email" | "viber" | "note">("call");

  // Handle status update
  const handleStatusChange = (newStatus: LeadStatus) => {
    const updated = { ...currentLead, status: newStatus };
    setCurrentLead(updated);
    onUpdateLead(updated);
  };

  // Handle payment status update
  const handlePaymentStatusChange = (newPayStatus: PaymentStatus) => {
    const updated = {
      ...currentLead,
      pricing: { ...currentLead.pricing, paymentStatus: newPayStatus },
    };
    setCurrentLead(updated);
    onUpdateLead(updated);
  };

  // Handle financial price updates
  const handlePriceFieldChange = (field: keyof CrmLead["pricing"], val: number) => {
    const updatedPricing = { ...currentLead.pricing, [field]: val };
    
    // Auto calculate transport if distance changed and not manually overridden
    if (field === "distanceKm" && !updatedPricing.manualTransportOverride) {
      updatedPricing.transportPrice = calculateTransportCost(val);
    }

    const updated = { ...currentLead, pricing: updatedPricing };
    setCurrentLead(updated);
    onUpdateLead(updated);
  };

  // Add internal note
  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const newNote = {
      id: `note-${Date.now()}`,
      author: "Администратор",
      text: newNoteText.trim(),
      createdAt: new Date().toLocaleString("bg-BG"),
    };
    const updated = {
      ...currentLead,
      internalNotes: [newNote, ...currentLead.internalNotes],
    };
    setCurrentLead(updated);
    onUpdateLead(updated);
    setNewNoteText("");
  };

  // Add communication log
  const handleAddCommunication = () => {
    if (!newCommText.trim()) return;
    const newComm = {
      id: `comm-${Date.now()}`,
      type: newCommType,
      summary: newCommText.trim(),
      timestamp: new Date().toLocaleString("bg-BG"),
      author: "Администратор",
    };
    const updated = {
      ...currentLead,
      communicationHistory: [newComm, ...currentLead.communicationHistory],
    };
    setCurrentLead(updated);
    onUpdateLead(updated);
    setNewCommText("");
  };

  // Handle file upload simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const newFile = {
        id: `file-${Date.now()}`,
        name: f.name,
        url: URL.createObjectURL(f),
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
        type: "pdf" as const,
        uploadedAt: new Date().toLocaleString("bg-BG"),
      };
      const updated = {
        ...currentLead,
        attachedFiles: [newFile, ...currentLead.attachedFiles],
      };
      setCurrentLead(updated);
      onUpdateLead(updated);
    }
  };

  const totalPrice = calculateTotalPrice(currentLead.pricing);
  const remainingBalance = calculateRemainingBalance(currentLead.pricing);

  return (
    <div className="fixed inset-0 z-50 bg-brand-dark/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-brand-primary/30 relative">
        {/* Header */}
        <div className="bg-brand-dark text-white p-6 flex items-center justify-between border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <span className="text-xs uppercase font-mono tracking-widest text-brand-primary">
                {currentLead.id}
              </span>
              <span
                className={`text-xs px-3 py-0.5 rounded-full font-bold border ${
                  leadStatusConfigs[currentLead.status].badgeClass
                }`}
              >
                {leadStatusConfigs[currentLead.status].label}
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-white">
              {currentLead.fullName}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-brand-bg px-6 py-2 border-b border-brand-primary/20 flex flex-wrap gap-2 text-xs">
          {[
            { id: "info", label: "Информация & Детайли", icon: User },
            { id: "finance", label: "Финанси & Плащане", icon: DollarSign },
            { id: "transport", label: "Транспортен Калкулатор", icon: Truck },
            { id: "notes", label: `Бележки (${currentLead.internalNotes.length})`, icon: FileText },
            { id: "files", label: `Файлове (${currentLead.attachedFiles.length})`, icon: Paperclip },
            { id: "communication", label: `Комуникация (${currentLead.communicationHistory.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-brand-accent text-white shadow-sm"
                    : "text-brand-dark/70 hover:bg-white hover:text-brand-dark"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: CLIENT & EVENT INFO */}
          {activeTab === "info" && (
            <div className="space-y-6">
              {/* Status Change Bar */}
              <Card className="p-4 bg-brand-bg/60 border border-brand-primary/20 space-y-2">
                <label className="text-xs font-bold text-brand-dark">
                  Промяна на статус на запитването:
                </label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(leadStatusConfigs) as LeadStatus[]).map((stKey) => {
                    const cfg = leadStatusConfigs[stKey];
                    const isCurrent = currentLead.status === stKey;
                    return (
                      <button
                        key={stKey}
                        onClick={() => handleStatusChange(stKey)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-brand-dark text-white border-brand-dark shadow-sm"
                            : `${cfg.badgeClass} hover:opacity-80`
                        }`}
                      >
                        {cfg.icon} {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Details Card */}
                <Card className="p-6 space-y-4 bg-white border border-brand-primary/20">
                  <h3 className="font-serif text-lg font-bold text-brand-dark border-b border-brand-primary/10 pb-2">
                    Данни за Клиента
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-brand-accent flex-shrink-0" />
                      <span><strong>Име:</strong> {currentLead.fullName}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-brand-accent flex-shrink-0" />
                      <span><strong>Телефон:</strong> <a href={`tel:${currentLead.phone}`} className="text-brand-accent hover:underline">{currentLead.phone}</a></span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-brand-accent flex-shrink-0" />
                      <span><strong>Имейл:</strong> <a href={`mailto:${currentLead.email}`} className="text-brand-accent hover:underline">{currentLead.email}</a></span>
                    </div>
                  </div>
                </Card>

                {/* Event Logistics Card */}
                <Card className="p-6 space-y-4 bg-white border border-brand-primary/20">
                  <h3 className="font-serif text-lg font-bold text-brand-dark border-b border-brand-primary/10 pb-2">
                    Детайли за Събитието
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-brand-accent flex-shrink-0" />
                      <span><strong>Дата:</strong> {currentLead.eventDate} ({currentLead.eventType})</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-brand-accent flex-shrink-0" />
                      <span><strong>Час:</strong> {currentLead.startTime} - {currentLead.endTime}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0" />
                      <span><strong>Град & Локация:</strong> {currentLead.venueLocation}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-4 h-4 text-brand-accent flex-shrink-0" />
                      <span><strong>Гости:</strong> {currentLead.guestCount} души</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Message & Products */}
              <Card className="p-6 space-y-4 bg-white border border-brand-primary/20">
                <h3 className="font-serif text-lg font-bold text-brand-dark border-b border-brand-primary/10 pb-2">
                  Заявени Продукти & Съобщение
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <strong className="block mb-1">Избрани продукти:</strong>
                    <div className="flex flex-wrap gap-2">
                      {currentLead.requestedProducts.map((prod, idx) => (
                        <span key={idx} className="bg-brand-secondary px-3 py-1 rounded-full text-brand-dark font-medium">
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>

                  {currentLead.message && (
                    <div className="pt-2">
                      <strong className="block mb-1">Съобщение от клиента:</strong>
                      <p className="italic bg-brand-bg p-3.5 rounded-xl border border-brand-primary/20 text-brand-dark/80">
                        &ldquo;{currentLead.message}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* TAB 2: FINANCIAL BREAKDOWN */}
          {activeTab === "finance" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-4 bg-brand-bg text-center space-y-1">
                  <span className="text-xs text-brand-muted uppercase font-bold">Обща Сума</span>
                  <div className="font-serif text-3xl font-bold text-brand-dark">{totalPrice} €</div>
                </Card>
                <Card className="p-4 bg-emerald-50 border-emerald-200 text-center space-y-1">
                  <span className="text-xs text-emerald-800 uppercase font-bold">Платено Капаро</span>
                  <div className="font-serif text-3xl font-bold text-emerald-700">{currentLead.pricing.depositPaid} €</div>
                </Card>
                <Card className="p-4 bg-amber-50 border-amber-200 text-center space-y-1">
                  <span className="text-xs text-amber-800 uppercase font-bold">Остатък за плащане</span>
                  <div className="font-serif text-3xl font-bold text-amber-700">{remainingBalance} €</div>
                </Card>
              </div>

              {/* Payment Status Dropdown */}
              <Card className="p-6 bg-white border border-brand-primary/20 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-brand-dark">
                    Статус на Плащането
                  </h3>
                  <select
                    value={currentLead.pricing.paymentStatus}
                    onChange={(e) => handlePaymentStatusChange(e.target.value as PaymentStatus)}
                    className="px-4 py-2 rounded-xl border border-brand-primary/30 text-xs font-bold text-brand-dark bg-brand-bg"
                  >
                    <option value="unpaid">🔴 Неплатено (Unpaid)</option>
                    <option value="deposit_paid">🟠 Платено Капаро (Deposit Paid)</option>
                    <option value="fully_paid">🟢 Напълно Платено (Fully Paid)</option>
                    <option value="refunded">⚪ Възстановена Сума (Refunded)</option>
                  </select>
                </div>
              </Card>

              {/* Price Calculation Matrix */}
              <Card className="p-6 bg-white border border-brand-primary/20 space-y-4">
                <h3 className="font-serif text-lg font-bold text-brand-dark border-b border-brand-primary/10 pb-2">
                  Калкулация на Елементите
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-brand-dark">Наем на Машина (€)</label>
                    <input
                      type="number"
                      value={currentLead.pricing.rentalPrice}
                      onChange={(e) => handlePriceFieldChange("rentalPrice", parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border border-brand-primary/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-brand-dark">Дизайн & Графика (€)</label>
                    <input
                      type="number"
                      value={currentLead.pricing.designPrice}
                      onChange={(e) => handlePriceFieldChange("designPrice", parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border border-brand-primary/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-brand-dark">Транспорт (€)</label>
                    <input
                      type="number"
                      value={currentLead.pricing.transportPrice}
                      onChange={(e) => handlePriceFieldChange("transportPrice", parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border border-brand-primary/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-brand-dark">Допълнителни Услуги (€)</label>
                    <input
                      type="number"
                      value={currentLead.pricing.additionalServicesPrice}
                      onChange={(e) => handlePriceFieldChange("additionalServicesPrice", parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border border-brand-primary/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-brand-dark">Отстъпка (€)</label>
                    <input
                      type="number"
                      value={currentLead.pricing.discountAmount}
                      onChange={(e) => handlePriceFieldChange("discountAmount", parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border border-brand-primary/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-brand-dark">Платено Капаро (€)</label>
                    <input
                      type="number"
                      value={currentLead.pricing.depositPaid}
                      onChange={(e) => handlePriceFieldChange("depositPaid", parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border border-brand-primary/30"
                    />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 3: TRANSPORT CALCULATOR */}
          {activeTab === "transport" && (
            <Card className="p-6 bg-white border border-brand-primary/20 space-y-6">
              <div className="flex items-center space-x-3 border-b border-brand-primary/10 pb-3">
                <Truck className="w-5 h-5 text-brand-accent" />
                <h3 className="font-serif text-xl font-bold text-brand-dark">
                  Автоматичен Транспортен Калкулатор (Бургас)
                </h3>
              </div>

              <div className="p-4 bg-brand-bg/60 rounded-2xl border border-brand-primary/20 space-y-2 text-xs">
                <p><strong>Условия за транспорт:</strong> База гр. Бургас. Първите <strong>50 км</strong> са безплатни. Всеки следващ километър се таксува по <strong>0.23 €/км</strong>.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-brand-dark">Разстояние от Бургас (км)</label>
                  <input
                    type="number"
                    value={currentLead.pricing.distanceKm}
                    onChange={(e) => handlePriceFieldChange("distanceKm", parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-brand-dark">Изчислен Транспорт (€)</label>
                  <input
                    type="number"
                    value={currentLead.pricing.transportPrice}
                    onChange={(e) => handlePriceFieldChange("transportPrice", parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-serif font-bold text-brand-accent"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* TAB 4: INTERNAL NOTES */}
          {activeTab === "notes" && (
            <div className="space-y-6">
              <Card className="p-6 bg-white border border-brand-primary/20 space-y-4">
                <h3 className="font-serif text-lg font-bold text-brand-dark">
                  Добави Вътрешна Бележка (Видима само за екипа)
                </h3>
                <div className="space-y-2">
                  <textarea
                    rows={3}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Напишете бележка за дата, специфични желания, организация..."
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-xs font-sans"
                  />
                  <Button variant="primary" size="sm" onClick={handleAddNote} className="flex items-center space-x-1.5">
                    <Plus className="w-4 h-4" />
                    <span>Добави бележка</span>
                  </Button>
                </div>
              </Card>

              <div className="space-y-3">
                {currentLead.internalNotes.map((note) => (
                  <Card key={note.id} className="p-4 bg-amber-50/50 border border-amber-200/60 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-amber-900">
                      <span className="font-bold">{note.author}</span>
                      <span className="text-[10px] text-amber-700">{note.createdAt}</span>
                    </div>
                    <p className="text-brand-dark/90 leading-relaxed font-sans">{note.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FILE ATTACHMENTS */}
          {activeTab === "files" && (
            <div className="space-y-6">
              <Card className="p-6 bg-white border border-brand-primary/20 space-y-4">
                <h3 className="font-serif text-lg font-bold text-brand-dark">
                  Прикрепи Нов Файл (Договор, Фактура, Дизайн)
                </h3>
                <div>
                  <label className="cursor-pointer inline-flex items-center space-x-2 bg-brand-accent text-white px-4 py-2 rounded-xl font-medium text-xs hover:bg-brand-accent/90 transition-colors shadow-xs">
                    <Upload className="w-4 h-4" />
                    <span>Качи файл</span>
                    <input type="file" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentLead.attachedFiles.map((file) => (
                  <Card key={file.id} className="p-4 bg-white border border-brand-primary/20 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <Paperclip className="w-5 h-5 text-brand-accent flex-shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-brand-dark block truncate">{file.name}</span>
                        <span className="text-[10px] text-brand-muted">{file.size} • {file.uploadedAt}</span>
                      </div>
                    </div>
                    <a href={file.url} target="_blank" rel="noreferrer" className="text-brand-accent hover:underline font-bold ml-2">
                      Изтегли
                    </a>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: COMMUNICATION HISTORY */}
          {activeTab === "communication" && (
            <div className="space-y-6">
              <Card className="p-6 bg-white border border-brand-primary/20 space-y-4">
                <h3 className="font-serif text-lg font-bold text-brand-dark">
                  Запиши Проведен Контакт (Обаждане, Имейл, Viber)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    value={newCommType}
                    onChange={(e) => setNewCommType(e.target.value as any)}
                    className="px-3 py-2 rounded-xl border border-brand-primary/30 text-xs"
                  >
                    <option value="call">📞 Телефонно обаждане</option>
                    <option value="email">✉️ Имейл съобщение</option>
                    <option value="viber">💬 Viber / WhatsApp</option>
                    <option value="note">📝 Общ контакт</option>
                  </select>
                  <input
                    type="text"
                    value={newCommText}
                    onChange={(e) => setNewCommText(e.target.value)}
                    placeholder="Резюме на разговора..."
                    className="sm:col-span-2 px-3 py-2 rounded-xl border border-brand-primary/30 text-xs"
                  />
                </div>
                <Button variant="primary" size="sm" onClick={handleAddCommunication} className="flex items-center space-x-1">
                  <Send className="w-3.5 h-3.5" />
                  <span>Запиши контакт</span>
                </Button>
              </Card>

              <div className="space-y-3">
                {currentLead.communicationHistory.map((comm) => (
                  <Card key={comm.id} className="p-4 bg-white border border-brand-primary/20 space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-brand-dark capitalize">
                        {comm.type === "call" ? "📞 Разговор" : comm.type === "email" ? "✉️ Имейл" : "💬 Чат"} — {comm.author}
                      </span>
                      <span className="text-[10px] text-brand-muted">{comm.timestamp}</span>
                    </div>
                    <p className="text-brand-dark/80 font-sans">{comm.summary}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
