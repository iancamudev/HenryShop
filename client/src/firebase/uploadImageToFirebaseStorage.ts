// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';



// TODO: Add SDKs for Firebase products that you want to use
// Your web app's Firebase configuration
   
   const fireConfig: string = (process.env.REACT_APP_FIREBASE_CONFIG as string);
   const firebaseConfig = JSON.parse(fireConfig)


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const uploadImageToFirebaseStorage = async (file: any): Promise<string | null> => {
	if (!file) {
		return null;
	}

	const imageName = `${Date.parse(new Date().toISOString())}.${file.type.split('/')[1]}`;
	const storageRef = ref(storage, `productos/${imageName}`);
	await uploadBytes(storageRef, file);

	return await getDownloadURL(storageRef);
};
