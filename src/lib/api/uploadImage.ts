import { getAuthToken } from 'lib/auth/getAuthToken';

type UploadResult = {
  success: boolean;
  message: string;
  url: string | null;
};

type UploadImageParams = {
  file: File;
  folder?: string;
  isBanner?: boolean;
};

const uploadImage = async ({
  file,
  folder = 'images',
  isBanner = false,
}: UploadImageParams): Promise<UploadResult> => {
  try {
    const token = getAuthToken();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    if (isBanner) {
      formData.append('isBanner', 'true');
    }

    const response = await fetch(import.meta.env.VITE_UPLOAD_URL, {
      method: 'POST',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.error || 'Error uploading file',
        url: null,
      };
    }

    const result = await response.json();

    return {
      success: true,
      message: 'File uploaded successfully',
      url: result.data.downloadUrl,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: false, message: 'Error uploading file', url: null };
  }
};

export default uploadImage;
