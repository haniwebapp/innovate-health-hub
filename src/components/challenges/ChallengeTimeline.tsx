
import React from 'react';
import { Challenge } from '@/types/challenges';

interface ChallengeTimelineProps {
  challenge: Challenge;
}

const ChallengeTimeline: React.FC<ChallengeTimelineProps> = ({ challenge }) => {
  // Generate timeline from challenge data
  const generateTimeline = (challenge: Challenge) => {
    const timeline = [
      {
        date: new Date(challenge.start_date).toLocaleDateString(),
        event: "Challenge Launch"
      },
      {
        date: new Date(challenge.end_date).toLocaleDateString(),
        event: "Submission Deadline"
      }
    ];
    
    // If the challenge has a custom timeline, use it
    if (challenge.timeline && Array.isArray(challenge.timeline)) {
      return challenge.timeline;
    }
    
    return timeline;
  };

  const timeline = generateTimeline(challenge);

  return (
    <div className="space-y-4">
      {timeline.map((item, index) => (
        <div key={index} className="flex items-start">
          <div className="flex-shrink-0 h-4 w-4 mt-1 rounded-full bg-moh-green"></div>
          <div className="ml-4">
            <p className="font-medium">{item.event}</p>
            <p className="text-sm text-muted-foreground">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengeTimeline;
