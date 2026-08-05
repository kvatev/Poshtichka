"use client";

import React, { useState } from "react";
import { Download, Upload, ShieldCheck, Database, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CrmLead } from "@/lib/crm-store";

interface BackupManagerProps {
  leads: CrmLead[];
}

export const BackupManager = ({ leads }: BackupManagerProps) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleExportBackup = () => {
    setDownloading(true);
    setDownloaded(false);

    try {
      const backupData = {
        app: "Poshtichka CRM",
        version: "2.0.0",
        timestamp: new Date().toISOString(),
        totalLeads: leads.length,
        leads: leads,
      };

      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `poshtichka_crm_backup_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (err) {
      console.error("Backup export error:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Бекъп & Архивиране (Database Backup & Security)
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Експортирайте и съхранявайте пълно копие на цялата база данни на бизнеса
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 text-xs font-semibold text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Системата е готова за бекъп</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <Card className="p-6 sm:p-8 bg-white border border-brand-primary/20 space-y-4 shadow-xs">
          <div className="flex items-center space-x-3 border-b border-brand-primary/10 pb-3">
            <Download className="w-5 h-5 text-brand-accent" />
            <h3 className="font-serif text-xl font-bold text-brand-dark">
              Експорт на Пълен Архив (JSON Backup)
            </h3>
          </div>

          <p className="text-xs text-brand-dark/80 font-sans leading-relaxed">
            Изтеглете пълен архивиран файл, съдържащ всички записани клиенти, дати, плащания, транзакции, транспортни калкулации и вътрешни бележки.
          </p>

          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={handleExportBackup}
              disabled={downloading}
              className="flex items-center space-x-2"
            >
              {downloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Бекъпът е изтеглен!</span>
                </>
              ) : (
                <>
                  <Database className="w-4 h-4" />
                  <span>{downloading ? "Генериране..." : "Изтегли бекъп сега"}</span>
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Info & Automatic Snapshots */}
        <Card className="p-6 sm:p-8 bg-white border border-brand-primary/20 space-y-4 shadow-xs">
          <div className="flex items-center space-x-3 border-b border-brand-primary/10 pb-3">
            <RefreshCw className="w-5 h-5 text-brand-accent" />
            <h3 className="font-serif text-xl font-bold text-brand-dark">
              Автоматични Снапшоти
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-brand-bg border border-brand-primary/20 space-y-1">
              <span className="font-bold text-brand-dark">Supabase Cloud Sync:</span>
              <p className="text-brand-dark/70">Всички данни се съхраняват с двойно криптиране в PostgreSQL базата данни.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1 text-emerald-900">
              <span className="font-bold">Локален бекъп:</span>
              <p>Препоръчва се експортиране на локален бекъп файл в края на всеки месец.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
