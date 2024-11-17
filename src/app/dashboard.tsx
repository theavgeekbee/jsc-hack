"use client";
import {useEffect, useState} from "react";
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

    interface UserInfo {
        name: string;
        aura: number;
        streak: number;
        date_registered: string;
        plan: string;
        mission_length: number;
        completed_challenges: string[];
    }
    interface Challenge {
        id: string;
        day: string;
        aura: number;
        challenge: string;
    }


    // TODO: collapse any types
    const [daily_challenge, setDailyChallenge] = useState<undefined | string>(
        undefined
    );
    // @eslint-ignore-next-line
    const [user_info, setUserInfo] = useState<undefined | {data: UserInfo}>(undefined);
    const [plan_fetched, setPlanFetched] = useState(false);
    const [last_week_challenges, setLastWeekChallenges] = useState<
        undefined | Challenge[]
    >(undefined);
    const [leaderboard, setLeaderboard] = useState<undefined | UserInfo[]>(undefined);

    useEffect(() => {
        fetch("/api/daily_challenge")
            .then((response) => response.json())
            .then((data) => setDailyChallenge(data.challenge));
        fetch("/api/user_info")
            .then((response) => response.json())
            .then((data) => {
                setUserInfo(data);

                const completed = data.data.completed_challenges ?? [];
                const last_5_day_challenges = completed.slice(-5).reverse();

                Promise.all(
                    last_5_day_challenges.map(async (challengeId: string) => {
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

                fetch(`/api/get_plan?mission_length=${data.data.mission_length}`)
                    .then((response) => response.ok)
                    .then((ok) => {
                        if (ok) setPlanFetched(true);
                    });
            });
        fetch("/api/aura_leaderboard")
            .then((response) => response.json())
            .then((data) => setLeaderboard(data.data));
    }, []);

    if (
        !plan_fetched ||
        !daily_challenge ||
        !user_info ||
        !last_week_challenges ||
        !leaderboard
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
        if (date.getDate() === new Date().getDate()) {
            return "today";
        }

        // is it in the past ?
        if (date.getDate() < new Date().getDate()) {
            return "past";
        }

        return undefined;
    }

    function getMonthNumber(startDate: Date, endDate: Date): number {
        const startYear = startDate.getFullYear();
        const startMonth = startDate.getMonth();
        const endYear = endDate.getFullYear();
        const endMonth = endDate.getMonth();

        return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
    }

    const start = new Date(user_info.data.date_registered);
    const now = new Date();

    const plan = JSON.parse(user_info.data.plan)[getMonthNumber(start, now) - 1];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isDailyCompleted = (user_info.data.completed_challenges ?? []).includes(daily_challenge ?? "");

    const markDailyComplete = () => {
        fetch("/api/mark_daily_complete")
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Daily challenge already is completed") {
                    alert("Daily challenge already completed");
                } else {
                    alert("Daily challenge completed");
                    window.location.reload();
                }
            });
    }

    const markPlanComplete = () => {
        fetch("/api/mark_plan_complete")
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Plan already marked as complete today") {
                    alert("Plan already marked as complete today");
                } else {
                    alert("Plan marked as complete");
                    window.location.reload();
                }
            });
    }

    const leaderboardPosition = leaderboard.findIndex(
        (user) => user.name === user_info.data.name
    ) + 1;

    return (
        <main className={styles.dashboard}>
            <header
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 50%), rgba(0, 0, 0, 0%)), url("${url}")`,
                }}
            >
                <h1>Welcome back, {user_info.data.name}</h1>
            </header>

            <h2>Your weekly progress</h2>
            <section className={styles.weekview}>
                {weekDates.map((date: Date, index: number) => {
                    const challenge = last_week_challenges.find(
                        (c) => parseInt(c.day.split("-")[2]) == date.getDate()
                    );

                    if (!challenge) {
                        return (
                            <CalendarDay
                                day={date.getDate()}
                                dayName={get_day_name(date)}
                                state={get_state(date, false)}
                                key={index}
                            />
                        );
                    }

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

            <h2>Your statistics</h2>
            <section className={styles.statistics}>
                <div className={styles.stat_aura}>
                    <span>🌟 AURA</span>
                    <span>{user_info.data.aura}</span>
                </div>
                <div className={styles.stat_streak}>
                    <span>🔥 STREAK</span>
                    <span>{user_info.data.streak}</span>
                </div>
                <div className={styles.stat_lb}>
                    <span>🏆 RANK</span>
                    <span>{leaderboardPosition}</span>
                </div>
            </section>

            <h2>Your missions</h2>
            <section className={styles.missions}>
                <div className={styles.mission_daily} onClick={() => {
                    markDailyComplete()
                }}>
                    <h3>DAILY</h3>
                    <p>{daily_challenge}</p>
                </div>
                <div className={styles.mission_} onClick={() => markPlanComplete()}>
                    <h3>MONTHLY</h3>
                    {plan.activity}
                </div>
            </section>
        </main>
    );
}
