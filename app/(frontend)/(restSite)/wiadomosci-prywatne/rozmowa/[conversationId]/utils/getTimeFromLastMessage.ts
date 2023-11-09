import { parseISO } from "date-fns";

export default function getTimeFromLastMessage(date: Date | null) {
  if (!date) return "--";

  if (typeof date === "string") date = parseISO(date);

  const now = new Date().getTime();
  const past = date.getTime();

  const diff = Math.floor((now - past) / 1000);

  const minutes = Math.floor(diff / 60);

  const hours = Math.floor(minutes / 60);

  const days = Math.floor(hours / 24);

  let text = "";

  if (diff < 60) {
    text = "kilka sekund";
  } else if (diff >= 60 && diff < 60 * 60) {
    if (minutes === 1) {
      text = "minutę";
    } else if (minutes > 1 && minutes <= 4) {
      text = `${minutes} minuty`;
    } else {
      text = `${minutes} minut`;
    }
  } else if (diff >= 60 * 60 && diff < 60 * 60 * 24) {
    if (hours === 1) {
      text = "godzinę";
    } else if (hours % 10 > 1 && hours % 10 <= 4) {
      text = `${hours} godziny`;
    } else if (hours % 10 > 4) {
      text = `${hours} godzin`;
    }
  } else if (diff >= 60 * 60 * 24) {
    if (days === 1) {
      text = "dzień";
    } else {
      text = `${days} dni`;
    }
  }

  return text + " temu";
}
