
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Overview() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Innovation Status</CardTitle>
            <CardDescription>Your current innovations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Active innovations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Applications</CardTitle>
            <CardDescription>Your sandbox applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Opportunities</CardTitle>
            <CardDescription>Investment opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">Matches found</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="text-sm font-medium">Application submitted</p>
                <p className="text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-medium">Profile updated</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
              <div>
                <p className="text-sm font-medium">New innovation created</p>
                <p className="text-xs text-muted-foreground">1 week ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Important dates to remember</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="text-sm font-medium">Compliance documentation due</p>
                <p className="text-xs text-muted-foreground">In 3 days</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-medium">Sandbox testing phase begins</p>
                <p className="text-xs text-muted-foreground">Next week</p>
              </div>
              <div>
                <p className="text-sm font-medium">Investment pitch deadline</p>
                <p className="text-xs text-muted-foreground">In 2 weeks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
