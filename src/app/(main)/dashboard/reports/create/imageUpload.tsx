"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from 'next/image';

interface ImageUploadProps {
  value?: string[];
  onChange?: (urls: string[]) => void;
  onFilesChange?: (files: File[]) => void;
  disabled?: boolean;
  urls?: string[];
  readOnly?: boolean;
}

export default function ImageUpload({
  onFilesChange,
  disabled,
  urls = [],
  readOnly = false
}: ImageUploadProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const images = readOnly ? urls : previews;

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const totalFiles = files.length + selectedFiles.length;

    if (totalFiles > 8) {
      alert('Máximo 8 imágenes permitidas');
      return;
    }

    if (totalFiles < 4) {
      alert('Mínimo 4 imágenes requeridas');
      return;
    }

    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));

    setFiles(prev => [...prev, ...selectedFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
    onFilesChange?.([...files, ...selectedFiles]);
  }, [files, onFilesChange]);

  const removeImage = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });

    if (currentIndex >= previews.length - 1) {
      setCurrentIndex(Math.max(0, previews.length - 2));
    }

    onFilesChange?.(files.filter((_, i) => i !== index));

  }, [currentIndex, previews.length, files, onFilesChange]);

  const nextImage = () => {
    setCurrentIndex(i => (i + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(i => (i - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images.length, currentIndex]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {images.length > 0 ? (
        <>
          <div className="relative w-full h-full">
            <img
              src={images[currentIndex]}
              alt='Imagenes del reporte'
              className="w-full h-full object-contain"
            />
            {!readOnly && (
              <button
                type='button'
                onClick={() => removeImage(currentIndex)}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
              >
                <X size={16} />
              </button>
            )}

            {images.length > 1 && (
              <>
                <button
                  type='button'
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type='button'
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <button
                type='button'
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full",
                  currentIndex === index ? "bg-white" : "bg-white/50"
                )}
              />
            ))}
          </div>

          {!readOnly && (
            <div className="absolute bottom-4 right-4">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="add-more-images"
                onChange={handleFileChange}
                disabled={disabled || files.length >= 8}
              />
              <Button
                type='button'
                variant="outline"
                className="bg-white"
                disabled={disabled || files.length >= 8}
                onClick={() => document.getElementById('add-more-images')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Agregar más
              </Button>
            </div>
          )}
        </>
      ) : (
        !readOnly && (
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={disabled}
            />
            <Upload className="w-8 h-8 mb-2 text-gray-500" />
            <span className="text-sm text-gray-500">
              Subir imágenes (mín. 4, máx. 8)
            </span>
          </label>
        )
      )}
    </div>
  );
}