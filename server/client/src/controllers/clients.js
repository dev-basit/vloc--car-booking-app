import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

import { db } from "../firebase";

export async function addClient(docId, data) {
  try {
    await setDoc(doc(collection(db, "clients"), docId), { ...data }, { merge: true });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// Get all clients
export async function getClients() {
  let list = [];
  try {
    const querySnapshot = await getDocs(collection(db, "clients"));
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    return list;
  } catch (error) {
    console.log(error);
  }
}

// Get data of a specific client
export async function getClient(docId) {
  try {
    const docSnap = await getDoc(doc(db, "clients", docId));

    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
    else console.log("No client  found");
  } catch (err) {
    console.log(err);
  }
}

export async function updateClient(docId, data) {
  try {
    await setDoc(doc(collection(db, "clients"), docId), { ...data }, { merge: true });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// export async function addReservationId(docId, data) {
//   try {
//     await setDoc(
//       doc(collection(db, "clients"), docId),
//       { reservationIds: data },
//       { merge: true }
//     );
//   } catch (error) {
//     console.error("Error adding document: ", error);
//   }
// }
