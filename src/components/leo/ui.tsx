"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import type { ReactNode } from "react";

/**
 * Shared building blocks for the magical LeoLand kingdom.
 * Palette: Royal Blue #0F2A8A · Gold #F5B21B · Sky #87CEEB · Green #4CAF50.
 * Everything here is chunky, rounded, bouncy and child-friendly.
 */

export const LEO = {
  blue: "#0F2A8A",
  blueDark: "#0a1d61",
  gold: "#F5B21B",
  goldDark: "#d97706",
  sky: "#87CEEB",
  green: "#4CAF50",
  greenDark: "#357a38",
} as const;

type ChunkyVariant = "gold" | "blue" | "white" | "green";

const chunkyStyles: Record<ChunkyVariant, { rest: string; hover: string }> = {
  gold: {
    rest: "bg-[#F5B21B] text-[#0F2A8A] shadow-[0_8px_0_#d97706]",
    hover: "hover:shadow-[0_4px_0_#d97706]",
  },
  blue: {
    rest: "bg-[#0F2A8A] text-white shadow-[0_8px_0_#0a1d61]",
    hover: "hover:shadow-[0_4px_0_#0a1d61]",
  },
  green: {
    rest: "bg-[#4CAF50] text-white shadow-[0_8px_0_#357a38]",
    hover: "hover:shadow-[0_4px_0_#357a38]",
  },
  white: {
    rest: "bg-white text-[#0F2A8A] shadow-[0_8px_0_rgba(15,42,138,0.15)]",
    hover: "hover:shadow-[0_4px_0_rgba(15,42,138,0.15)]",
  },
};

type ChunkyButtonProps = {
  children: ReactNode;
  variant?: ChunkyVariant;
  leftIcon?: string;
  rightIcon?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  fullWidth?: boolean;
};

/** The signature pressable 3D button — sits on a thick colored shadow that compresses on click. */
export function ChunkyButton({
  children,
  variant = "gold",
  leftIcon,
  rightIcon,
  href,
  onClick,
  type = "button",
  className,
  fullWidth,
}: ChunkyButtonProps) {
  const s = chunkyStyles[variant];
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-extrabold text-lg",
    "transition-all duration-150 active:translate-y-2 active:shadow-none hover:translate-y-1",
    s.rest,
    s.hover,
    fullWidth && "w-full",
    className,
  );

  const inner = (
    <>
      {leftIcon && (
        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          {leftIcon}
        </span>
      )}
      <span>{children}</span>
      {rightIcon && (
        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          {rightIcon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}

type StatTone = "gold" | "blue" | "green" | "pink" | "sky";

const statTones: Record<StatTone, { bg: string; icon: string; ring: string }> = {
  gold: { bg: "bg-[#FFF6E2]", icon: "text-[#F5B21B]", ring: "border-[#F5B21B]/30" },
  blue: { bg: "bg-[#E8EDFF]", icon: "text-[#0F2A8A]", ring: "border-[#0F2A8A]/20" },
  green: { bg: "bg-[#E6F6E8]", icon: "text-[#4CAF50]", ring: "border-[#4CAF50]/30" },
  pink: { bg: "bg-[#FFE8F0]", icon: "text-[#EC4899]", ring: "border-[#EC4899]/30" },
  sky: { bg: "bg-[#E2F4FB]", icon: "text-[#38BDF8]", ring: "border-[#38BDF8]/30" },
};

/** Big rounded stat tile — XP, badges, words learned, streak, etc. */
export function StatCard({
  icon,
  value,
  label,
  tone = "gold",
}: {
  icon: string;
  value: string | number;
  label: string;
  tone?: StatTone;
}) {
  const t = statTones[tone];
  return (
    <div className={clsx("rounded-[28px] border-2 p-4 text-center shadow-sm", t.bg, t.ring)}>
      <span
        className={clsx("material-symbols-outlined text-[34px]", t.icon)}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>
      <p className="mt-1 text-2xl font-black text-[#0F2A8A] leading-none">{value}</p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-[#0F2A8A]/60">{label}</p>
    </div>
  );
}

/** Small inline pill used in top bars (icon + number). */
export function StatPill({
  icon,
  value,
  tone = "gold",
}: {
  icon: string;
  value: string | number;
  tone?: StatTone;
}) {
  const t = statTones[tone];
  return (
    <div className={clsx("flex items-center gap-1.5 rounded-full px-3 py-2 font-black text-[#0F2A8A]", t.bg)}>
      <span className={clsx("material-symbols-outlined text-[20px]", t.icon)} style={{ fontVariationSettings: "'FILL' 1" }}>
        {icon}
      </span>
      <span>{value}</span>
    </div>
  );
}

/** Section heading with an icon chip and optional action on the right. */
export function SectionTitle({
  icon,
  title,
  subtitle,
  action,
}: {
  icon?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div className="flex items-center gap-3">
        {icon && (
          <span
            className="material-symbols-outlined text-[28px] text-[#F5B21B]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {icon}
          </span>
        )}
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-[#0F2A8A] leading-tight">{title}</h2>
          {subtitle && <p className="text-sm font-semibold text-[#0F2A8A]/60">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

/** A soft animated progress bar with rounded "candy" fill. */
export function ProgressBar({
  value,
  tone = "gold",
  className,
}: {
  value: number;
  tone?: "gold" | "green" | "blue" | "sky";
  className?: string;
}) {
  const fill =
    tone === "green"
      ? "bg-[#4CAF50]"
      : tone === "blue"
        ? "bg-[#0F2A8A]"
        : tone === "sky"
          ? "bg-[#38BDF8]"
          : "bg-[#F5B21B]";
  return (
    <div className={clsx("h-4 w-full overflow-hidden rounded-full bg-[#0F2A8A]/10", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={clsx("h-full rounded-full", fill)}
      />
    </div>
  );
}

export function Floaty({
  children,
  className,
  duration = 4,
  delay = 0,
  distance = 14,
  style,
}: {
  children?: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  distance?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      aria-hidden
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      className={clsx("pointer-events-none select-none", className)}
      style={style}
    >
      {children}
    </motion.div>
  );
}
