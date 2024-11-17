'use client';
import {useEffect, useState} from "react";

export default function Home() {
    const url = "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    const [daily_challenge, setDailyChallenge] = useState<undefined | string>(undefined);
    // @eslint-ignore-next-line
    const [user_info, setUserInfo] = useState<undefined | any>(undefined);
    const [plan_fetched, setPlanFetched] = useState(false);

    useEffect(() => {
        fetch("/api/get_plan")
            .then(response => response.ok)
            .then(ok => {
                if (ok)
                    setPlanFetched(true);
            });
        fetch("/api/daily_challenge")
            .then(response => response.json())
            .then(data => setDailyChallenge(data.challenge));
        fetch("/api/user_info")
            .then(response => response.json())
            .then(data => setUserInfo(data));
    }, []);

    if (!plan_fetched || !daily_challenge || !user_info) {
        return <h1>Loading...</h1>;
    }

    console.log(user_info);

    return <>
        <header
            style={{backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 50%), rgba(0, 0, 0, 0%)), url("${url}")`}}>
            <h1>Welcome back, {user_info.data.name}</h1>
        </header>
    </>;
}
