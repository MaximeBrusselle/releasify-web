import React from 'react';
import { useParams } from 'react-router-dom';
import ArtistComponent from './ArtistComponent';
import { ArtistDetail } from './types';
import { details } from './artistDetails';

const ArtistDetailPage = () => {
  const { artistId } = useParams<{ artistId: string }>();

  // Check if artistId exists before accessing details
  const artist: ArtistDetail | undefined = artistId ? details[artistId] : undefined;

  // If artistId doesn't exist or details[artistId] is undefined, handle the case accordingly
  if (!artistId || !artist) {
    return <div>No artist found for ID: {artistId}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Welcome to the ArtistDetail Page for artist with ID: {artistId}
      </h1>
      <ArtistComponent artist={artist} />
    </div>
  );
};

export default ArtistDetailPage;
