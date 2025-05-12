
import React, { useState, useEffect } from "react";
import { PageSection } from "@/types/pageTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SectionEditorProps {
  section: PageSection;
  onChange: (updatedSection: PageSection) => void;
}

export function SectionEditor({ section, onChange }: SectionEditorProps) {
  const [localSection, setLocalSection] = useState<PageSection>(section);

  useEffect(() => {
    setLocalSection(section);
  }, [section]);

  const handleChange = <K extends keyof PageSection>(key: K, value: PageSection[K]) => {
    const updatedSection = {
      ...localSection,
      [key]: value,
    };
    setLocalSection(updatedSection);
    onChange(updatedSection);
  };

  const renderSectionFields = () => {
    switch (localSection.type) {
      case "hero":
        return (
          <>
            <div className="grid gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={localSection.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Hero Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={localSection.content || ""}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Hero content or subtitle"
                  className="min-h-20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Background Image URL</Label>
                <Input
                  id="imageUrl"
                  value={localSection.imageUrl || ""}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text (Optional)</Label>
                <Input
                  id="buttonText"
                  value={localSection.buttonText || ""}
                  onChange={(e) => handleChange("buttonText", e.target.value)}
                  placeholder="Get Started"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonUrl">Button URL (Optional)</Label>
                <Input
                  id="buttonUrl"
                  value={localSection.buttonUrl || ""}
                  onChange={(e) => handleChange("buttonUrl", e.target.value)}
                  placeholder="/about"
                />
              </div>
            </div>
          </>
        );
        
      case "content":
        return (
          <>
            <div className="grid gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="title">Section Title</Label>
                <Input
                  id="title"
                  value={localSection.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Section Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={localSection.content || ""}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Enter your content here..."
                  className="min-h-32"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alignment">Content Alignment</Label>
                <Select
                  value={localSection.alignment || "left"}
                  onValueChange={(value) => handleChange("alignment", value as "left" | "right" | "center")}
                >
                  <SelectTrigger id="alignment">
                    <SelectValue placeholder="Select alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );

      case "cards":
        return (
          <>
            <div className="grid gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="title">Section Title</Label>
                <Input
                  id="title"
                  value={localSection.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Cards Section Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Section Introduction (Optional)</Label>
                <Textarea
                  id="content"
                  value={localSection.content || ""}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Brief introduction for this cards section"
                  className="min-h-20"
                />
              </div>
              
              <div className="mt-4">
                <Label className="mb-2 block">Cards</Label>
                <div className="space-y-4">
                  {(localSection.items || []).map((card, index) => (
                    <Card key={index}>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm flex justify-between items-center">
                          <span>Card {index + 1}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-red-500 hover:text-red-600 hover:bg-red-50 px-2"
                            onClick={() => {
                              const newItems = [...(localSection.items || [])];
                              newItems.splice(index, 1);
                              handleChange("items", newItems);
                            }}
                          >
                            Remove
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={card.title || ""}
                            onChange={(e) => {
                              const newItems = [...(localSection.items || [])];
                              newItems[index] = { ...card, title: e.target.value };
                              handleChange("items", newItems);
                            }}
                            placeholder="Card Title"
                          />
                        </div>
                        <div className="space-y-2 mt-2">
                          <Label>Content</Label>
                          <Textarea
                            value={card.content || ""}
                            onChange={(e) => {
                              const newItems = [...(localSection.items || [])];
                              newItems[index] = { ...card, content: e.target.value };
                              handleChange("items", newItems);
                            }}
                            placeholder="Card content"
                            className="min-h-16"
                          />
                        </div>
                        <div className="space-y-2 mt-2">
                          <Label>Image URL (Optional)</Label>
                          <Input
                            value={card.imageUrl || ""}
                            onChange={(e) => {
                              const newItems = [...(localSection.items || [])];
                              newItems[index] = { ...card, imageUrl: e.target.value };
                              handleChange("items", newItems);
                            }}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newItems = [...(localSection.items || []), {
                        title: "",
                        content: "",
                        imageUrl: ""
                      }];
                      handleChange("items", newItems);
                    }}
                  >
                    Add Card
                  </Button>
                </div>
              </div>
            </div>
          </>
        );
      
      case "image-text":
        return (
          <>
            <div className="grid gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="title">Section Title</Label>
                <Input
                  id="title"
                  value={localSection.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Section Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Text Content</Label>
                <Textarea
                  id="content"
                  value={localSection.content || ""}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Text content to display alongside the image"
                  className="min-h-32"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={localSection.imageUrl || ""}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imagePosition">Image Position</Label>
                <Select
                  value={localSection.imagePosition || "left"}
                  onValueChange={(value) => handleChange("imagePosition", value)}
                >
                  <SelectTrigger id="imagePosition">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
        
      case "cta":
        return (
          <>
            <div className="grid gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="title">CTA Title</Label>
                <Input
                  id="title"
                  value={localSection.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Call to Action Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">CTA Description</Label>
                <Textarea
                  id="content"
                  value={localSection.content || ""}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Brief description for your call to action"
                  className="min-h-20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={localSection.buttonText || ""}
                  onChange={(e) => handleChange("buttonText", e.target.value)}
                  placeholder="Get Started"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonUrl">Button URL</Label>
                <Input
                  id="buttonUrl"
                  value={localSection.buttonUrl || ""}
                  onChange={(e) => handleChange("buttonUrl", e.target.value)}
                  placeholder="/contact"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bgColor">Background Color</Label>
                <Select
                  value={localSection.bgColor || "default"}
                  onValueChange={(value) => handleChange("bgColor", value)}
                >
                  <SelectTrigger id="bgColor">
                    <SelectValue placeholder="Select background" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
        
      default:
        return (
          <div className="py-4 text-center text-muted-foreground">
            Unknown section type: {localSection.type}
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {renderSectionFields()}
    </div>
  );
}
