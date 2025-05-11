
import { Skeleton } from "@/components/ui/skeleton";

export default function ChallengeSkeleton() {
  return (
    <div className="h-full animate-pulse">
      <div className="h-40 bg-gray-200 rounded-t-lg"></div>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-7 w-full mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex justify-between mb-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
