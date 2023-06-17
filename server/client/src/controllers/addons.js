import { collection, doc, addDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";

import { db } from "../firebase";

// Add a new addon
export async function addAddon(data) {
  try {
    await addDoc(collection(db, "addons"), { ...data }, { merge: true });
  } catch (error) {
    console.error("Error adding new addon: ", error);
  }
}

// Get data of a specific addon,
export async function getAddon(docId) {
  try {
    const docSnap = await getDoc(doc(db, "addons", docId));

    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
    else console.log("No car found");
  } catch (err) {
    console.log(err);
  }
}

export async function getAllAddons() {
  let list = [];
  try {
    const querySnapshot = await getDocs(collection(db, "addons"));
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    return list;
  } catch (error) {
    console.log("error fetching addons ", error);
  }
}

export async function updateAddon(docId, data) {
  try {
    const addonDocRef = doc(db, "addons", docId);
    await updateDoc(addonDocRef, { ...data });
  } catch (error) {
    console.error("Error updating addon:", error);
  }
}
