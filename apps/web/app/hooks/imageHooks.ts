import { useState, useCallback } from 'react';
import { deleteImage, ImageType, storeImages } from '../apis/images';

type ImageUploadOptions = {
    uid: string;
    type: ImageType;
    onSuccess?: (urls: string[]) => void;
    onError?: (error: any) => void;
};

export const useImageUpload = ({ uid, type, onSuccess, onError }: ImageUploadOptions) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleImageUpload = useCallback(async (files: File[]) => {
        if (!uid) return;
        setIsUpdating(true);
        let uploadedUrls: string[] = [];

        try {
            uploadedUrls = await storeImages({
                type,
                files,
                uid,
            });
            onSuccess?.(uploadedUrls);
            return uploadedUrls;
        } catch (error) {
            console.error('이미지 업로드 중 오류 발생:', error);
            onError?.(error);

            if (uploadedUrls.length > 0) {
                try {
                    await Promise.all(uploadedUrls.map(deleteImage));
                } catch (deleteError) {
                    console.error('스토리지 이미지 삭제 중 오류 발생:', deleteError);
                }
            }
        } finally {
            setIsUpdating(false);
        }
    }, [uid, type, onSuccess, onError]);

    return {
        handleImageUpload,
        deleteImage,
        isUpdating
    };
};
