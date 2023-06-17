import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase";

// Add a new car
export async function addCar(docId, data) {
  try {
    await setDoc(doc(collection(db, "cars"), docId), { ...data }, { merge: true });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// Get data of a specific car
export async function getCar(docId) {
  try {
    const docSnap = await getDoc(doc(db, "cars", docId));

    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
    else console.log("No car found");
  } catch (err) {
    console.log(err);
  }
}

export async function getAllCars() {
  let list = [];
  try {
    const querySnapshot = await getDocs(collection(db, "cars"));
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    return list;
  } catch (error) {
    console.log(error);
  }
}

// Get no of cars available
export async function getNoOfAvailableCars() {
  try {
    const collectionRef = collection(db, "cars");
    const q = query(collectionRef, where("status", "==", "Car park"));
    const querySnapshot = await getDocs(q);

    console.log("no of cars in controllers ", querySnapshot.size);

    return querySnapshot.size;
  } catch (error) {
    console.error("Error getting no of cars:", error);
  }
}

// get the id of first available car
export async function getIdOfFirstAvailableCar() {
  try {
    const collectionRef = collection(db, "cars");
    const q = query(collectionRef, where("status", "==", "Car park"), limit(1));
    const querySnapshot = await getDocs(q);

    console.log("querry snapshot ", querySnapshot.docs);

    if (querySnapshot.empty) {
      console.log("No documents found");
      return;
    }

    console.log("First document ID:", querySnapshot.docs[0].id);
    return querySnapshot.docs[0].id;
  } catch (error) {
    console.error("Error getting first document ID:", error);
  }
}

export async function changeCarAvailableStatus(docId) {
  try {
    const carDocRef = doc(db, "cars", docId);
    await updateDoc(carDocRef, { status: "Rented" });
  } catch (error) {
    console.error("Error updating car status:", error);
  }
}
