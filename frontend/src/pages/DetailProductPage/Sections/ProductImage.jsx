import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

const ProductImage = ({ product }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (product?.images?.length > 0) {
            const galleryImages = product.images.map(imageUrl => ({
                original: imageUrl, // S3 전체 URL 사용
                thumbnail: imageUrl, // S3 전체 URL 사용
            }));

            setImages(galleryImages);
        } 
    }, [product]);

    return <ImageGallery items={images} showPlayButton={false} />;
}

export default ProductImage;