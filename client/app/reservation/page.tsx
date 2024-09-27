"use client";

import React from "react";
import { Calendar } from "@/app/components/ui/calendar";

function Reservation() {
   const [date, setDate] = React.useState<Date | undefined>(undefined);
   return <Calendar mode="single" selected={date} onSelect={setDate} />;
}

export default Reservation;
