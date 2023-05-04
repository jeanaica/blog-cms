import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { storage } from '../client';

type FileUploadParams = {
  file: File;
  bucket?: string;
  fileTypes?: Array<string>;
  maxFileSize?: number;
};

const upload = async ({
  file,
  bucket = 'temp',
  fileTypes = ['image/jpeg', 'image/png'],
  maxFileSize = 10 * 1024 * 1024, // 10MB in bytes
}: FileUploadParams) => {
  if (!fileTypes.includes(file.type)) {
    console.error('Error: Invalid file type');
    return {
      success: false,
      message:
        'Invalid file type. Only .jpg, .jpeg, and .png files are allowed',
      url: null,
    };
  }

  if (file.size > maxFileSize) {
    console.error('Error: File size exceeds 10MB');
    return { success: false, message: 'File size exceeds 10MB', url: null };
  }

  // Create a unique filename for the uploaded file
  const uniqueFilename = `${new Date().getTime()}-${file.name}`;

  // Create a reference to the Firebase Storage location where the file will be uploaded
  const storageRef = ref(storage, `${bucket}/${uniqueFilename}`);

  // Upload the file to Firebase Storage
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Show the upload progress
  uploadTask.on('state_changed', snapshot => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload progress:', progress, '%');
  });

  // Get the download URL and return it
  try {
    await uploadTask;
    const downloadURL = await getDownloadURL(storageRef);
    return {
      success: true,
      message: 'File uploaded successfully',
      url: downloadURL,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: false, message: 'Error uploading file', url: null };
  }
};

export const moveImageToFolder = async (
  currentURL = '',
  newFolder = 'banner'
) => {
  const fileName = currentURL?.split('%2F')?.pop()?.split('?')?.shift();
  const newStorageRef = ref(storage, `${newFolder}/${fileName}`);

  // Download the image from the current URL
  const response = await fetch(currentURL);
  const blob = await response.blob();

  // Upload the image to the new folder
  await uploadBytesResumable(newStorageRef, blob);

  // Get the new download URL
  const newDownloadURL = await getDownloadURL(newStorageRef);

  // Delete the original image from the temp folder
  const oldStorageRef = ref(storage, currentURL);
  await deleteObject(oldStorageRef);

  return newDownloadURL;
};

export default upload;
