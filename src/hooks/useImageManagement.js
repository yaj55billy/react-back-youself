import { useState } from 'react';

export const useImageManagement = (initialImage = '', initialImages = []) => {
  const [images, setImages] = useState(initialImages);
  const [mainImage, setMainImage] = useState(initialImage);
  const [imageUrl, setImageUrl] = useState('');

  const handleAddImage = () => {
    if (imageUrl && images.length < 5) {
      setImages([...images, imageUrl]);
      if (!mainImage) setMainImage(imageUrl);
      setImageUrl('');
    }
  };

  const handleRemoveImage = (url) => {
    if (url === mainImage) {
      const remainingImages = images.filter(img => img !== url);
      setMainImage(remainingImages[0] || '');
    }
    setImages(images.filter(img => img !== url));
  };

  const handleSetMainImage = (url) => {
    setMainImage(url);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.match(/^https?:\/\/.+/i)) {
      setImageUrl(pastedText);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddImage();
    }
  };

  return {
    images,
    mainImage,
    imageUrl,
    setImageUrl,
    handleAddImage,
    handleRemoveImage,
    handleSetMainImage,
    handlePaste,
    handleKeyPress
  };
};