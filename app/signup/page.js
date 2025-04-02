"use client";
import { useEffect, useState } from "react";
import { signup } from "../actions/auth.actions";
import { useFormState } from "react-dom";
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

export default function SignupForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(signup, { message: null, error: null });
  
  useEffect(() => {
    if (state.message === "User Saved Successfully")
      router.push('/login');
  }, [state.message, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-[350px] sm:w-[400px] md:w-[450px] text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-gray-100/50 px-6 py-1">
              Sign Up
            </Button>
            {state.message && <p className="text-sm text-green-500">{state.message}</p>}
            {state.error && <p className="text-sm text-red-500">{state.error}</p>}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <a href="/login" className="underline hover:text-primary">
              <Button className='bg-gray-100/50 px-6 py-1'>Login</Button>
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}