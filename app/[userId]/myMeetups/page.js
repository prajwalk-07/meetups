'use client'
import { useState, useEffect, useContext,use } from "react";
import { getUserMeetups } from "../../actions/meet.actions";
import { MeetupItem } from "../../components/meetUpItem";
import { AuthContext } from "../../context/AuthContext";

export default function MyMeetups({ params }) {
  const { userId: authUserId } = useContext(AuthContext);
  const { userId: urlUserId } = use(params);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    if (urlUserId !== authUserId) {
      console.log("Unauthorized access");
      return;
    }

    const fetchMeetups = async () => {
      try {
        const meetups = await getUserMeetups(urlUserId);
        setLoadedMeetups(meetups);
      } catch (err) {
        console.log("Error fetching meetups:", err);
      }
    };
    fetchMeetups();
  }, [urlUserId, authUserId]);

  return (
    <>
      {loadedMeetups.length > 0 ? (
        loadedMeetups.map((meetup) => (
          <MeetupItem meetup={meetup} key={meetup._id} onDelete/>
        ))
      ) : (
        <p className="text-4xl font-bold text-center text-white mt-10">No meetups available</p>
      )}
    </>
  );
}