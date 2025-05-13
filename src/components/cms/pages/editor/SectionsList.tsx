
import React from "react";
import { PageSection } from "@/types/pageTypes";
import { SectionEditor } from "../SectionEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Plus, Trash2, MoveUp, MoveDown } from "lucide-react";

interface SectionsListProps {
  sections: PageSection[];
  setSections: React.Dispatch<React.SetStateAction<PageSection[]>>;
}

export const SectionsList: React.FC<SectionsListProps> = ({
  sections,
  setSections
}) => {
  const onAddSection = (type: PageSection["type"]) => {
    const newSection: PageSection = {
      type,
      title: "",
      content: ""
    };
    
    setSections([...sections, newSection]);
  };

  const onRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const onMoveSection = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === sections.length - 1)
    ) {
      return;
    }

    const newSections = [...sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newSections[index];
    newSections[index] = newSections[newIndex];
    newSections[newIndex] = temp;
    
    setSections(newSections);
  };

  const onUpdateSection = (index: number, updatedSection: PageSection) => {
    const newSections = [...sections];
    newSections[index] = updatedSection;
    setSections(newSections);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Page Sections</h3>
        <div className="flex gap-2 items-center">
          <Select
            onValueChange={(value: PageSection["type"]) => onAddSection(value as PageSection["type"])}
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Add Section</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hero">Hero Section</SelectItem>
              <SelectItem value="content">Content Section</SelectItem>
              <SelectItem value="cards">Cards Section</SelectItem>
              <SelectItem value="image-text">Image + Text</SelectItem>
              <SelectItem value="cta">Call to Action</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {sections.length === 0 ? (
          <div className="flex items-center justify-center border rounded-lg p-8">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                No sections added yet. Add your first section to get started.
              </p>
              <Select
                onValueChange={(value: PageSection["type"]) => onAddSection(value as PageSection["type"])}
              >
                <SelectTrigger className="w-[180px] mx-auto">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Section</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero">Hero Section</SelectItem>
                  <SelectItem value="content">Content Section</SelectItem>
                  <SelectItem value="cards">Cards Section</SelectItem>
                  <SelectItem value="image-text">Image + Text</SelectItem>
                  <SelectItem value="cta">Call to Action</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          sections.map((section, index) => (
            <Card key={index} className="relative border">
              <CardHeader className="bg-slate-50 flex flex-row items-center justify-between py-3">
                <CardTitle className="text-sm font-medium capitalize flex gap-2 items-center">
                  Section {index + 1}: {section.type}
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onMoveSection(index, 'up')}
                    disabled={index === 0}
                    className="h-8 w-8"
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onMoveSection(index, 'down')}
                    disabled={index === sections.length - 1}
                    className="h-8 w-8"
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveSection(index)}
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <SectionEditor 
                  section={section}
                  onChange={(updatedSection) => onUpdateSection(index, updatedSection)}
                />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
