import { PixelCrop } from 'react-image-crop';

export const getCroppedImg = async (imageSrc: string, crop: PixelCrop): Promise<Blob> => {
    console.log('getCroppedImg called with:', { imageSrc, crop });

    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => {
            console.log('Image loaded:', { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight });
            resolve(img);
        });
        img.addEventListener('error', (error) => {
            console.error('Image load error:', error);
            reject(error);
        });
        img.src = imageSrc;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error('No 2D context');
        throw new Error('No 2D context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    console.error('Canvas is empty');
                    reject('Canvas is empty');
                    return;
                }
                console.log('Blob created:', { size: blob.size, type: blob.type });
                resolve(blob);
            },
            'image/jpeg',
            1
        );
    });
};
