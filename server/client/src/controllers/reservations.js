import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

// Add a new reservation to database
export async function addReservation(data) {
  try {
    const newDocument = await addDoc(collection(db, "reservations"), {
      ...data,
    });

    return newDocument.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// Get data of a specific reservation
export async function getReservationData(docId) {
  try {
    const docSnap = await getDoc(doc(db, "reservations", docId));

    if (docSnap.exists()) return docSnap.data();
    else console.log("No reservation data found");
  } catch (err) {
    console.log(err);
  }
}

// Get data of all reservations
export async function getAllReservations() {
  try {
    const reservationsSnapshot = await getDocs(collection(db, "reservations"));

    let docs = [];
    reservationsSnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });

    return docs;
  } catch (err) {
    console.log(err);
  }
}

// update reservation document
export async function updateReservation(data, docId) {
  try {
    await setDoc(doc(collection(db, "reservations"), docId), { ...data }, { merge: true });
  } catch (error) {
    console.error("Error updating reservation document: ", error);
  }
}

// delete collection
// export async function deleteMyCollection(id) {
//   await deleteDoc(doc(db, "reservations", id));
//   console.log("Collection successfully deleted!");
// }
