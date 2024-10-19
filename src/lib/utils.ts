import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateInput: string | Date): string => {
  let date: Date;

  if (typeof dateInput === "string") {
    // Common date format patterns
    const patterns = [
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/, // ISO 8601
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, // ISO 8601 without milliseconds
      /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
      /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
      /^\d{2}-\d{2}-\d{4}$/, // DD-MM-YYYY
      /^\d{2} \w+ \d{4}$/, // DD Month YYYY
    ];

    date = new Date(dateInput);

    if (isNaN(date.getTime())) {
      for (const pattern of patterns) {
        if (pattern.test(dateInput)) {
          date = new Date(dateInput.replace(/-/g, "/"));
          break;
        }
      }

      if (isNaN(date.getTime())) {
        return "Invalid date format";
      }
    }
  } else {
    date = dateInput;
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  return date.toLocaleDateString(undefined, options);
};

// utils/debounce.ts

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}
