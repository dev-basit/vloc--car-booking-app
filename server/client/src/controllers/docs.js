import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

// e retrieves the target element and idToAppendWithFile is receieved to give unique names to documents, so our docs will not be overrided with in firebase storage
export function uploadPicToFirebaseStorage(e, idToAppendWithFile = "") {
  return new Promise((resolve, reject) => {
    let id = e.target.id + idToAppendWithFile;
    let value = e.target.files[0];

    const storageRef = ref(storage, id);
    const uploadTask = uploadBytesResumable(storageRef, value);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          case "default":
            console.log("case not found");
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}
