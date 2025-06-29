"use client";
import AppLayout from "@/app/App";
import MyContext from "@/app/context/myContext";


export default function Home() {
  return (
    <MyContext>
      <AppLayout />
    </MyContext>
  );
}
