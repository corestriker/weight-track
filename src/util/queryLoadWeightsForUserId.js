import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export const queryLoadWeightsForUserId = (userUid, order) => {
  return query(
    collection(db, "user", userUid, "weights"),
    orderBy("date", order)
  );
};
