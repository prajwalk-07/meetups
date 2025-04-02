"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./context/AuthContext";
import MeetupsList from "./components/MeetupsList";
export default function Dashboard() {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return <div>

    Welcome to your Meetup Dashboard!
    <MeetupsList/>
  </div>;
}
