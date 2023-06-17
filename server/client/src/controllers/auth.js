import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export function createUser(email, password) {
  return new Promise((resolve, reject) => {
    const userCredentials = createUserWithEmailAndPassword(auth, email, password);
    resolve(userCredentials);
  });
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    const userCredentials = signInWithEmailAndPassword(auth, email, password);
    resolve(userCredentials);
  });
}
