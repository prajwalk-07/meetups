"use client";
import { useState, useContext } from "react";
import { login } from "../actions/auth.actions";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const { login: authLogin } = useContext(AuthContext);
  const router = useRouter();
  const [state, setState] = useState({ message: null, error: null });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await login(null, formData);

    if (response.userId && response.token) {
      authLogin(response.userId, response.token);
      router.push("/");
    } else {
      setState({ message: response.message, error: response.error });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-[350px] sm:w-[400px] md:w-[450px] text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-gray-100/50">
              Login
            </Button>
            {state.message && <p className="text-sm text-green-500">{state.message}</p>}
            {state.error && <p className="text-sm text-red-500">{state.error}</p>}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <a href="/signup" className="underline hover:text-primary">
              <Button className='bg-gray-100/50 px-6 py-1 m-2'>Sign up</Button>
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}