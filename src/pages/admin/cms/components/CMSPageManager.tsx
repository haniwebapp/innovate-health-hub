
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutGrid, FileEdit, Eye, Trash2, Plus } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  description: string;
  isPublished: boolean;
  lastUpdated: string;
}

const mockPages: Page[] = [
  {
    id: '1',
    title: 'Home',
    slug: 'home',
    description: 'Main landing page of the platform',
    isPublished: true,
    lastUpdated: '2025-05-10T10:30:00Z',
  },
  {
    id: '2',
    title: 'About',
    slug: 'about',
    description: 'Information about the platform and mission',
    isPublished: true,
    lastUpdated: '2025-05-09T14:20:00Z',
  },
  {
    id: '3',
    title: 'Challenges',
    slug: 'challenges',
    description: 'Overview of innovation challenges',
    isPublished: true,
    lastUpdated: '2025-05-08T09:15:00Z',
  },
  {
    id: '4',
    title: 'Innovations',
    slug: 'innovations',
    description: 'Showcase of healthcare innovations',
    isPublished: true,
    lastUpdated: '2025-05-07T16:45:00Z',
  },
  {
    id: '5',
    title: 'Investment',
    slug: 'investment',
    description: 'Investment opportunities and resources',
    isPublished: true,
    lastUpdated: '2025-05-06T11:30:00Z',
  },
  {
    id: '6',
    title: 'Regulatory',
    slug: 'regulatory',
    description: 'Regulatory information and sandbox',
    isPublished: true,
    lastUpdated: '2025-05-05T13:20:00Z',
  },
  {
    id: '7',
    title: 'Knowledge Hub',
    slug: 'knowledge-hub',
    description: 'Educational resources and learning paths',
    isPublished: true,
    lastUpdated: '2025-05-04T10:10:00Z',
  },
];

export function CMSPageManager() {
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    slug: '',
    description: '',
    isPublished: false,
  });

  const handleEditPage = (page: Page) => {
    setCurrentPage(page);
    setEditForm({
      title: page.title,
      slug: page.slug,
      description: page.description,
      isPublished: page.isPublished,
    });
    setIsEditDialogOpen(true);
  };

  const handleAddNewPage = () => {
    setCurrentPage(null);
    setEditForm({
      title: '',
      slug: '',
      description: '',
      isPublished: false,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeletePage = (page: Page) => {
    setCurrentPage(page);
    setIsDeleteDialogOpen(true);
  };

  const handlePreviewPage = (page: Page) => {
    setCurrentPage(page);
    setIsPreviewDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentPage) {
      setPages(pages.filter(p => p.id !== currentPage.id));
      setIsDeleteDialogOpen(false);
      setCurrentPage(null);
    }
  };

  const handleSave = () => {
    if (currentPage) {
      // Edit existing page
      setPages(
        pages.map(p =>
          p.id === currentPage.id
            ? { ...p, ...editForm, lastUpdated: new Date().toISOString() }
            : p
        )
      );
    } else {
      // Add new page
      const newPage: Page = {
        id: Math.random().toString(36).substring(2, 9),
        ...editForm,
        lastUpdated: new Date().toISOString(),
      };
      setPages([...pages, newPage]);
    }
    setIsEditDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Pages</CardTitle>
            <CardDescription>Manage website pages and content</CardDescription>
          </div>
          <Button onClick={handleAddNewPage}>
            <Plus className="mr-2 h-4 w-4" /> Add New Page
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>URL Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell className="font-mono text-sm">{page.slug}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{page.description}</TableCell>
                  <TableCell>
                    {page.isPublished ? (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-50 text-gray-700 border-gray-200">
                        Draft
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(page.lastUpdated)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePreviewPage(page)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditPage(page)}
                      >
                        <FileEdit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeletePage(page)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit/Create Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>
              {currentPage ? `Edit Page: ${currentPage.title}` : 'Create New Page'}
            </DialogTitle>
            <DialogDescription>
              Make changes to the page content here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Enter page title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={editForm.slug}
                    onChange={(e) => setEditForm({ ...editForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    placeholder="enter-url-slug"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Enter page description"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="content" className="py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Page Content</Label>
                  <div className="border rounded-md p-4 bg-gray-50 h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <LayoutGrid className="mx-auto h-8 w-8 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium">Page Builder</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Visual page builder will be implemented in the next phase
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={editForm.isPublished}
                  onCheckedChange={(checked) => setEditForm({ ...editForm, isPublished: checked })}
                />
                <Label htmlFor="published">Published</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                When published, the page will be visible to visitors
              </p>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the page "{currentPage?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[800px] sm:h-[600px]">
          <DialogHeader>
            <DialogTitle>Page Preview: {currentPage?.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[500px] rounded border p-4">
            <div className="preview-container">
              <h1 className="text-3xl font-bold mb-4">{currentPage?.title}</h1>
              <p className="text-gray-500 mb-6">{currentPage?.description}</p>
              <div className="p-8 bg-gray-50 rounded-lg border flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-400">Preview content would be displayed here</p>
                  <p className="text-sm text-gray-400 mt-2">URL: /{currentPage?.slug}</p>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setIsPreviewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
