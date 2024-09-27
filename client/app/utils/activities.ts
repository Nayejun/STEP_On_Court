import { fetchActivities } from "@/app/utils/api";

function getActivity() {
   fetchActivities().then((res) => {
      return res.activity;
   });
}

export default getActivity;
