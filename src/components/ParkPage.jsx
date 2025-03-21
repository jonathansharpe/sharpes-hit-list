import React, { useState, useEffect } from 'react';
import PageTitle from './page-title.jsx';
import Essentials from './essentials.jsx';
import MainTextDiv from './main-text-div.jsx';
import ImageHeader from './image-header.jsx';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Paragraph from './paragraph.jsx';
import SectionHeader from './park-review-header.jsx';
import parkNames from '../parks/_shared/parkNames.js';

export default function ParkPage() {
  const [parkName, setParkName] = useState('');
  const [parkDir, setParkDir] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract park name from URL
  useEffect(() => {
    const extractParkFromUrl = () => {
      try {
        // Extract park name from URL path
        const path = window.location.pathname;
        
        // Use a more forgiving regex to extract park name
        const parkMatch = /\/parks\/([^\/]+)/.exec(path);
        
        if (parkMatch && parkMatch[1]) {
          const dir = parkMatch[1];
          setParkDir(dir);
          
          // Get display name from mapping or generate from directory name
          const displayName = parkNames[dir] || 
            dir.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
          
          setParkName(displayName);
        } else {
          console.error('Could not extract park name from path:', path);
          setError('Invalid park URL - could not determine park name');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error extracting park from URL:', error);
        setError('Error processing park URL');
        setLoading(false);
      }
    };
    
    extractParkFromUrl();
    
    // Handle browser navigation events
    window.addEventListener('popstate', extractParkFromUrl);
    
    return () => {
      window.removeEventListener('popstate', extractParkFromUrl);
    };
  }, []);

  // Load park image
  useEffect(() => {
    if (!parkName) return;
    
    const importImage = async () => {
      try {
        // Import images directly from the public folder which is served at root
        const module = await import(`../public/images/${parkName}.jpg`);
        setImgSrc(module.default);
      } catch (error) {
        console.error(`Image import failed for ${parkName}:`, error);
        // Don't set error state here, just log it - we still want to show the review even if image fails
      }
    };

    importImage();
  }, [parkName]);

  // Load review from reviews folder - with improved path handling
  useEffect(() => {
    if (!parkDir) return;
    
    const fetchReview = async () => {
      // Define all the possible paths to try in order
      const pathsToTry = [
        `/parks/reviews/${parkDir}.md`,           // relative to root
      ];
      
      let reviewContent = null;
      let fetchError = null;
      
      // Try each path until we find one that works
      for (const path of pathsToTry) {
        try {
          const response = await fetch(path);
          
          if (response.ok) {
            reviewContent = await response.text();
            break;
          } else {
            console.log(`Failed to fetch from ${path}: ${response.status}`);
          }
        } catch (error) {
          console.log(`Error fetching from ${path}:`, error.message);
          fetchError = error;
        }
      }
      
      // If we found a review, set it in state
      if (reviewContent) {
        setReview(reviewContent);
        setError(null);
      } else {
        console.error(`All paths failed for ${parkDir}:`, fetchError);
        setError(`Could not load review for ${parkName || parkDir}. Please check the review file exists.`);
      }
      
      setLoading(false);
    };

    fetchReview();
  }, [parkDir, parkName]);

  const components = {
    h1: ({ children }) => <SectionHeader>{children}</SectionHeader>,
    p: ({ children }) => <Paragraph>{children}</Paragraph>,
  };

  if (loading && !error) {
    return (
      <Essentials>
        <PageTitle title="Loading Park..." />
        <MainTextDiv>
          <div>Loading {parkName || parkDir || 'park'} review...</div>
        </MainTextDiv>
      </Essentials>
    );
  }

  if (error && !review) {
    return (
      <Essentials>
        <PageTitle title="Error Loading Park" />
        <MainTextDiv>
          <div className="error-message">{error}</div>
          <div>
            <p>Park details:</p>
            <ul>
              <li>Directory name: {parkDir || 'unknown'}</li>
              <li>Display name: {parkName || 'unknown'}</li>
            </ul>
          </div>
        </MainTextDiv>
      </Essentials>
    );
  }
  console.log(parkName);
  return (
    <Essentials>
      <PageTitle title={parkName} />
      <MainTextDiv>
        {imgSrc && <ImageHeader imageLink={imgSrc} headerText={`${parkName} Review`} />}
        {!imgSrc && <h1 className="text-center my-4">{parkName} Review</h1>}
        <div>
          <ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>
            {review}
          </ReactMarkdown>
        </div>
      </MainTextDiv>
    </Essentials>
  );
} 