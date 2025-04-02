'use client'
import { createMeetUp } from "@/app/actions/meet.actions";
import { useActionState, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
function MeetUpForm() {
  const router=useRouter()
  const [date, setDate] = useState(null);
const {userId}= useContext(AuthContext)
const [state, formAction] = useActionState(
  (prevState, formData) => createMeetUp(userId, formData), 
  { message: null, error: null }
);
useEffect(()=>{
  if(state.message==='MeetUp Saved Successfully'){
    router.push('/')
  }
})
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
    <div className="w-full max-w-md bg-black border border-gray-800 rounded-lg shadow-lg p-6 text-white">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">Create New Meetup</h1>
      
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="reason" className="block text-sm font-medium text-white">
            Reason
          </label>
          <textarea 
            id="reason" 
            name="reason" 
            rows="3"
            className="w-full rounded-md bg-black border border-gray-700 text-white px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Why do you want to meet?"
            required
          ></textarea>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-white">
            Location
          </label>
          <input 
            id="location" 
            name="location" 
            type="text"
            className="w-full rounded-md bg-black border border-gray-700 text-white px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Where is the meetup?"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-black border-gray-700 hover:bg-gray-900",
                  !date && "text-gray-400"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-black border border-gray-700">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="bg-black text-white"
              />
            </PopoverContent>
          </Popover>
          {/* Hidden input to store date for form submission */}
          <input 
            type="hidden" 
            name="date" 
            value={date ? date.toISOString() : ''} 
          />
        </div>
        
        <Button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300 mt-6"
          disabled={!date}
        >
          Create Meetup
        </Button>
        
        {state.message && (
          <p className="text-green-400 text-sm mt-4">{state.message}</p>
        )}
        {state.error && (
          <p className="text-red-400 text-sm mt-4">{state.error}</p>
        )}
      </form>
    </div>
  </div>
  );
}

export default MeetUpForm;
