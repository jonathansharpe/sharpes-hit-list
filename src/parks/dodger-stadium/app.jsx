import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/page-title.jsx';
import Essentials from '../../components/essentials.jsx';
import MainTextDiv from '../../components/main-text-div.jsx';
import ImageHeader from '../../components/image-header.jsx';
import GetReview from '../../components/make-review.jsx';

export default function App({ parkName }) {
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        const importImage = async () => {
            try {
                console.log('Attempting to import image:', `../../images/${parkName}.jpg`);
                const module = await import(`../../images/${parkName}.jpg`);
                console.log('Image imported successfully:', module.default);
                setImgSrc(module.default);
            } catch (error) {
                console.error(`Image import failed for ${parkName}:`, error);
                console.error('Attempted path:', `../../images/${parkName}.jpg`);
            }
        };

        importImage();
    }, [parkName]);

    // Convert URL-friendly name to display name
    const displayName = parkName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <Essentials>
            <PageTitle title={displayName} />
            <MainTextDiv>
                <ImageHeader imageLink={imgSrc} headerText={`${displayName} Review`} />
                <GetReview venueName={displayName} />
            </MainTextDiv>
        </Essentials>
    );
} 