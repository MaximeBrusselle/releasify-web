import { artists } from "./artists";
import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/lib/utils";

const ArtistsPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Welcome to the ArtistsPage
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center">
        {artists.map((artist) => (
          <div key={artist.id} className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <img
                src={getImageUrl("artists", artist.profilePicture)}
                alt={artist.artistName}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <h2 className="mt-2 text-center font-bold">{artist.artistName}</h2>
            <div className="flex flex-wrap justify-center mt-1">
              {artist.genres.map((genre) => (
                <Badge key={genre.id} color={genre.group.color} className="mr-1 mb-1">
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistsPage;
