"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Counter from "./components/counter";

export default function Home() {
  return (
    <div className={styles.page}>
      <Counter />
    </div>
  );
}
