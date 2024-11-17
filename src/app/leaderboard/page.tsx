"use client";
import { useEffect, useState } from "react";

import styles from "./leaderboard.module.css";

export default function LeaderboardPage() {
  const url =
    "https://images.unsplash.com/photo-1518943701174-17e4aff936d4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=anton-darius-0MEda5JdPTo-unsplash.jpg";

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
      </section>
    </main>
  );
}
