import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { Colors } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copyText = async (text: string, message: string = "Copied") => {
  await navigator.clipboard.writeText(text);
  toast(message);
};

export const moveCenter = (
  e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>
): void => {
  const element = e.target as HTMLElement;
  if (!element) return;

  if ("scrollIntoView" in element) {
    (element as HTMLElement).scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }
};

export const initials = (name: string): string => {
  if (!name) return "N/A";

  // Split the name into parts
  const parts = name.trim().split(/\s+/);

  // Get the first letter of the first and second parts
  const firstInitial = parts[0]?.charAt(0).toUpperCase() || "";
  const secondInitial = parts[1]?.charAt(0).toUpperCase() || "";

  return `${firstInitial}${secondInitial}`;
};

export const generateUniqueId = (length: number = 10): string => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export function hexToRgb(hex: string): string {
  if (!hex) return "";
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse r, g, b values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`; // Return as "r, g, b"
}

export const flattenColors = (colors: Colors): Record<string, string> => {
  const result: Record<string, string> = {};

  Object.keys(colors).forEach((colorName) => {
    const color = colors[colorName];

    // If the color is an object (e.g., primary, secondary), we loop through its shades
    if (typeof color === "object") {
      Object.keys(color).forEach((shade) => {
        if (shade === "DEFAULT") {
          result[colorName] = color[shade] as string;
        } else {
          // Assign shades with string keys (primary-100, etc.)
          result[`${colorName}-${shade}`] = color[shade] as string;
        }
      });
    } else {
      result[colorName] = color;
    }
  });

  return result;
};

export function isLightShade(hex: string): boolean {
  if (!hex) false;
  // Remove the hash if present
  hex = hex.replace(/^#/, "");

  // Parse the r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return the shade
  return luminance > 0.7 ? true : false;
}

export function darkenHexColor(hex: string, percent: number = 10): string {
  if (!hex) "";
  // Remove the hash symbol if present
  hex = hex.replace("#", "");

  // Ensure the hex code is valid
  if (hex.length !== 6) {
    throw new Error("Invalid hex color format. Use a 6-character hex code.");
  }

  // Convert hex to RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Darken each color channel by the specified percentage
  r = Math.max(0, r - (r * percent) / 100);
  g = Math.max(0, g - (g * percent) / 100);
  b = Math.max(0, b - (b * percent) / 100);

  // Convert RGB back to hex
  const toHex = (color: number): string =>
    Math.round(color).toString(16).padStart(2, "0");
  const darkenedHex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  return darkenedHex;
}

export function isValidHexColor(hex: string): boolean {
  // Match a 6-character hex code with optional # prefix
  const hexRegex = /^#?([0-9A-Fa-f]{6})$/;
  return hexRegex.test(hex);
}
