// components/ImageUploader.tsx

"use client";

import React, { useState, useEffect, FC, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDropzone } from 'react-dropzone';
import ReactCrop, { PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageUploaderProps {
    multiple?: boolean;
    onConfirm: (images: File[]) => void;
    isOpen: boolean;
    onClose: () => void;
    initialImages?: File[];
}

interface SelectedFile {
    id: string;
    file: File;
    crop?: PixelCrop;
    previewUrl: string;
    croppedFile?: File;
    croppedPreviewUrl?: string;
}

const ImageUploaderWithCrop: FC<ImageUploaderProps> = ({
                                                   multiple = false,
                                                   onConfirm,
                                                   isOpen,
                                                   onClose,
                                                   initialImages = [],
                                               }) => {
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
    const [currentCropIndex, setCurrentCropIndex] = useState<number | null>(null);
    const [tempCrop, setTempCrop] = useState<PixelCrop | undefined>(undefined);
    const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            if (initialImages.length > 0) {
                const initialSelectedFiles = initialImages.map((file) => ({
                    id: Math.random().toString(36).substr(2, 9),
                    file,
                    previewUrl: URL.createObjectURL(file),
                }));
                setSelectedFiles(initialSelectedFiles);
            } else {
                setSelectedFiles([]);
            }
        }
    }, [isOpen, initialImages]);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isOpen) {
                e.preventDefault();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('wheel', handleWheel, { passive: false });
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('wheel', handleWheel);
        };
    }, [isOpen]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = acceptedFiles.map((file) => ({
                id: Math.random().toString(36).substr(2, 9),
                file,
                previewUrl: URL.createObjectURL(file),
            }));
            const updatedFiles = multiple ? [...selectedFiles, ...newFiles] : newFiles.slice(0, 1);
            setSelectedFiles(updatedFiles);
        },
        [multiple, selectedFiles]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple,
    });

    const handleCropChange = (crop: PixelCrop) => {
        setTempCrop(crop);
    };

    const handleCropComplete = (crop: PixelCrop) => {
        setCompletedCrop(crop);
    };

    const handleImageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
        imgRef.current = event.currentTarget;
    };

    useEffect(() => {
        if (
            completedCrop &&
            completedCrop.width &&
            completedCrop.height &&
            imgRef.current &&
            canvasRef.current
        ) {
            const image = imgRef.current;
            const canvas = canvasRef.current;
            const crop = completedCrop;

            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;

            const pixelRatio = window.devicePixelRatio || 1;

            canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
            canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
                ctx.imageSmoothingQuality = 'high';

                ctx.drawImage(
                    image,
                    crop.x * scaleX,
                    crop.y * scaleY,
                    crop.width * scaleX,
                    crop.height * scaleY,
                    0,
                    0,
                    crop.width * scaleX,
                    crop.height * scaleY
                );
            }
        }
    }, [completedCrop]);

    const handleApplyCrop = async () => {
        if (
            currentCropIndex !== null &&
            canvasRef.current &&
            selectedFiles[currentCropIndex]
        ) {
            canvasRef.current.toBlob(
                (blob) => {
                    if (!blob) {
                        console.error('Canvas is empty');
                        return;
                    }
                    const croppedPreviewUrl = URL.createObjectURL(blob);
                    const croppedFile = new File([blob], selectedFiles[currentCropIndex]!.file.name, {
                        type: 'image/jpeg',
                    });
                    setSelectedFiles((prevFiles) => {
                        const newFiles = [...prevFiles];
                        if (newFiles[currentCropIndex!]?.croppedPreviewUrl) {
                            URL.revokeObjectURL(newFiles[currentCropIndex!]?.croppedPreviewUrl!);
                        }
                        newFiles[currentCropIndex!] = {
                            ...selectedFiles[currentCropIndex!],
                            croppedFile: croppedFile,
                            croppedPreviewUrl: croppedPreviewUrl,

                            id: selectedFiles[currentCropIndex!]!.id,
                            file: selectedFiles[currentCropIndex!]!.file,
                            previewUrl: selectedFiles[currentCropIndex!]!.previewUrl,
                            crop: tempCrop,
                        };
                        return newFiles;
                    });
                    setCurrentCropIndex(null);
                    setTempCrop(undefined);
                    setCompletedCrop(null);
                },
                'image/jpeg',
                1
            );
        }
    };


    const handleCropButtonClick = (index: number) => {
        setCurrentCropIndex(index);
        setTempCrop(selectedFiles[index]?.crop || undefined);
    };

    const handleConfirm = () => {
        const croppedImagesPromises = selectedFiles.map((selectedFile) => {
            if (selectedFile.croppedFile) {
                return Promise.resolve(selectedFile.croppedFile);
            }
            return Promise.resolve(selectedFile.file);
        });

        Promise.all(croppedImagesPromises).then((files) => {
            onConfirm(files);
            onClose();
            selectedFiles.forEach((selectedFile) => {
                URL.revokeObjectURL(selectedFile.previewUrl);
                if (selectedFile.croppedPreviewUrl) {
                    URL.revokeObjectURL(selectedFile.croppedPreviewUrl);
                }
            });
            setSelectedFiles([]);
        });
    };

    const handleCancel = () => {
        onClose();
        selectedFiles.forEach((selectedFile) => {
            URL.revokeObjectURL(selectedFile.previewUrl);
            if (selectedFile.croppedPreviewUrl) {
                URL.revokeObjectURL(selectedFile.croppedPreviewUrl);
            }
        });
        setSelectedFiles([]);
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 h-[70vh] flex flex-col">
                <h2 className="text-xl font-bold mb-3">이미지 업로드</h2>
                <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-3 mb-3 cursor-pointer">
                    <input {...getInputProps()} />
                    <p className="text-sm">이미지를 드래그 앤 드롭하거나 클릭하여 선택하세요</p>
                </div>

                <div className="flex-grow overflow-y-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                        {selectedFiles.map((selectedFile, index) => (
                            <div key={selectedFile.id} className="relative w-full h-0 pb-[100%] border-2">
                                <div className='absolute w-full h-full top-0 left-0 '>
                                    <img
                                        src={selectedFile.croppedPreviewUrl || selectedFile.previewUrl}
                                        alt={`Selected ${index}`}
                                        className="w-full h-full object-contain rounded"
                                        onError={(e) => {
                                            console.error('Image load error:', e);
                                            e.currentTarget.src = selectedFile.previewUrl;
                                        }}
                                    />
                                    <button
                                        onClick={() => handleCropButtonClick(index)}
                                        className="absolute bottom-1 right-1 bg-blue-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        크롭
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-3 flex justify-end">
                    <button onClick={handleCancel} className="bg-gray-300 text-black px-3 py-1 rounded mr-2 text-sm">
                        취소
                    </button>
                    <button onClick={handleConfirm} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                        확인
                    </button>
                </div>
            </div>

            {currentCropIndex !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="flex items-center justify-center bg-white p-4 rounded-lg h-[80vh] flex flex-col">
                        <div className=" h-[70vh] w-[70vh] overflow-auto relative border-2">
                            <ReactCrop
                                crop={tempCrop}
                                onChange={handleCropChange}
                                onComplete={handleCropComplete}
                                aspect={1}
                            >
                                <img
                                    src={selectedFiles[currentCropIndex]?.previewUrl}
                                    alt={`Crop ${currentCropIndex}`}
                                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                    onLoad={handleImageLoaded}
                                />
                            </ReactCrop>
                        </div>
                        <div className="mt-3 flex justify-end">
                            <button
                                onClick={() => {
                                    setCurrentCropIndex(null);
                                    setTempCrop(undefined);
                                    setCompletedCrop(null);
                                }}
                                className="bg-gray-300 text-black px-3 py-1 rounded mr-2 text-sm"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleApplyCrop}
                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                            >
                                적용
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* 캔버스를 숨기거나 필요에 따라 표시 */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>,
        document.body
    );
};

export default ImageUploaderWithCrop;
