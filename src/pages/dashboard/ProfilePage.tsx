
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserProfileForm from "@/components/auth/UserProfileForm";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and profile information.
        </p>
      </div>
      
      <div className="grid gap-6">
        <UserProfileForm />
        
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences and security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Email Notifications</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We'll notify you about important updates related to your activities on the platform.
              </p>
              <p className="text-sm">
                To change your notification settings, please contact support.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Password</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Make sure to use a strong, unique password to secure your account.
              </p>
              <p className="text-sm">
                Password changes are handled through the Supabase authentication system.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
