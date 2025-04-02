'use client';
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

function Navigations() {
  const { token, logout, userId } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push('/');
  }

  // Function to check if a link is active
  const isActive = (href) => pathname === href;

  return (
    <div className="flex flex-col sm:flex-row justify-between bg-black border-b border-gray-100/50">
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
              <Button className={`w-full sm:w-auto ${isActive('/signup') ? 'bg-white' : 'text-white'} hover:bg-white hover:text-black`}>
                <Link href="/signup" className="w-full block">Signup</Link>
              </Button>
              <Button className={`w-full sm:w-auto ${isActive('/login') ? 'bg-white' : 'text-white'} hover:bg-white hover:text-black`}>
                <Link href="/login" className="w-full block">Login</Link>
              </Button>
            </>
          )}

          <Button className={`w-full sm:w-auto ${isActive('/') ? 'bg-white' : 'text-white'} hover:bg-white hover:text-black`}>
            <Link href="/" className="w-full block">meetups</Link>
          </Button>

          {token && (
            <>
              <Button className={`w-full sm:w-auto ${isActive(`/${userId}/myMeetups`) ? 'bg-white' : 'text-white'} hover:bg-white hover:text-black`}>
                <Link href={`/${userId}/myMeetups`} className="w-full block">My Meetups</Link>
              </Button>
              <Button className={`w-full sm:w-auto ${isActive(`/${userId}/newMeetup`) ? 'bg-white' : 'text-white'} hover:bg-white hover:text-black`}>
                <Link href={`/${userId}/newMeetup`} className="w-full block">newMeetup</Link>
              </Button>
              <Button className={`w-full sm:w-auto ${isActive('/logout') ? 'bg-white' : 'text-white'} hover:bg-white hover:text-black`} onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navigations;