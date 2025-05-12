
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Eye, Loader2 } from "lucide-react";

interface ActionButtonsProps {
  isNewPage: boolean;
  saving: boolean;
  validating: boolean;
  onBack: () => void;
  onSave: () => void;
  onValidate: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isNewPage,
  saving,
  validating,
  onBack,
  onSave,
  onValidate
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pages
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={onValidate}
            disabled={validating}
            className="gap-2"
          >
            {validating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
            Validate Content
          </Button>
          <Button 
            type="submit"
            onClick={onSave}
            disabled={saving}
            className="gap-2"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isNewPage ? "Create Page" : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={saving}
          onClick={onSave}
          className="gap-2"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isNewPage ? "Create Page" : "Save Changes"}
        </Button>
      </div>
    </>
  );
};
