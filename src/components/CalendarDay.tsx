import styles from "./CalendarDay.module.css";

interface CalendarDayProps {
  day: number;
  dayName: string;
  state: "today" | "future" | "streak" | undefined;
}

export default function CalendarDay({ day, dayName, state }: CalendarDayProps) {
  return (
    <div className={styles.calendarday} data-state={state}>
      <span>{dayName.substring(0, 2).toUpperCase()}</span>
      <span>{day}</span>
    </div>
  );
}
