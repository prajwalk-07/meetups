'use client'
import { useState, useEffect } from 'react';
import { getMeetups } from "../actions/meet.actions";
import { MeetupItem } from '../components/meetUpItem';
import { useRouter } from 'next/navigation';

function MeetupsList() {
    const router=useRouter()
    const [loadedMeetups, setLoadedMeetups] = useState([]);

    useEffect(() => {
        const fetchMeetups = async () => {
            try {
                const meetups = await getMeetups();
                setLoadedMeetups(meetups);
                console.log(meetups)
            } catch (err) {
                console.log("Error fetching meetups:", err);
            }
        };
        fetchMeetups();
        
    }, []);
    return (
        <>
            {loadedMeetups.length > 0 ? (
                loadedMeetups.map(meetup => (
                    <MeetupItem meetup={meetup} key={meetup._id} /> // ✅ Add a unique key
                ))
            ) : (
                <p className="text-4xl font-bold text-center text-white mt-10">No meetups available</p> // ✅ Handle empty data case
            )}
        </>
    );
}

export default MeetupsList;
