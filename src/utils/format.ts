import { formatDistanceToNow, format } from "date-fns";

export function formatDuration(totalSeconds: number): string {
  if (!totalSeconds) return "0";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}sec`;
  }
  return `${seconds}sec`;
}

export function getRelativeTime(dateStr: string): string {
  if (!dateStr) return "-";
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
  } catch {
    return "-";
  }
}

export function formatCallTime(dateStr: string): string {
  try {
    return format(new Date(dateStr), "h:mm aa").toLowerCase();
  } catch {
    return "";
  }
}

export function formatDateLabel(dateStr: string): string {
  try {
    return format(new Date(dateStr), "MMMM do");
  } catch {
    return "";
  }
}

export function getInitials(name: string): string {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0][0].toUpperCase();
}
