"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Stethoscope,
  Mic,
  Users,
  FileText,
  Menu,
  X,
  Activity,
} from "lucide-react";
import clsx from "clsx";
import { healthCheck } from "@/services/api";

const navLinks = [
  { href: "/", label: "Home", icon: Stethoscope },
  { href: "/consultation", label: "New Consultation", icon: Mic },
  { href: "/records", label: "Patient Records", icon: FileText },
  { href: "/analytics", label: "Analytics", icon: Activity }
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);

  useEffect(() => {
    const pollBackend = async () => {
      try {
        const healthy = await healthCheck();
        setApiStatus(Boolean(healthy));
      } catch {
        setApiStatus(false);
      }
    };

    pollBackend();
    const interval = setInterval(() => {
      pollBackend();
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Stethoscope className="h-6 w-6" />
            <span>Aushadh</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* API status + mobile toggle */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-1.5 text-xs"
              title={apiStatus ? "Backend Online" : "Backend Offline"}
            >
              <Activity className="h-3.5 w-3.5" />
              <span
                className={clsx(
                  "h-2 w-2 rounded-full",
                  apiStatus ? "bg-accent animate-pulse" : "bg-danger"
                )}
              />
            </div>

            <button
              className="md:hidden p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-primary">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
