// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi6F7cq0FehrWYgQQfmHYVMFvvGGR-Btg",
  authDomain: "bits-bids-fd293.firebaseapp.com",
  projectId: "bits-bids-fd293",
  storageBucket: "bits-bids-fd293.appspot.com",
  messagingSenderId: "1056825899497",
  appId: "1:1056825899497:web:3f41275bf6281f9f2c3378",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const uploadFile = async (file: any, ext: any, formattedDate: any) => {
  const bucket = `${process.env.BUCKET_URL}/${formattedDate}.${ext}`;
  const storageRef = ref(storage, bucket);

  await uploadBytes(storageRef, file);
};

export const deleteFile = async (formattedDate: any, ext: any) => {
  const bucket = `${process.env.BUCKET_URL}/${formattedDate}.${ext}`;
  const desertRef = ref(storage, bucket);

  await deleteObject(desertRef);
};
