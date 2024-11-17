"use client";
import { useEffect, useState } from "react";
import CalendarDay from "@/components/CalendarDay";

import styles from "./dashboard.module.css";

export default function Home() {
  const url =
    "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const weekDates = [];
  const today = Date.now();
  for (let i = -5; i <= 1; i++) {
    weekDates.push(new Date(today + 24 * 60 * 60 * 1000 * i));
  }

  const [daily_challenge, setDailyChallenge] = useState<undefined | string>(
    undefined
  );
  // @eslint-ignore-next-line
  const [user_info, setUserInfo] = useState<undefined | any>(undefined);
  const [plan_fetched, setPlanFetched] = useState(false);
  const [last_week_challenges, setLastWeekChallenges] = useState<
    undefined | any[]
  >(undefined);

  console.log(daily_challenge)

  useEffect(() => {
    fetch("/api/get_plan")
      .then((response) => response.ok)
      .then((ok) => {
        if (ok) setPlanFetched(true);
      });
    fetch("/api/daily_challenge")
      .then((response) => response.json())
      .then((data) => setDailyChallenge(data.challenge));
    fetch("/api/user_info")
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        const last_5_day_challenges = [];
        const completed = data.data.completed_challenges;
        // TODO: use .slice() instead
        for (let i = 0; i < 5; i++) {
          if (completed.length - 1 - i < 0) break;
          last_5_day_challenges.push(completed[completed.length - 1 - i]);
        }
        Promise.all(
          last_5_day_challenges.map(async (challengeId) => {
            const response = await fetch(
              `/api/get_challenge?challenge_id=${challengeId}`
            );
            if (!response.ok) {
              return "Error";
            }
            return await response.json();
          })
        ).then((data) => {
          setLastWeekChallenges(data);
        });
      });
  }, []);

  if (
    !plan_fetched ||
    !daily_challenge ||
    !user_info ||
    !last_week_challenges
  ) {
    return (
      <main className={styles.loading}>
        <h1>Loading...</h1>
      </main>
    );
  }

  function get_day_name(date: Date) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  }
  function get_state(
    date: Date,
    has_challenged: boolean
  ): "today" | "streak" | "past" | undefined {
    // has it been completed ?
    if (has_challenged) {
      return "streak";
    }

    // is it today ?
    if (date.getDate() === (new Date()).getDate()) {
      return "today";
    }

    // is it in the past ?
    if (date < today) {
      return "past";
    }

    return undefined;
  }

  console.log(last_week_challenges)

  return (
    <main>
      <header
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 50%), rgba(0, 0, 0, 0%)), url("${url}")`,
        }}
      >
        <h1>Welcome back, {user_info.data.name}</h1>
      </header>

      <section className={styles.weekview}>
        {weekDates.map((date: Date, index: number) => {
          const challenge = last_week_challenges.find(
            (c) => c.day.split("-")[2] == date.getDate()
          );

          if (!challenge) {
            return <CalendarDay
              day={date.getDate()}
              dayName={get_day_name(date)}
              state={get_state(date, false)}
              key={index}
            />
          }

          const [year, month, day] = challenge.day.split("-");

          return (
            <CalendarDay
              day={date.getDate()}
              dayName={get_day_name(date)}
              state={get_state(date, true)}
              key={index}
            />
          );
        })}
      </section>

      <section className={styles.statistics}>
        
      </section>

      <h2>Your missions</h2>
      <section className={styles.missions}>
      </section>
    </main>
  );
}
