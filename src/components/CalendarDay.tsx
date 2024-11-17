import "./CalendarDay.css";

interface CalendarDayProps {
  day: number;
  dayName: string;
  state: "today" | "future" | "streak" | undefined;
}

export default function CalendarDay({ day, dayName, state }: CalendarDayProps) {
  return (
    <div className="calendaryday" data-state={state}>
      <span>{dayName}</span>
      <span>{day}</span>
    </div>
  );
}
