
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Upload, MoreHorizontal, Image, FileText, Download, Trash2, Link2, PlusCircle, Filter } from 'lucide-react';
import { toast } from "sonner";

interface MediaItem {
  id: string;
  filename: string;
  type: 'image' | 'document';
  size: string;
  url: string;
  thumbnail: string;
  uploadedAt: string;
  uploadedBy: string;
}

const mockMediaItems: MediaItem[] = [
  {
    id: '1',
    filename: 'hero-banner.jpg',
    type: 'image',
    size: '1.2MB',
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&auto=format&fit=crop',
    uploadedAt: '2025-05-10T10:30:00Z',
    uploadedBy: 'Admin User'
  },
  {
    id: '2',
    filename: 'team-photo.jpg',
    type: 'image',
    size: '3.4MB',
    url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&auto=format&fit=crop',
    uploadedAt: '2025-05-09T14:20:00Z',
    uploadedBy: 'Admin User'
  },
  {
    id: '3',
    filename: 'annual-report-2025.pdf',
    type: 'document',
    size: '4.7MB',
    url: '#',
    thumbnail: '',
    uploadedAt: '2025-05-08T09:15:00Z',
    uploadedBy: 'Admin User'
  },
  {
    id: '4',
    filename: 'product-brochure.pdf',
    type: 'document',
    size: '2.3MB',
    url: '#',
    thumbnail: '',
    uploadedAt: '2025-05-07T16:45:00Z',
    uploadedBy: 'Admin User'
  },
  {
    id: '5',
    filename: 'healthcare-innovation.jpg',
    type: 'image',
    size: '1.8MB',
    url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=300&auto=format&fit=crop',
    uploadedAt: '2025-05-06T11:30:00Z',
    uploadedBy: 'Admin User'
  },
  {
    id: '6',
    filename: 'medical-research.jpg',
    type: 'image',
    size: '2.5MB',
    url: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=800&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=300&auto=format&fit=crop',
    uploadedAt: '2025-05-05T13:20:00Z', 
    uploadedBy: 'Admin User'
  }
];

export function MediaLibrary() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(mockMediaItems);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  
  const filteredItems = mediaItems.filter(item => {
    // Filter by search
    const matchesSearch = item.filename.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by type
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'images') return item.type === 'image' && matchesSearch;
    if (activeTab === 'documents') return item.type === 'document' && matchesSearch;
    
    return matchesSearch;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setIsUploadDialogOpen(false);
      toast.success('Files uploaded successfully');
      
      // In a real implementation, we'd add the new files to the state
    }, 1500);
  };

  const handleDeleteMedia = (item: MediaItem) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (selectedItem) {
      setMediaItems(mediaItems.filter(item => item.id !== selectedItem.id));
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
      toast.success('Media deleted successfully');
    }
  };
  
  const handleViewDetails = (item: MediaItem) => {
    setSelectedItem(item);
    setIsDetailsDialogOpen(true);
  };
  
  const handleCopyLink = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    toast.success('Link copied to clipboard');
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
            <CardTitle>Media Library</CardTitle>
            <CardDescription>Manage uploaded images and files</CardDescription>
          </div>
          <Button onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" /> Upload Files
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All Files</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search files..."
                    className="pl-8 w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="border rounded-lg overflow-hidden flex flex-col"
                >
                  <div className="relative h-40 bg-slate-100 flex items-center justify-center">
                    {item.type === 'image' ? (
                      <img 
                        src={item.thumbnail} 
                        alt={item.filename} 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-4">
                        <FileText className="h-12 w-12 text-slate-400" />
                        <span className="text-xs mt-2 font-medium text-slate-500">
                          {item.filename.split('.').pop()?.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 flex-1">
                    <div className="truncate font-medium text-sm">{item.filename}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center justify-between">
                      <span>{item.size}</span>
                      <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="border-t p-2 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(item)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyLink(item)}>
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.open(item.url, '_blank')}>
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteMedia(item)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {/* Empty state when no results */}
              {filteredItems.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center h-64 border rounded-lg bg-slate-50">
                  <Search className="h-10 w-10 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No matching files found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search or upload new files
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
            <DialogDescription>
              Upload images and documents to the media library.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleUpload}>
            <div className="space-y-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="files">Files</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Input
                    id="files"
                    type="file"
                    multiple
                    className="hidden"
                  />
                  <Label htmlFor="files" className="cursor-pointer block">
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mb-4">
                        SVG, PNG, JPG, GIF or PDF (max. 10MB)
                      </p>
                      <Button type="button" size="sm">Select Files</Button>
                    </div>
                  </Label>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>Selected Files</Label>
                <div className="text-sm text-muted-foreground italic">
                  No files selected
                </div>
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Upload'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedItem?.filename}"? This action cannot be undone.
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

      {/* Media Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Media Details</DialogTitle>
          </DialogHeader>
          
          {selectedItem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-100 rounded-lg flex items-center justify-center p-4">
                {selectedItem.type === 'image' ? (
                  <img 
                    src={selectedItem.thumbnail} 
                    alt={selectedItem.filename} 
                    className="max-h-[200px] max-w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px]">
                    <FileText className="h-16 w-16 text-slate-400" />
                    <span className="text-sm mt-2 font-medium text-slate-500">
                      {selectedItem.filename.split('.').pop()?.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Name</Label>
                  <p className="font-medium truncate">{selectedItem.filename}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Type</Label>
                  <p className="font-medium capitalize">{selectedItem.type}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Size</Label>
                  <p className="font-medium">{selectedItem.size}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Uploaded At</Label>
                  <p className="font-medium">{formatDate(selectedItem.uploadedAt)}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Uploaded By</Label>
                  <p className="font-medium">{selectedItem.uploadedBy}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCopyLink(selectedItem as MediaItem)}
              >
                <Link2 className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
              <Button 
                variant="outline" 
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
