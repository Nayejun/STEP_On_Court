import React, { useEffect } from "react";
import { fetchActivitiesGenerate } from "../utils/api";

function Reservation() {
   useEffect(() => {
      fetchActivitiesGenerate();
   }, []);
}

export default Reservation;
