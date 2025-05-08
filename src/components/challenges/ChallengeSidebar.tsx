
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Challenge } from "@/types/challenges";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Clock, Users, Trophy, Share2, Copy, Facebook, Twitter, Linkedin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

interface ChallengeSidebarProps {
  challenge: Challenge;
}

export default function ChallengeSidebar({ challenge }: ChallengeSidebarProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Calculate days remaining until deadline
  const getDaysRemaining = (deadlineDate: string) => {
    const deadline = new Date(deadlineDate);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Function to handle apply button click
  const handleApply = () => {
    if (!user) {
      // Redirect to login
      navigate(`/auth/login?redirect=/challenges/${challenge.id}`);
      return;
    }
    
    // Navigate to submission form
    navigate(`/dashboard/submit/${challenge.id}`);
  };

  // Function to copy link to clipboard
  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Challenge link copied to clipboard",
      duration: 3000,
    });
  };

  // Function to share to social media
  const shareToSocial = (platform: string) => {
    const url = window.location.href;
    const title = challenge.title;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="lg:w-80">
      <div className="bg-white shadow-md rounded-lg border border-gray-100 p-6 sticky top-20">
        <div className="mb-6">
          <span className="inline-flex gap-2 items-center text-sm text-gray-500 mb-2">
            <Clock className="h-4 w-4" />
            Submission Deadline
          </span>
          <p className="font-medium">{challenge.deadline}</p>
        </div>
        
        <div className="bg-moh-lightGreen/50 p-4 rounded-md mb-6">
          <div className="text-center">
            <span className="text-sm text-gray-600">Days Remaining</span>
            <p className="text-2xl font-bold text-moh-green">
              {getDaysRemaining(challenge.submission_deadline)}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between mb-6">
          <div>
            <span className="inline-flex gap-1 items-center text-sm text-gray-500 mb-1">
              <Trophy className="h-4 w-4" />
              Prize
            </span>
            <p className="font-medium">{challenge.prize}</p>
          </div>
          <div>
            <span className="inline-flex gap-1 items-center text-sm text-gray-500 mb-1">
              <Users className="h-4 w-4" />
              Participants
            </span>
            <p className="font-medium">{challenge.participants}</p>
          </div>
        </div>
        
        <Button 
          onClick={handleApply}
          className="w-full bg-moh-green hover:bg-moh-darkGreen text-white mb-4"
        >
          Apply to Challenge
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Challenge
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white" align="end">
            <DropdownMenuItem onClick={copyToClipboard}>
              <Copy className="mr-2 h-4 w-4" />
              <span>Copy link</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareToSocial('facebook')}>
              <Facebook className="mr-2 h-4 w-4" />
              <span>Facebook</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareToSocial('twitter')}>
              <Twitter className="mr-2 h-4 w-4" />
              <span>Twitter</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareToSocial('linkedin')}>
              <Linkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
