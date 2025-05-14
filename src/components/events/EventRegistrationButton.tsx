
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { EventService } from "@/services/events/EventService";

interface EventRegistrationButtonProps {
  eventId: string;
  onRegistered?: () => void;
}

export function EventRegistrationButton({ eventId, onRegistered }: EventRegistrationButtonProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    checkRegistrationStatus();
  }, [eventId, user]);

  const checkRegistrationStatus = async () => {
    if (!user || !eventId) {
      setIsCheckingStatus(false);
      return;
    }
    
    setIsCheckingStatus(true);
    try {
      // Ensure eventId is a valid UUID format to prevent database errors
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(eventId)) {
        console.log(`EventID ${eventId} is not a valid UUID, using mock status check`);
        // For non-UUID IDs, we'll use a mock check that doesn't call the database
        setIsRegistered(false);
        setIsCheckingStatus(false);
        return;
      }

      const registered = await EventService.isUserRegisteredForEvent(eventId);
      setIsRegistered(registered);
    } catch (error) {
      console.error("Error checking registration status:", error);
      // If there's an error, assume not registered to allow registration attempt
      setIsRegistered(false);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register for this event.",
        variant: "destructive",
      });
      return;
    }

    // Prevent registration attempt if ID is not in UUID format
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(eventId)) {
      toast({
        title: "Registration Error",
        description: "This event is not available for registration at the moment.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsRegistering(true);
      await EventService.registerForEvent(eventId);
      setIsRegistered(true);
      
      toast({
        title: "Registration Successful",
        description: "You have been registered for this event.",
        variant: "default",
      });
      
      if (onRegistered) {
        onRegistered();
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Could not complete registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  if (isCheckingStatus) {
    return (
      <Button variant="outline" disabled>
        Checking...
      </Button>
    );
  }

  if (isRegistered) {
    return (
      <Button variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800" disabled>
        Registered
      </Button>
    );
  }

  return (
    <Button onClick={handleRegister} disabled={isRegistering}>
      {isRegistering ? "Registering..." : "Register"}
    </Button>
  );
}
