
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Edit, Eye, Trash2, Plus, Search } from 'lucide-react';
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  author: string;
  featured: boolean;
  createdAt: string;
  publishedAt?: string;
  updatedAt: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Healthcare Innovation',
    slug: 'future-healthcare-innovation',
    excerpt: 'Exploring emerging trends in healthcare technology and innovation.',
    content: '# The Future of Healthcare Innovation\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    status: 'published',
    category: 'Innovation',
    author: 'Dr. Sarah Ahmed',
    featured: true,
    createdAt: '2025-05-01T10:30:00Z',
    publishedAt: '2025-05-02T14:00:00Z',
    updatedAt: '2025-05-02T14:00:00Z',
  },
  {
    id: '2',
    title: 'Regulatory Challenges in Medical Device Development',
    slug: 'regulatory-challenges-medical-device',
    excerpt: 'Understanding the compliance landscape for new medical devices.',
    content: '# Regulatory Challenges in Medical Device Development\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    status: 'published',
    category: 'Regulatory',
    author: 'Ahmed Al-Mansour',
    featured: false,
    createdAt: '2025-04-28T09:15:00Z',
    publishedAt: '2025-04-29T11:00:00Z',
    updatedAt: '2025-04-29T11:00:00Z',
  },
  {
    id: '3',
    title: 'Investment Strategies for Healthcare Startups',
    slug: 'investment-strategies-healthcare-startups',
    excerpt: 'Financial planning and funding sources for healthcare entrepreneurs.',
    content: '# Investment Strategies for Healthcare Startups\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    status: 'draft',
    category: 'Investment',
    author: 'Fatima Al-Otaibi',
    featured: false,
    createdAt: '2025-05-05T13:45:00Z',
    updatedAt: '2025-05-05T13:45:00Z',
  },
  {
    id: '4',
    title: 'Artificial Intelligence in Clinical Diagnosis',
    slug: 'ai-clinical-diagnosis',
    excerpt: 'How AI is transforming disease detection and patient outcomes.',
    content: '# Artificial Intelligence in Clinical Diagnosis\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    status: 'published',
    category: 'AI',
    author: 'Dr. Mohammed Al-Zahrani',
    featured: true,
    createdAt: '2025-04-20T08:30:00Z',
    publishedAt: '2025-04-22T10:00:00Z',
    updatedAt: '2025-04-25T15:20:00Z',
  },
];

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editForm, setEditForm] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'draft',
    featured: false
  });

  // Filter posts based on active tab and search query
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (activeTab) {
      case 'all': return matchesSearch;
      case 'published': return post.status === 'published' && matchesSearch;
      case 'draft': return post.status === 'draft' && matchesSearch;
      case 'archived': return post.status === 'archived' && matchesSearch;
      case 'featured': return post.featured && matchesSearch;
      default: return matchesSearch;
    }
  });

  const handleAddPost = () => {
    setSelectedPost(null);
    setEditForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Innovation',
      status: 'draft',
      featured: false
    });
    setIsEditDialogOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setEditForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      status: post.status,
      featured: post.featured
    });
    setIsEditDialogOpen(true);
  };

  const handleDeletePost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsDeleteDialogOpen(true);
  };

  const handlePreviewPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsPreviewDialogOpen(true);
  };

  const handleSavePost = () => {
    if (selectedPost) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === selectedPost.id 
          ? {
              ...post,
              ...editForm,
              updatedAt: new Date().toISOString(),
              publishedAt: editForm.status === 'published' && !post.publishedAt 
                ? new Date().toISOString() 
                : post.publishedAt
            } 
          : post
      ));
      toast.success('Blog post updated successfully');
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: Math.random().toString(36).substring(2, 9),
        title: editForm.title || 'Untitled Post',
        slug: editForm.slug || 'untitled-post',
        excerpt: editForm.excerpt || '',
        content: editForm.content || '',
        status: editForm.status as 'draft' | 'published' | 'archived' || 'draft',
        category: editForm.category || 'Uncategorized',
        author: 'Admin User', // In a real app, this would be the current user
        featured: editForm.featured || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: editForm.status === 'published' ? new Date().toISOString() : undefined
      };
      setPosts([newPost, ...posts]);
      toast.success('Blog post created successfully');
    }
    setIsEditDialogOpen(false);
  };

  const confirmDelete = () => {
    if (selectedPost) {
      setPosts(posts.filter(post => post.id !== selectedPost.id));
      setIsDeleteDialogOpen(false);
      toast.success('Blog post deleted successfully');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not yet';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default" className="bg-green-500">Published</Badge>;
      case 'draft':
        return <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline" className="text-slate-500 border-slate-200 bg-slate-50">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>Manage blog content and articles</CardDescription>
          </div>
          <Button onClick={handleAddPost}>
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="published">Published</TabsTrigger>
                  <TabsTrigger value="draft">Drafts</TabsTrigger>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-full md:w-[250px]"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div className="font-medium">{post.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                            {post.excerpt}
                          </div>
                        </TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>{getStatusBadge(post.status)}</TableCell>
                        <TableCell>{formatDate(post.createdAt)}</TableCell>
                        <TableCell>{formatDate(post.publishedAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePreviewPost(post)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditPost(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePost(post)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <FileText className="h-12 w-12 mb-2" />
                          <h3 className="text-lg font-medium">No posts found</h3>
                          <p className="text-sm mt-1">
                            {searchQuery 
                              ? "Try adjusting your search query" 
                              : "Get started by creating a new post"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit/Create Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              {selectedPost ? `Edit Post: ${selectedPost.title}` : 'Create New Post'}
            </DialogTitle>
            <DialogDescription>
              {selectedPost 
                ? "Make changes to the post and save when done." 
                : "Fill in the details to create a new blog post."}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO & Excerpt</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editForm.title || ''}
                    onChange={(e) => {
                      setEditForm({ 
                        ...editForm, 
                        title: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                      });
                    }}
                    placeholder="Enter post title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={editForm.content || ''}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                    placeholder="Enter post content"
                    className="min-h-[300px] font-mono"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="seo" className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={editForm.slug || ''}
                    onChange={(e) => setEditForm({ ...editForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                    placeholder="enter-url-slug"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={editForm.excerpt || ''}
                    onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                    placeholder="Enter a brief excerpt for the post"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    This will be displayed on blog listing pages and in search results.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={editForm.category || 'Innovation'} 
                    onValueChange={(value) => setEditForm({ ...editForm, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Innovation">Innovation</SelectItem>
                      <SelectItem value="Regulatory">Regulatory</SelectItem>
                      <SelectItem value="Investment">Investment</SelectItem>
                      <SelectItem value="AI">AI</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={editForm.status || 'draft'} 
                    onValueChange={(value: any) => setEditForm({ ...editForm, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={editForm.featured || false}
                    onCheckedChange={(checked) => setEditForm({ ...editForm, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured Post</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePost}>
              {selectedPost ? 'Update Post' : 'Create Post'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the post "{selectedPost?.title}"? This action cannot be undone.
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
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Post Preview</DialogTitle>
          </DialogHeader>
          
          {selectedPost && (
            <div className="prose prose-slate max-w-none">
              <h1 className="text-3xl font-bold">{selectedPost.title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground my-4">
                <span>By {selectedPost.author}</span>
                <span>•</span>
                <span>{formatDate(selectedPost.publishedAt || selectedPost.createdAt)}</span>
                <span>•</span>
                <span>{selectedPost.category}</span>
              </div>
              <p className="text-lg italic border-l-4 border-gray-200 pl-4 my-4">
                {selectedPost.excerpt}
              </p>
              <div className="mt-6">
                {/* In a real app, we'd use a markdown parser here */}
                <p>{selectedPost.content.replace(/^#.+$/m, '')}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsPreviewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
