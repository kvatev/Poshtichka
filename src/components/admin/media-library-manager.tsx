"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Upload,
  Trash2,
  Copy,
  Check,
  FolderOpen,
  Image as ImageIcon,
  RefreshCw,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  category: string;
}

export const MediaLibraryManager = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dragActive, setDragActive] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.items) {
        setItems(data.items);
      }
    } catch (err) {
      console.error("Media fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUploadFiles = async (files: FileList | File[]) => {
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });
      }
      await fetchMedia();
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (url: string) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете този файл?")) return;
    try {
      await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      setItems((prev) => prev.filter((i) => i.url !== url));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.filename
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCat =
      categoryFilter === "all" ? true : item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Медийна Библиотека ({items.length})
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Качване, преглед и управление на изображения за уебсайта
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Търсене на файл..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-primary/30 text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent bg-brand-bg/50"
            />
          </div>

          <div className="flex items-center space-x-1 border border-brand-primary/20 rounded-xl p-1 bg-brand-bg text-xs">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                categoryFilter === "all"
                  ? "bg-brand-accent text-white"
                  : "text-brand-dark/70 hover:bg-white"
              }`}
            >
              Всички
            </button>
            <button
              onClick={() => setCategoryFilter("gallery")}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                categoryFilter === "gallery"
                  ? "bg-brand-accent text-white"
                  : "text-brand-dark/70 hover:bg-white"
              }`}
            >
              Галерия
            </button>
            <button
              onClick={() => setCategoryFilter("uploads")}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                categoryFilter === "uploads"
                  ? "bg-brand-accent text-white"
                  : "text-brand-dark/70 hover:bg-white"
              }`}
            >
              Качени
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchMedia}
            className="flex items-center space-x-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Обнови</span>
          </Button>
        </div>
      </div>

      {/* Drag and drop upload zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUploadFiles(e.dataTransfer.files);
          }
        }}
        className={`p-8 rounded-3xl border-2 border-dashed text-center transition-colors ${
          dragActive
            ? "border-brand-accent bg-brand-secondary/40"
            : "border-brand-primary/40 bg-white"
        }`}
      >
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-brand-secondary mx-auto flex items-center justify-center text-brand-accent">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-brand-dark">
            Плъзнете изображения тук или ги изберете
          </h3>
          <p className="text-xs text-brand-dark/70 font-sans">
            Поддържат се .webp, .jpg, .png, .svg (до 10MB)
          </p>
          <div>
            <label className="cursor-pointer inline-flex items-center space-x-2 bg-brand-accent text-white px-5 py-2.5 rounded-xl font-medium text-xs hover:bg-brand-accent/90 transition-colors shadow-sm">
              <span>{uploading ? "Качване..." : "Изберете файлове"}</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleUploadFiles(e.target.files);
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-2">
          <div className="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-brand-muted font-medium">Зареждане на изображенията...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <Card className="p-12 text-center text-brand-muted text-sm bg-white">
          Няма намерени изображения в медийната библиотека.
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="p-2 overflow-hidden group bg-white border border-brand-primary/20 hover:shadow-lg transition-all"
            >
              <div className="relative h-36 w-full rounded-xl overflow-hidden bg-brand-bg">
                <Image
                  src={item.url}
                  alt={item.filename}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handleCopyUrl(item.url)}
                    className="p-2 rounded-lg bg-white/90 text-brand-dark hover:bg-white transition-colors"
                    title="Копирай URL"
                  >
                    {copiedUrl === item.url ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(item.url)}
                    className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                    title="Изтрий"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="pt-2 px-1 space-y-1">
                <p className="text-[11px] font-bold text-brand-dark truncate" title={item.filename}>
                  {item.filename}
                </p>
                <div className="flex justify-between items-center text-[10px] text-brand-muted font-mono">
                  <span className="uppercase">{item.category}</span>
                  <button
                    onClick={() => handleCopyUrl(item.url)}
                    className="text-brand-accent hover:underline"
                  >
                    {copiedUrl === item.url ? "Копиран!" : "Копирай URL"}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
