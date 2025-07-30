import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Database } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Category Management</h1>
        <p className="text-muted-foreground mt-2">
          Centralized management for all platform categories
        </p>
      </div>

      <Alert>
        <Database className="h-4 w-4" />
        <AlertDescription>
          <strong>Setup Required:</strong> Please run the category management migration first.
          <br />
          <br />
          1. Go to your <a href="https://supabase.com/dashboard/project/ntgrokpnwizohtfkcfec/sql/new" target="_blank" rel="noopener noreferrer" className="text-primary underline">Supabase SQL Editor</a>
          <br />
          2. Copy and run the SQL from the <code>category-management-migration.sql</code> file in your project root
          <br />
          3. Refresh this page after running the migration
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Category Management Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Centralized Categories</h3>
                <p className="text-sm text-muted-foreground">
                  Manage all platform categories from one place with hierarchical support
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Flexible Mappings</h3>
                <p className="text-sm text-muted-foreground">
                  Link categories to any entity type (challenges, events, innovations, etc.)
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Backward Compatibility</h3>
                <p className="text-sm text-muted-foreground">
                  Existing functionality remains unaffected during transition
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Visual Management</h3>
                <p className="text-sm text-muted-foreground">
                  Color coding, icons, and sorting for better organization
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Migration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Database tables: Pending migration</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Admin interface: Ready (after migration)</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">API integration: Ready (after migration)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}