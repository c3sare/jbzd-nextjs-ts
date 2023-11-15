export function getSelectedDate(preset: string | undefined) {
  const selectedTime = ["24h", "12h", "6h"].includes(preset ?? "")
    ? preset
    : "24h";

  const date = new Date();

  const inHours = Number(selectedTime!.slice(0, -1));

  date.setHours(date.getHours() - inHours);

  return date;
}
