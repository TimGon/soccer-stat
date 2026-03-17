import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDate = (utcDate) => {
  if (!utcDate) return "-";
  try {
    const date = parseISO(utcDate);
    return format(date, "dd.MM.yyyy", { locale: ru });
  } catch (e) {
    console.warn("Invalid date:", utcDate);
    return "-";
  }
};

export const formatTime = (utcDate) => {
  if (!utcDate) return "-";
  try {
    const date = parseISO(utcDate);
    return format(date, "HH:mm", { locale: ru });
  } catch (e) {
    console.warn("Invalid date:", utcDate);
    return "-";
  }
};

export const formatDateForApi = (date) => {
  format(date, "yyyy-MM-dd");
};

export const formatScore = (match) => {
  if (!match?.score) return "-";

  const { fullTime, extraTime, penalties } = match.score;
  const parts = [];

  if (fullTime?.home != null && fullTime?.away != null) {
    parts.push(`${fullTime.home}:${fullTime.away}`);
  }

  if (extraTime?.home != null && extraTime?.away != null) {
    parts.push(`(${extraTime.home}:${extraTime.away})`);
  }

  if (penalties?.home != null && penalties?.away != null) {
    parts.push(`(${penalties.home}:${penalties.away})`);
  }

  return parts.length > 0 ? parts.join(" ") : "-";
};
