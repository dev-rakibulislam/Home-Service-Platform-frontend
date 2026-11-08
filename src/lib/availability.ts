export type AvailabilitySlot = {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
};

const DAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export function getUniqueAvailability(
  slots: AvailabilitySlot[],
) {
  const unique = new Map<string, AvailabilitySlot>();

  for (const slot of slots) {
    const key = `${slot.dayOfWeek}-${slot.startTime}-${slot.endTime}`;

    if (!unique.has(key)) {
      unique.set(key, slot);
    }
  }

  return Array.from(unique.values()).sort(
    (a, b) =>
      DAYS.indexOf(a.dayOfWeek) - DAYS.indexOf(b.dayOfWeek),
  );
}

export function getDayName(date: string) {
  if (!date) return "";

  const [year, month, day] = date.split("-").map(Number);

  return DAYS[new Date(year, month - 1, day).getDay()];
}

export function generateAvailableTimes(
  date: string,
  duration: number,
  slots: AvailabilitySlot[],
) {
  if (!date) return [];

  const dayName = getDayName(date);

  const daySlots = slots.filter(
    (slot) => slot.dayOfWeek === dayName,
  );

  const times = new Set<string>();

  for (const slot of daySlots) {
    const [startHour, startMinute] = slot.startTime
      .split(":")
      .map(Number);

    const [endHour, endMinute] = slot.endTime
      .split(":")
      .map(Number);

    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;

    for (
      let current = start;
      current + duration <= end;
      current += 30
    ) {
      const hours = Math.floor(current / 60);
      const minutes = current % 60;

      times.add(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`,
      );
    }
  }

  return Array.from(times).sort();
}

export function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}
