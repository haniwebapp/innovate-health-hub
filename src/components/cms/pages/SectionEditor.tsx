
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

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...section,
      [name]: value,
    });
  };

  // Check if items array exists and create empty array if not
  const ensureItemsExist = (section: PageSection) => {
    if (section.type === 'cards' && !section.items) {
      onChange({
        ...section,
        items: []
      });
    }
  };

  // If it's a cards section without items, initialize it
  React.useEffect(() => {
    ensureItemsExist(section);
  }, [section.type]);

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
        <>
          <div>
            <FormLabel>Image URL</FormLabel>
            <Input
              name="imageUrl"
              value={section.imageUrl || ''}
              onChange={handleChange}
              placeholder="URL to image..."
            />
          </div>
          <div className="mt-2">
            <FormLabel>Image Alignment</FormLabel>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="alignment"
                  value="left"
                  checked={section.alignment === 'left'}
                  onChange={handleRadioChange}
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
                  onChange={handleRadioChange}
                  className="mr-2"
                />
                Right
              </label>
            </div>
          </div>
        </>
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
          <div className="mt-4">
            <FormLabel>Button Link (Optional)</FormLabel>
            <Input
              name="buttonLink"
              value={section.buttonLink || ''}
              onChange={handleChange}
              placeholder="URL for button (e.g. /contact)..."
            />
          </div>
        </div>
      )}

      {section.type === 'cards' && section.items && (
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <FormLabel className="m-0">Cards (Coming soon)</FormLabel>
            <button
              type="button"
              className="text-xs text-blue-500 hover:text-blue-700 disabled:opacity-50"
              disabled={true}
            >
              Add Card
            </button>
          </div>
          <div className="bg-slate-50 rounded p-4 text-sm text-slate-500">
            Cards editing will be available in the next update. For now, you can add basic content sections.
          </div>
        </div>
      )}
    </div>
  );
}
