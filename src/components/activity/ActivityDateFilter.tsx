
import React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

interface ActivityDateFilterProps {
  startDate?: Date;
  endDate?: Date;
  onDateChange: (start: Date | undefined, end: Date | undefined) => void;
}

const ActivityDateFilter = ({ 
  startDate, 
  endDate, 
  onDateChange 
}: ActivityDateFilterProps) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: startDate,
    to: endDate,
  });

  // Handle date selection and close when both dates are selected
  React.useEffect(() => {
    if (date.from && date.to) {
      onDateChange(date.from, date.to);
    }
  }, [date, onDateChange]);
  
  // Reset date filter
  const handleReset = () => {
    setDate({ from: undefined, to: undefined });
    onDateChange(undefined, undefined);
    setOpen(false);
  };

  // Format date range string for display
  const formatDateRange = (): string => {
    if (!date.from) return "Filter by date range";
    
    if (!date.to) {
      return `From ${format(date.from, "PP")}`;
    }
    
    return `${format(date.from, "PP")} - ${format(date.to, "PP")}`;
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={cn(
            "flex items-center gap-1 border-moh-green/20 text-sm h-8",
            date.from && "bg-moh-lightGreen border-moh-green/40 text-moh-darkGreen"
          )}
        >
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>{formatDateRange()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 border-b">
          <Label className="text-sm font-medium">Select Date Range</Label>
        </div>
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          initialFocus
          numberOfMonths={1}
        />
        <div className="flex items-center justify-between p-3 border-t">
          {date.from && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleReset}
            >
              Reset
            </Button>
          )}
          <Button 
            size="sm"
            onClick={() => setOpen(false)}
            disabled={!date.from}
            className="ml-auto"
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ActivityDateFilter;
