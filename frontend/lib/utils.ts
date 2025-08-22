import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function smoothScrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

export function buildDownloadUrl(fileUrl: string, categoryName?: string) {
  if (!fileUrl) return "";
  const url = new URL(fileUrl, typeof window !== "undefined" ? window.location.origin : undefined);
  url.searchParams.set("download", "1");
  if (categoryName) {
    url.searchParams.set("category", categoryName.toLowerCase());
  }
  return url.toString();
}
