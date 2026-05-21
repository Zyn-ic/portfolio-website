"use client";
import { useState } from "react";

function PencilIcon() {
  return (
    <svg className="pc-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="pc-icon-pencil">
        <path d="M6 26l1.5-5.5L22 6l4 4L11.5 24.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M7.5 20.5l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 26l1-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path className="pc-icon-write" d="M10 28h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="14" strokeDashoffset="14" />
      </g>
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg className="pc-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="pc-icon-coffee">
        <path d="M6 14h16v10a4 4 0 01-4 4h-8a4 4 0 01-4-4V14z" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <path d="M22 16h2a3 3 0 010 6h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path className="pc-icon-steam pc-icon-steam-1" d="M10 10c0-2 2-2 2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path className="pc-icon-steam pc-icon-steam-2" d="M14 10c0-2 2-2 2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path className="pc-icon-steam pc-icon-steam-3" d="M18 10c0-2 2-2 2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

function ScissorsIcon() {
  return (
    <svg className="pc-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="pc-icon-scissors">
        <circle cx="9" cy="23" r="3.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <path className="pc-icon-blade" d="M12 11l14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path className="pc-icon-blade" d="M12 21l14-14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="pc-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="pc-icon-heart"
        d="M16 28S4 20 4 12a6 6 0 0112 0 6 6 0 0112 0c0 8-12 16-12 16z"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="pc-icon pc-icon--small" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <line className="pc-icon-clock-hour" x1="16" y1="16" x2="16" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line className="pc-icon-clock-min" x1="16" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="pc-icon pc-icon--small" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="pc-icon-pin">
        <path d="M16 3C10.5 3 6 7.5 6 13c0 7 10 16 10 16s10-9 10-16c0-5.5-4.5-10-10-10z" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <circle cx="16" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      </g>
    </svg>
  );
}

function MailIcon({ className = "pc-icon pc-icon--small" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="pc-icon-mail">
        <rect x="4" y="7" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <path className="pc-icon-mail-flap" d="M4 9l12 8 12-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

function CopyIcon({ className = "pc-icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className = "pc-icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function HeroMailCard({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className={`paper-hero-info-card ${copied ? "paper-hero-info-card--copied" : ""}`}
      onClick={handleCopy}
      title="Copy email"
    >
      {copied ? <CheckIcon className="pc-icon--tiny" /> : <MailIcon />}
      <span style={{ marginLeft: "0.25rem" }}>{copied ? "Copied!" : email}</span>
    </button>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`pc-copy-button ${copied ? "pc-copy-button--copied" : ""}`}
      title="Copy to clipboard"
    >
      <span className="pc-copy-text" style={{ marginRight: "0.4rem" }}>{text}</span>
      {copied ? <CheckIcon className="pc-icon--tiny" /> : <CopyIcon className="pc-icon--tiny" />}
    </button>
  );
}

export {
  PencilIcon,
  CoffeeIcon,
  ScissorsIcon,
  HeartIcon,
  ClockIcon,
  MapPinIcon,
  MailIcon,
  CopyIcon,
  CheckIcon,
  HeroMailCard,
  CopyButton,
};
