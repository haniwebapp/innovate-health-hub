
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Star, Calendar, Info } from "lucide-react";

// Mock data for mentors
const mockMentors = [
  {
    id: "1",
    name: "Dr. Ahmed Al-Farhan",
    role: "Healthcare Innovation Lead",
    organization: "King Faisal Specialist Hospital",
    specialties: ["Digital Health", "Medical Devices", "Innovation Strategy"],
    availability: "2-3 hours/week",
    experience: "15+ years in healthcare innovation",
    bio: "Dr. Ahmed leads digital transformation initiatives at KFSH and has mentored over 20 successful healthcare startups.",
    imageUrl: "https://source.unsplash.com/random/300x300/?portrait,man,professional",
    rating: 4.9,
    totalMentees: 24
  },
  {
    id: "2",
    name: "Dr. Norah Al-Qahtani",
    role: "Regulatory Affairs Director",
    organization: "Saudi FDA",
    specialties: ["Regulatory Strategy", "Compliance", "Risk Management"],
    availability: "1-2 hours/week",
    experience: "12 years in healthcare regulation",
    bio: "Dr. Norah specializes in helping innovators navigate the regulatory landscape for medical products and digital health.",
    imageUrl: "https://source.unsplash.com/random/300x300/?portrait,woman,professional",
    rating: 4.8,
    totalMentees: 18
  },
  {
    id: "3",
    name: "Eng. Khalid Al-Otaibi",
    role: "Healthcare Investor",
    organization: "Vision Ventures",
    specialties: ["Investment", "Business Strategy", "Commercialization"],
    availability: "Flexible",
    experience: "10 years in healthcare investment",
    bio: "Khalid has invested in 15+ healthcare startups and provides mentorship on business strategy and funding.",
    imageUrl: "https://source.unsplash.com/random/300x300/?portrait,man,business",
    rating: 4.7,
    totalMentees: 12
  }
];

export function MentorshipSection() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [requestTopic, setRequestTopic] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRequestSubmit = () => {
    if (!requestTopic || !requestMessage) {
      toast({
        title: "Missing information",
        description: "Please provide both a topic and message for your request.",
        variant: "destructive"
      });
      return;
    }

    // Submit mentorship request - would call API in real implementation
    toast({
      title: "Request Sent",
      description: `Your mentorship request has been sent to ${selectedMentor.name}.`,
    });

    setRequestMessage('');
    setRequestTopic('');
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">{t('learning.findMentor')}</h2>
          <p className="text-sm text-muted-foreground">{t('learning.mentorshipDescription')}</p>
        </div>
        <Button variant="outline">
          {t('learning.becomeMentor')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMentors.map((mentor) => (
          <Card key={mentor.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={mentor.imageUrl} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{mentor.name}</CardTitle>
                  <CardDescription className="line-clamp-1">{mentor.role}</CardDescription>
                  <CardDescription className="line-clamp-1">{mentor.organization}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-wrap gap-1 mb-2">
                {mentor.specialties.map((specialty, i) => (
                  <Badge key={i} variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">
                    {specialty}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{mentor.rating} • {mentor.totalMentees} mentees</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>{mentor.availability}</span>
              </div>
              <p className="text-sm line-clamp-2 mt-2">{mentor.bio}</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => {
                  setSelectedMentor(mentor);
                  setDialogOpen(true);
                }}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                {t('learning.requestMentorship')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('learning.requestMentorshipFrom', { name: selectedMentor?.name || '' })}</DialogTitle>
            <DialogDescription>
              {t('learning.mentorshipRequestDescription')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMentor && (
            <div className="flex items-center gap-3 p-3 bg-muted rounded-md mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={selectedMentor.imageUrl} alt={selectedMentor.name} />
                <AvatarFallback>{selectedMentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{selectedMentor.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedMentor.role} • {selectedMentor.organization}</p>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('learning.mentorshipTopic')}</label>
              <Input 
                placeholder={t('learning.mentorshipTopicPlaceholder')}
                value={requestTopic}
                onChange={(e) => setRequestTopic(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('learning.mentorshipMessage')}</label>
              <Textarea 
                placeholder={t('learning.mentorshipMessagePlaceholder')}
                rows={4}
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                <Info className="h-3 w-3 inline mr-1" />
                {t('learning.mentorshipMessageTip')}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleRequestSubmit}>
              {t('learning.sendRequest')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
