"use client";

import React, { useEffect } from "react";
import { fetchActivitiesGenerate } from "../utils/api";
import { Calendar } from "@/app/components/ui/calendar";

function Reservation() {
   useEffect(() => {
      fetchActivitiesGenerate();
   }, []);

   return <Calendar />;
}

export default Reservation;
