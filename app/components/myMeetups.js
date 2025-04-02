import { useContext, useEffect, useState } from "react"
import { getUserMeetups } from "../actions/meet.actions"
import { AuthContext } from "../context/AuthContext"
function MyMeetups() {
    const {userId}=useContext(AuthContext)
    const [loadedMeetups,setLoadedMeetups]=useState([])
    useEffect(()=>{
        const fetchMeetups=async ()=>{
            try{ const meetups=await getUserMeetups(userId)
                setLoadedMeetups(meetups)}catch(err){
                    console.log("error fetching the meetup",err)
                }
           
        }
    })
  return (
    <div></div>
  )
}

export default MyMeetups