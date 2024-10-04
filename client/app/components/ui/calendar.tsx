"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { cn } from "@/app/lib/utils";
import useStore from "@app/utils/store";

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

   // event dummy data
   const dummyData = [
      { date: "Thu Oct 17 2024", event: "Event 1" },
      { date: "Thu Oct 18 2024", event: "Event 2" },
      { date: "Thu Oct 19 2024", event: "Event 3" },
   ];

   // real event data
   const eventData = useStore((state) => state.reservations);

   useEffect(() => {
      const newEvents: { [key: string]: string[] } = {};
      dummyData.forEach((reservation) => {
         const dateString = new Date(reservation.date).toDateString();
         if (!newEvents[dateString]) {
            newEvents[dateString] = [];
         }
         newEvents[dateString].push(reservation.event);
      });
      setEvents(newEvents);
   }, []);

   // @useGuard 'Admin'
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

   const tileClassName = ({ date, view }: { date: Date; view: string }) => {
      const dateString = date.toDateString();
      return events[dateString] ? "highlight" : "";
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
            tileClassName={tileClassName}
            {...props}
         />
      </div>
   );
}

CustomCalendar.displayName = "CustomCalendar";

export { CustomCalendar };
