'use client'
import { useContext, useState } from "react";
import { deleteMeetup } from "../actions/meet.actions";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export function MeetupItem({ meetup, onDelete }) {
  const { userId } = useContext(AuthContext);
  const router=useRouter()
  const handleDelete = async(id) => {
    try {
      if (!meetup.user || !meetup.user._id) {
        alert("Error: Meetup user data is missing.");
        return;
      }
      if (meetup.user._id.toString() !== userId) {
        alert('You are not authorized to delete this meetup.');
        return;
      }
      const result=await deleteMeetup(id, userId);
      if(result){
        router.push('/')
      }
    } catch(err) {
      console.log(err);
    }
  }
 
  return (
    <div className="mt-8 bg-black border border-gray-800 rounded-lg shadow-lg p-6 relative text-white mb-4 hover:bg-gray-900 transition-colors duration-200">
      {/* Title and email */}
      <h1 className="text-2xl font-bold mb-2">{meetup.name}</h1>
      <p className="text-gray-400 text-sm mb-4">{meetup.email}</p>
      
      {/* Reason with bold label */}
      <div className="mb-3">
        <span className="font-bold text-blue-400">Reason: </span>
        <span>{meetup.reason}</span>
      </div>
      <div className="mb-3">
        <span className="font-bold text-blue-400">Location: </span>
        <span>{meetup.location}</span>
      </div>
      
      {/* Date with bold label */}
      <div className="mb-6">
        <span className="font-bold text-green-400">Date: </span>
        <span>{new Date(meetup.date).toDateString()}</span>
      </div>
      
      {/* Delete button - positioned at bottom right */}
      {onDelete && meetup.user._id === userId && (
        <div className="absolute bottom-4 right-4">
          <button 
            onClick={() => handleDelete(meetup._id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}