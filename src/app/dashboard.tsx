"use client";
import { useEffect, useState } from "react";

import Calendar from "@/components/Calendar";
import CalendarDay from "@/components/CalendarDay";

export default function Home() {
  const url =
    "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const today = Date.now();
  const days = [];
  for (let i = -5; i <= 1; i++) {
    days.push(new Date(today + 60 * 60 * 24 * 1000));
  }

  const [daily_challenge, setDailyChallenge] = useState<undefined | string>(
    undefined
  );
  // @eslint-ignore-next-line
  const [user_info, setUserInfo] = useState<undefined | any>(undefined);
  const [plan_fetched, setPlanFetched] = useState(false);
  const [weeklyChallenges, setWeeklyChallenges] = useState<undefined | any>(
    undefined
  );

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
        data?.completed_challenges.forEach((challenge_id: any) => {
          const challenge = fetch(
            `/api/get_challenge?challenge_id=${challenge_id}`
          )
            .then((response) => response.json())
            .then((data) => data);

          if (today.getDate() - challenge.day <= 5) {
            setWeeklyChallenges([...weeklyChallenges, challenge]);
          }
        });

        setWeeklyChallenges(weeklyChallenges.sort((a, b) => a.day - b.day));
      });
  }, []);

  if (!plan_fetched || !daily_challenge || !user_info) {
    return <h1>Loading...</h1>;
  }

  console.log(user_info);

  return (
    <>
      <header
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 50%), rgba(0, 0, 0, 0%)), url("${url}")`,
        }}
      >
        <h1>Welcome back, {user_info.data.name}</h1>

        <div>
        {days.map((day) => (
          <CalendarDay
            day={day.getDate()}
            dayName={WEEKDAY[day.getDay()]}
            state={
              day.getDate() === today.getDate()
                ? "today"
                : weeklyChallenges.includes(day.getDate())
                ? "streak"
                : day.getDate() < today.getDate()
                ? "future"
                : undefined
            }
          />
        ))}
        </div>
      </header>
    </>
  );
}
