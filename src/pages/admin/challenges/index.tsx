
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Edit, PlusCircle, Trash2, Users } from 'lucide-react';
import { fetchChallenges, deleteChallenge } from '@/services/challengeService';
import { useToast } from '@/hooks/use-toast';
import { Challenge } from '@/types/challenges';
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from '@/contexts/AuthContext';

export default function AdminChallengeManagementPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [challengeToDelete, setChallengeToDelete] = useState<Challenge | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchChallengesData();
  }, []);

  const fetchChallengesData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchChallenges();
      setChallenges(data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      toast({
        variant: "destructive",
        title: "Failed to load challenges",
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateChallenge = () => {
    navigate('/dashboard/create-challenge');
  };

  const handleEditChallenge = (id: string) => {
    navigate(`/dashboard/challenges/edit/${id}`);
  };

  const confirmDeleteChallenge = (challenge: Challenge) => {
    setChallengeToDelete(challenge);
    setDeleteDialogOpen(true);
  };

  const handleDeleteChallenge = async () => {
    if (!challengeToDelete) return;
    
    try {
      await deleteChallenge(challengeToDelete.id);
      setChallenges(challenges.filter(c => c.id !== challengeToDelete.id));
      toast({
        title: "Challenge deleted",
        description: "The challenge has been successfully deleted",
      });
    } catch (error) {
      console.error('Error deleting challenge:', error);
      toast({
        variant: "destructive",
        title: "Failed to delete challenge",
        description: "Please try again later",
      });
    } finally {
      setDeleteDialogOpen(false);
      setChallengeToDelete(null);
    }
  };

  const handleViewSubmissions = (id: string) => {
    navigate(`/dashboard/challenges/${id}/submissions`);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">{status}</Badge>;
      case 'draft':
        return <Badge variant="outline">{status}</Badge>;
      case 'closed':
        return <Badge variant="outline" className="bg-gray-200 text-gray-700">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTimeRemaining = (endDate: string) => {
    try {
      const end = parseISO(endDate);
      return formatDistanceToNow(end, { addSuffix: true });
    } catch (e) {
      return 'Date unavailable';
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

  return (
    <AdminLayout
      title="Challenge Management"
      description="Create and manage innovation challenges"
      actions={
        <Button onClick={handleCreateChallenge}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Challenge
        </Button>
      }
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-moh-green"></div>
        </div>
      ) : (
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>

          {['all', 'active', 'draft', 'closed'].map(tabValue => (
            <TabsContent key={tabValue} value={tabValue} className="space-y-4">
              {challenges
                .filter(challenge => tabValue === 'all' || challenge.status === tabValue)
                .map(challenge => (
                  <Card key={challenge.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{challenge.title}</CardTitle>
                          <CardDescription>Category: {challenge.category}</CardDescription>
                        </div>
                        {getStatusBadge(challenge.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>
                            {challenge.status === 'closed' 
                              ? `Closed on: ${formatDate(challenge.end_date)}`
                              : `Deadline: ${formatDate(challenge.end_date)} (${getTimeRemaining(challenge.end_date)})`
                            }
                          </span>
                        </div>
                        <div className="flex items-center">
                          {challenge.status !== 'draft' && (
                            <>
                              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>Created: {formatDate(challenge.created_at)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditChallenge(challenge.id)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      
                      {challenge.status === 'draft' && (
                        <Button variant="destructive" size="sm" onClick={() => confirmDeleteChallenge(challenge)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      )}
                      
                      {challenge.status !== 'draft' && (
                        <Button size="sm" onClick={() => handleViewSubmissions(challenge.id)}>
                          View Submissions
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}

              {challenges.filter(challenge => tabValue === 'all' || challenge.status === tabValue).length === 0 && (
                <div className="text-center p-10 border rounded-lg">
                  <p className="text-muted-foreground mb-4">No challenges found</p>
                  <Button onClick={handleCreateChallenge}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Challenge
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the challenge "{challengeToDelete?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteChallenge} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
