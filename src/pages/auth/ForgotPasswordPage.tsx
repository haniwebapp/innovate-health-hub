
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your email to receive a password reset link
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" />
        </div>
        <Button type="submit" className="w-full">Send Reset Link</Button>
      </div>
      
      <div className="text-center text-sm">
        Remember your password?{" "}
        <Link to="/auth/login" className="text-blue-600 hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  );
}
