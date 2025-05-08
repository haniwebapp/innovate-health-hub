
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getChallengeById } from "@/services/challengeService";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowLeft } from "lucide-react";
import ChallengeDetails from "@/components/challenges/ChallengeDetails";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";

export default function ChallengeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: challenge, isLoading, error } = useQuery({
    queryKey: ["challenge", id],
    queryFn: () => getChallengeById(id as string),
    enabled: !!id,
  });

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Challenge not found</h2>
            <p className="mb-6 text-muted-foreground">The challenge you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/challenges")}>
              View All Challenges
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/challenges">Challenges</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{challenge?.title || "Challenge Details"}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Button 
            variant="ghost" 
            onClick={() => navigate("/challenges")} 
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Challenges
          </Button>

          {challenge ? (
            <ChallengeDetails challenge={challenge} isLoading={isLoading} />
          ) : isLoading ? (
            <ChallengeDetails 
              challenge={{
                id: "",
                title: "",
                description: "",
                long_description: "",
                deadline: "",
                submission_deadline: "",
                category: "",
                participants: 0,
                prize: "",
                image_url: "",
                organizer: "",
                status: "",
                eligibility: "",
                requirements: [],
                timeline: []
              }} 
              isLoading={true} 
            />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold">Challenge not found</h2>
              <p className="text-muted-foreground">
                The challenge you're looking for doesn't exist or has been removed.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
