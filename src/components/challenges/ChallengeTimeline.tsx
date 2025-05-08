
import { Challenge } from "@/types/challenges";
import { Calendar } from "lucide-react";

interface ChallengeTimelineProps {
  timeline: Challenge['timeline'];
}

export default function ChallengeTimeline({ timeline }: ChallengeTimelineProps) {
  return (
    <div className="relative pl-8 border-l border-gray-200 space-y-8">
      {timeline.map((event, index) => (
        <div key={index} className="relative">
          <div className="absolute -left-11 mt-1.5 h-6 w-6 rounded-full border-4 border-white bg-moh-green flex items-center justify-center">
            <Calendar className="h-3 w-3 text-white" />
          </div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-500">
            {event.date}
          </time>
          <h3 className="text-lg font-semibold text-gray-900">
            {event.event}
          </h3>
          {index === timeline.length - 1 ? (
            <p className="text-sm text-gray-600">Final winners will be announced and prizes awarded.</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
