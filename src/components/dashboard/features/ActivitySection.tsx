
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ActivitySection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
          <CardDescription>Track your platform engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">View your complete activity timeline including submissions, interactions, and platform usage.</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link to="/dashboard/activity">View Activity</Link>
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>My Submissions</CardTitle>
          <CardDescription>Manage your submitted innovations and applications</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Track the status of your submissions, view feedback, and manage your innovation portfolio.</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link to="/dashboard/submissions">View Submissions</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
