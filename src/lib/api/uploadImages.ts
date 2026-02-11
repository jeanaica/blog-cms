type UploadResult = {
  success: boolean;
  message: string;
  urls: string[];
};

type UploadImagesParams = {
  files: File[];
  folder?: string;
};

const uploadImages = async ({
  files,
  folder = 'images',
}: UploadImagesParams): Promise<UploadResult> => {
  try {
    const sessionToken = window?.sessionStorage?.getItem('token');
    const token = sessionToken ? JSON.parse(sessionToken) : '';

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('folder', folder);

    const response = await fetch(import.meta.env.VITE_MULTIPLE_UPLOAD_URL, {
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
        message: errorData.error || 'Error uploading files',
        urls: [],
      };
    }

    const result = await response.json();
    const urls = result.data.files.map(
      (f: { downloadUrl: string }) => f.downloadUrl
    );

    return {
      success: true,
      message: 'Files uploaded successfully',
      urls,
    };
  } catch (error) {
    console.error('Error uploading files:', error);
    return { success: false, message: 'Error uploading files', urls: [] };
  }
};

export default uploadImages;
