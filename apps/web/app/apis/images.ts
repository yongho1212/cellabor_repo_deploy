import { storage } from '../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';


export enum ImageType {
    USER = 'users',
    POST = 'posts'
}

interface StoreImagesProps {
    type: ImageType;
    postId?: string;
    files: File | File[];
    uid: string;
}


export const storeImages = async ({ type, files, uid }: StoreImagesProps): Promise<string[]> => {
    const userId = uid;
    const postId = uuidv4();
    if (!userId) throw new Error('User not authenticated');

    const fileList = Array.isArray(files) ? files : [files];

    const uploadPromises: Promise<string>[] = [];

    fileList.forEach((file) => {
        let path: string;
        if (type === ImageType.USER) {
            path = `${ImageType.USER}/${userId}/${file.name}`;
        } else if (type === ImageType.POST) {
            path = `${ImageType.POST}/${postId}/${file.name}`;
        } else {
            throw new Error('Invalid parameters for image upload');
        }

        const imageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(imageRef, file);

        const uploadPromise = new Promise<string>((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done for ${file.name}`);
                },
                (error) => {
                    console.error('Error uploading file:', error);
                    reject(error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('File available at:', downloadURL);
                        resolve(downloadURL);
                    } catch (error) {
                        console.error('Error getting download URL:', error);
                        reject(error);
                    }
                }
            );
        });

        uploadPromises.push(uploadPromise);
    });

    return Promise.all(uploadPromises);
};

// 이미지 삭제 함수
export const deleteImage = async (imageUrl: string | undefined) => {
    try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
        console.log('Image deleted successfully');
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};
