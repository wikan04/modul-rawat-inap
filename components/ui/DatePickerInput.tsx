"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface DatePickerInputProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export function DatePickerInput({ value, onChange }: DatePickerInputProps) {
  const [open, setOpen] = useState(false);

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 8);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "yyyy-MM-dd") : <span>Pilih tanggal</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
          initialFocus
          disabled={(date) => date < minDate}
        />
      </PopoverContent>
    </Popover>
  );
}
