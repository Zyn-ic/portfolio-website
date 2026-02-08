"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy, X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  content: string;
  isCopied: boolean;
  onCopy: () => void;
  onClose: () => void;
}

export default function ContactModal({
  isOpen,
  content,
  isCopied,
  onCopy,
  onClose,
}: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-card border border-border rounded-lg shadow-lg m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">User Tag</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 p-3 bg-muted rounded-md mb-6">
          <code className="flex-1 font-mono text-sm break-all">{content}</code>
          <span className="sr-only" aria-live="polite">
            {isCopied ? "Copied to clipboard" : ""}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onCopy}
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <Button className="w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
