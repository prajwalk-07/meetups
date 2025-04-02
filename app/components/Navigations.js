'use client'
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"; // You'll need to install lucide-react

function Navigations() {
  const { token, logout, userId } = useContext(AuthContext);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  function handleLogout() {
    logout()
    router.push('/')
  }
  
  return (
    <div className="flex flex-col sm:flex-row justify-between bg-black border-b border-gray-100/50 ">
      <div className="flex justify-between items-center p-4">
        <Link href='/'><h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl">MeetUps</h1></Link>
        
        {/* Mobile menu button - only visible on small screens */}
        <button 
          className="sm:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Navigation links - responsive layout */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:block`}>
        <ul className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-4 items-center">
          {!token && (
            <>
              <Button className='w-full sm:w-auto bg-white text-black hover:bg-white'>
                <Link href="/signup" className="w-full block">Signup</Link>
              </Button>
              <Button className='w-full sm:w-auto bg-white text-black hover:bg-white'>
                <Link href="/login" className="w-full block">Login</Link>
              </Button>
            </>
          )}
          
          <Button className='w-full sm:w-auto bg-white text-black hover:bg-white'>
            <Link href="/" className="w-full block">meetups</Link>
          </Button>
          
          {token && (
            <>
              <li className="text-white hover:text-gray-300 py-2 sm:py-0 w-full sm:w-auto text-center">
                <Link href={`/${userId}/myMeetups`}>My Meetups</Link>
              </li>
              <li className="text-white hover:text-gray-300 py-2 sm:py-0 w-full sm:w-auto text-center">
                <Link href={`/${userId}/newMeetup`}>newMeetup</Link>
              </li>
              <li className="text-white hover:text-gray-300 py-2 sm:py-0 w-full sm:w-auto text-center">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navigations;