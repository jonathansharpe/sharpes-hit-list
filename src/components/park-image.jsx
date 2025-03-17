import React, { useState, useEffect } from 'react';

export default function ParkImage({ parkName }) {
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        const importImage = async () => {
            try {
                // Convert park name to URL-friendly format
                const imageName = parkName.toLowerCase().replace(/\s+/g, '-');
                const module = await import(`../images/${imageName}.jpg`);
                setImgSrc(module.default);
            } catch (error) {
                console.error(`Image import failed: ${error}`);
            }
        };

        importImage();
    }, [parkName]);

    return imgSrc;
} 