import { createClient } from "@/utils/supabase/server";

import styles from "./leaderboard.module.css";

export default async function LeaderboardPage() {
  const supabase = await createClient();

  const data = await supabase.from("users").select("*");
  const leaderboard = data.data?.sort((a, b) => b.aura - a.aura).slice(0, 10);

  const url =
    "https://images.unsplash.com/photo-1518943701174-17e4aff936d4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=anton-darius-0MEda5JdPTo-unsplash.jpg";

  const auras = [...new Set(leaderboard.map((user) => user.aura))];

  const leaderboardData = [];
  for (const user of leaderboard) {
    leaderboardData.push({
      user,
      rank: auras.indexOf(user.aura) + 1,
    });
  }

  return (
    <main className={styles.page}>
      <section>
        <header
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 50%), rgba(0, 0, 0, 0%)), url("${url}")`,
          }}
        >
          <h1>Leaderboard</h1>
        </header>
        <ol>
          {leaderboardData.map(({ user, rank }) => (
            <li>
              <span>
                <span>{rank}.</span> {user.name}
              </span>{" "}
              <span style={{ color: user.aura < 0 && "#DA4167" }}>
                {user.aura} aura
              </span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
