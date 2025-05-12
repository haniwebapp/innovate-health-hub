
import React from 'react';
import { PageSection } from '@/types/pageTypes';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface SectionEditorProps {
  section: PageSection;
  onChange: (section: PageSection) => void;
}

export function SectionEditor({ section, onChange }: SectionEditorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...section,
      [name]: value,
    });
  };

  return (
    <div className="space-y-4">
      {/* Common fields for all section types */}
      <div>
        <FormLabel>Title</FormLabel>
        <Input
          name="title"
          value={section.title || ''}
          onChange={handleChange}
          placeholder="Section title..."
        />
      </div>

      {/* Content field - common for most section types */}
      {section.type !== 'cards' && (
        <div>
          <FormLabel>Content</FormLabel>
          <Textarea
            name="content"
            value={section.content || ''}
            onChange={handleChange}
            placeholder="Section content..."
            rows={6}
          />
        </div>
      )}

      {/* Specific fields based on section type */}
      {section.type === 'hero' && (
        <div>
          <FormLabel>Background Image URL</FormLabel>
          <Input
            name="backgroundImage"
            value={section.backgroundImage || ''}
            onChange={handleChange}
            placeholder="URL to background image..."
          />
        </div>
      )}

      {section.type === 'image-text' && (
        <div>
          <FormLabel>Image URL</FormLabel>
          <Input
            name="imageUrl"
            value={section.imageUrl || ''}
            onChange={handleChange}
            placeholder="URL to image..."
          />
          <div className="mt-2">
            <FormLabel>Image Alignment</FormLabel>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="alignment"
                  value="left"
                  checked={section.alignment === 'left'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Left
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="alignment"
                  value="right"
                  checked={section.alignment === 'right'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Right
              </label>
            </div>
          </div>
        </div>
      )}

      {section.type === 'cta' && (
        <div>
          <FormLabel>Button Text</FormLabel>
          <Input
            name="buttonText"
            value={section.buttonText || ''}
            onChange={handleChange}
            placeholder="Call to action button text..."
          />
        </div>
      )}
    </div>
  );
}
