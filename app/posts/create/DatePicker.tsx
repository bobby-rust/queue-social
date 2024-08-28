"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i);

export default function DatePicker({ setFieldValue, formState }: any) {
    const [date, setDate] = React.useState<Date>();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                <div className="flex p-3 gap-2">
                    <Select
                        onValueChange={(value) => setFieldValue("hour", parseInt(value))}
                        defaultValue="1"
                        value={formState.hour.toString()}
                    >
                        <SelectTrigger className="w-[90px]">
                            <SelectValue placeholder="Hour" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {hours.map((hour) => {
                                    return (
                                        <SelectItem key={hour} value={hour.toString()}>
                                            {hour < 10 ? `0${hour}` : hour}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={(value) => setFieldValue("minute", parseInt(value))}
                        defaultValue="0"
                        value={formState.minute.toString()}
                    >
                        <SelectTrigger className="w-[90px]">
                            <SelectValue placeholder="Minute" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {minutes.map((minute) => {
                                    return (
                                        <SelectItem key={minute} value={minute.toString()}>
                                            {minute < 10 ? `0${minute}` : minute}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={(value) =>
                            setFieldValue("am", value === "AM" ? true : false)
                        }
                        defaultValue="AM"
                        value={formState.am ? "AM" : "PM"}
                    >
                        <SelectTrigger className="w-[90px]">
                            <SelectValue placeholder="AM / PM" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="AM">AM</SelectItem>
                                <SelectItem value="PM">PM</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </PopoverContent>
        </Popover>
    );
}
