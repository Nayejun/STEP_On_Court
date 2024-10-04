"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { cn } from "@/app/lib/utils";

export type CalendarProps = {
   className?: string;
   classNames?: any;
   showOutsideDays?: boolean;
};

function CustomCalendar({
   className,
   classNames,
   showOutsideDays = true,
   ...props
}: CalendarProps) {
   const [value, setValue] = useState(new Date());
   const [events, setEvents] = useState<{ [key: string]: string[] }>({});

   const handleDayClick = (date: Date) => {
      const dateString = date.toDateString();
      const event = prompt("일정 추가 :");
      if (event) {
         setEvents((prevEvents) => ({
            ...prevEvents,
            [dateString]: [...(prevEvents[dateString] || []), event],
         }));
      }
   };

   const tileContent = ({ date, view }: { date: Date; view: string }) => {
      const dateString = date.toDateString();
      return (
         <div>
            {events[dateString]?.map((event, index) => (
               <div key={index} className="event">
                  {event}
               </div>
            ))}
         </div>
      );
   };

   return (
      <div className={cn("p-3", className)}>
         <div className="selected-date">테스트 {value.toDateString()}</div>
         <Calendar
            onChange={(value) => {
               if (value) {
                  setValue(value as Date);
               }
            }}
            value={value}
            onClickDay={handleDayClick}
            tileContent={tileContent}
            {...props}
         />
      </div>
   );
}

CustomCalendar.displayName = "CustomCalendar";

export { CustomCalendar };
