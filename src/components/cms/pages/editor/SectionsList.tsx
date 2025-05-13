
import React from "react";
import { PageSection } from "@/types/pageTypes";
import { Button } from "@/components/ui/button";
import { SectionEditor } from "../SectionEditor";
import { Plus, MoveUp, MoveDown, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface SectionsListProps {
  sections: PageSection[];
  setSections: React.Dispatch<React.SetStateAction<PageSection[]>>;
}

export const SectionsList: React.FC<SectionsListProps> = ({
  sections,
  setSections
}) => {
  const addSection = () => {
    setSections([
      ...sections,
      {
        type: "content",
        title: "",
        content: ""
      }
    ]);
  };

  const updateSection = (index: number, updatedSection: PageSection) => {
    const updatedSections = [...sections];
    updatedSections[index] = updatedSection;
    setSections(updatedSections);
  };

  const removeSection = (index: number) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === sections.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updatedSections = [...sections];
    const temp = updatedSections[index];
    updatedSections[index] = updatedSections[newIndex];
    updatedSections[newIndex] = temp;
    setSections(updatedSections);
  };

  return (
    <div className="space-y-6">
      {sections.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg bg-muted/50">
          <p className="text-muted-foreground mb-4">No content sections added yet</p>
          <Button onClick={addSection}>
            <Plus className="mr-2 h-4 w-4" />
            Add First Section
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((section, index) => (
            <Card key={index} className="p-4 border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-md font-medium capitalize">
                  {section.type} Section {index + 1}
                </h3>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSection(index, "up")}
                    disabled={index === 0}
                    className="h-8 w-8 p-0"
                  >
                    <MoveUp className="h-4 w-4" />
                    <span className="sr-only">Move Up</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSection(index, "down")}
                    disabled={index === sections.length - 1}
                    className="h-8 w-8 p-0"
                  >
                    <MoveDown className="h-4 w-4" />
                    <span className="sr-only">Move Down</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(index)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
              <SectionEditor
                section={section}
                onChange={(updatedSection) => updateSection(index, updatedSection)}
              />
            </Card>
          ))}
          <Button onClick={addSection} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Section
          </Button>
        </div>
      )}
    </div>
  );
};
