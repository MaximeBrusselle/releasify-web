import {details} from "./artistDetails";
import { useParams } from 'react-router-dom';

const ArtistDetailPage = () => {
  const { artistId } = useParams();
    return (
      <div>
        <h1 className="text-3xl font-bold underline">
          Welcome to the ArtistDetail Page for artist with ID: {artistId}
        </h1>
        {/* Content */}
      </div>
    );
  };
  
  export default ArtistDetailPage;