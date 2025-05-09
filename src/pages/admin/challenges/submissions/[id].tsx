
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Clipboard, Star, X } from "lucide-react";
import { fetchChallengeById, fetchSubmissionsForChallenge, updateSubmissionStatus } from "@/services/challengeService";
import { Submission } from "@/types/challenges";
import { format, parseISO } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function ChallengeSubmissionsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState("");
  const [status, setStatus] = useState("under review");
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Fetch challenge details
  const { data: challenge, isLoading: challengeLoading } = useQuery({
    queryKey: ['challenge', id],
    queryFn: () => fetchChallengeById(id!),
    enabled: !!id && isAdmin,
  });
  
  // Fetch submissions for this challenge
  const { 
    data: submissions, 
    isLoading: submissionsLoading,
    refetch: refetchSubmissions,
  } = useQuery({
    queryKey: ['challenge-submissions', id],
    queryFn: () => fetchSubmissionsForChallenge(id!),
    enabled: !!id && isAdmin,
  });

  const handleViewSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setFeedback(submission.feedback || '');
    setScore(submission.score?.toString() || '');
    setStatus(submission.status);
    setDialogOpen(true);
  };

  const handleUpdateSubmission = async () => {
    if (!selectedSubmission) return;
    
    setIsUpdating(true);
    try {
      await updateSubmissionStatus(
        selectedSubmission.id,
        status,
        feedback,
        score ? parseFloat(score) : undefined
      );
      
      toast({
        title: "Submission updated",
        description: "The submission status has been updated successfully."
      });
      
      refetchSubmissions();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error updating submission:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "There was an error updating the submission status."
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">{status}</Badge>;
      case 'under review':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">{status}</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">{status}</Badge>;
      case 'shortlisted':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">{status}</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy • HH:mm');
    } catch (e) {
      return 'Invalid date';
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold text-red-700">Access Denied</h2>
        <p className="text-red-600">You don't have permission to view this page.</p>
      </div>
    );
  }

  if (challengeLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold">Challenge not found</h2>
        <p className="text-muted-foreground mb-4">The challenge you're looking for doesn't exist or you don't have permission to view it.</p>
        <Button onClick={() => navigate("/admin/challenges")}>Back to Challenges</Button>
      </div>
    );
  }

  return (
    <AdminLayout
      title={`Submissions: ${challenge.title}`}
      description={`Review and manage submissions for this challenge`}
      actions={
        <Button variant="outline" onClick={() => navigate("/admin/challenges")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Challenges
        </Button>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Challenge Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground mb-1">Category</dt>
                <dd>{challenge.category}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground mb-1">Status</dt>
                <dd>{getStatusBadge(challenge.status)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground mb-1">Start Date</dt>
                <dd>{formatDate(challenge.start_date)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground mb-1">End Date</dt>
                <dd>{formatDate(challenge.end_date)}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-muted-foreground mb-1">Description</dt>
                <dd>{challenge.description}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submissions ({submissions?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {submissionsLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-moh-green"></div>
              </div>
            ) : submissions && submissions.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Submitter</TableHead>
                      <TableHead>Date Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.title}</TableCell>
                        <TableCell>
                          {submission.profiles ? 
                            `${submission.profiles.first_name || ''} ${submission.profiles.last_name || ''}`
                            : 'Unknown user'}
                        </TableCell>
                        <TableCell>{formatDate(submission.submitted_at)}</TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewSubmission(submission)}
                          >
                            <Clipboard className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No submissions have been received for this challenge.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Review Submission</DialogTitle>
            <DialogDescription>
              Review and update the status of this submission.
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-4 my-2">
              <div>
                <h3 className="font-semibold text-lg">{selectedSubmission.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Submitted by {selectedSubmission.profiles ? 
                    `${selectedSubmission.profiles.first_name || ''} ${selectedSubmission.profiles.last_name || ''}`
                    : 'Unknown user'} on {formatDate(selectedSubmission.submitted_at)}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Summary</h4>
                <p className="text-sm border rounded-md p-3 bg-muted/30">{selectedSubmission.summary}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Description</h4>
                <p className="text-sm border rounded-md p-3 bg-muted/30 max-h-40 overflow-y-auto">
                  {selectedSubmission.description}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select 
                  id="status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="submitted">Submitted</option>
                  <option value="under review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="score">Score (0-100)</Label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="Enter score (optional)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide feedback to the submitter"
                  className="min-h-32"
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="flex space-x-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateSubmission} 
              disabled={isUpdating}
              className="bg-moh-green hover:bg-moh-darkGreen"
            >
              {isUpdating ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></span>
                  Updating...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
