import useStore from "./store";

function getActivity() {
   const allReservations = useStore((state) => state.allReservations);
   return allReservations;
}

export default getActivity;
