'use client';
import { useState, useEffect } from 'react';
import { getMeetups } from '../actions/meet.actions';
import { MeetupItem } from '../components/meetUpItem';
import { useRouter } from 'next/navigation';

function MeetupsList() {
  const router = useRouter();
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        const meetups = await getMeetups();
        setLoadedMeetups(meetups);
      } catch (err) {
        setError('Failed to fetch meetups. Please try again later.');
        console.error('Error fetching meetups:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeetups();
  }, []);

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-4xl font-bold text-center text-red-500 mt-10">
        {error}
      </p>
    );
  }

  return (
    <>
      {loadedMeetups.length > 0 ? (
        loadedMeetups.map((meetup) => (
          <MeetupItem meetup={meetup} key={meetup._id} />
        ))
      ) : (
        <p className="text-4xl font-bold text-center text-white mt-10">
          No meetups available
        </p>
      )}
    </>
  );
}

export default MeetupsList;