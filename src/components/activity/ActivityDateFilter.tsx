
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Check, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ActivityDateFilterProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onDateChange: (start: Date | undefined, end: Date | undefined) => void;
}

export function ActivityDateFilter({ startDate, endDate, onDateChange }: ActivityDateFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localStartDate, setLocalStartDate] = useState<Date | undefined>(startDate);
  const [localEndDate, setLocalEndDate] = useState<Date | undefined>(endDate);
  
  const hasActiveFilter = !!startDate || !!endDate;
  
  const handleApply = () => {
    onDateChange(localStartDate, localEndDate);
    setIsOpen(false);
  };
  
  const handleClear = () => {
    setLocalStartDate(undefined);
    setLocalEndDate(undefined);
    onDateChange(undefined, undefined);
    setIsOpen(false);
  };
  
  const formatDateDisplay = () => {
    if (startDate && endDate) {
      return `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`;
    }
    if (startDate) {
      return `From ${format(startDate, 'MMM d, yyyy')}`;
    }
    if (endDate) {
      return `Until ${format(endDate, 'MMM d, yyyy')}`;
    }
    return "Filter by date";
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "gap-2 text-sm",
            hasActiveFilter && "bg-moh-lightGreen text-moh-darkGreen border-moh-green"
          )}
          onClick={() => setIsOpen(true)}
        >
          <CalendarIcon className="h-4 w-4" />
          {formatDateDisplay()}
          {hasActiveFilter && (
            <X 
              className="h-3 w-3 opacity-50 hover:opacity-100" 
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 space-y-3">
          <div className="grid gap-2">
            <h4 className="text-sm font-medium">Start date</h4>
            <Calendar
              mode="single"
              selected={localStartDate}
              onSelect={setLocalStartDate}
              initialFocus
            />
          </div>
          <div className="grid gap-2">
            <h4 className="text-sm font-medium">End date</h4>
            <Calendar
              mode="single"
              selected={localEndDate}
              onSelect={setLocalEndDate}
              initialFocus
              disabled={(date) => localStartDate ? date < localStartDate : false}
            />
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={handleClear}>Clear</Button>
            <Button 
              className="bg-moh-green hover:bg-moh-darkGreen"
              size="sm"
              onClick={handleApply}
            >
              <Check className="mr-2 h-4 w-4" />
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ActivityDateFilter;
