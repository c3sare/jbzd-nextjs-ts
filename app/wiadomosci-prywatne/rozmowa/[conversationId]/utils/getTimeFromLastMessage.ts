export default function getTimeFromLastMessage(date: Date | null) {
  if (!date) return "--";

  const now = new Date().getTime();
  const past = date.getTime();

  const diff = (now - past) / 1000;

  const minutes = Math.floor(diff / 60);

  const hours = Math.floor(diff / 60 / 60);

  const days = Math.floor(diff / 60 / 60 / 24);

  const months = Math.floor(diff / 60 / 24 / 30);

  const years = Math.floor(diff / 60 / 24 / 30 / 12);

  let text = "";

  if (diff < 60) {
    text = "kilka sekund";
  } else if (diff >= 60 && diff < 60 * 60) {
    if (minutes === 1) {
      text = "minutę";
    } else if (minutes % 10 > 1 && minutes % 10 <= 4) {
      text = `${minutes} minuty`;
    } else if (minutes % 10 > 4) {
      text = `${minutes} minut`;
    }
  } else if (diff >= 60 * 60 && diff < 60 * 24) {
    if (hours === 1) {
      text = "godzinę";
    } else if (hours % 10 > 1 && hours % 10 <= 4) {
      text = `${hours} godziny`;
    } else if (hours % 10 > 4) {
      text = `${hours} godzin`;
    }
  } else if (diff >= 60 * 24 && diff < 60 * 24 * 30) {
    if (days === 1) {
      text = "dzień";
    } else {
      text = `${days} dni`;
    }
  } else if (diff >= 60 * 24 * 30 && diff < 60 * 24 * 30 * 12) {
    if (months === 1) {
      text = "miesiąc";
    } else if (months % 10 > 1 && months % 10 <= 4) {
      text = `${months} miesiące`;
    } else {
      text = `${months} miesięcy`;
    }
  } else if (diff >= 60 * 24 * 30 * 12) {
    if (years === 1) {
      text = "rok";
    } else if (years % 10 > 1 && years % 10 <= 4) {
      text = `${years} lata`;
    } else {
      text = `${years} lat`;
    }
  }

  return text + " temu";
}
