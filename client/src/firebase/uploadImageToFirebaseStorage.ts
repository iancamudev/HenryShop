// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARgDCmvEBBWCBl6RdHLZopxIyNX_G5ml0",
    authDomain: "workshop-aa8df.firebaseapp.com",
    projectId: "workshop-aa8df",
    storageBucket: "workshop-aa8df.appspot.com",
    messagingSenderId: "567878876501",
    appId: "1:567878876501:web:24d14bb066736eeb5983dc"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const uploadImageToFirebaseStorage = async (file: File | undefined): Promise<string | null> => {
	if (!file) {
		return null;
	}

	const imageName = `${Date.parse(new Date().toISOString())}.${file.type.split('/')[1]}`;
	const storageRef = ref(storage, `productos/${imageName}`);
	await uploadBytes(storageRef, file);

	return await getDownloadURL(storageRef);
};
