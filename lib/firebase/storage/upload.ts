import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../client';

type FileUploadParams = {
  file: File;
  bucket?: string;
};

function handleUpload({ file, bucket = '' }: FileUploadParams) {
  if (!file) {
    alert('Please choose a file first!');
  }

  const storageRef = ref(storage, `/${bucket}/${file.name}`);

  return uploadBytes(storageRef, file);
}

export default handleUpload;
