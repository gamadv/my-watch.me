import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { MovieCard } from './MovieCard';

import { api } from '../services/api';

import '../styles/content.scss';

type MovieProps = {
  imdbID: string;
  Title: string;
  Poster: string;
  Runtime: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
};

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

type ContentProps = {
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
};

export function Content(props: ContentProps) {
  // Complete aqui
  const { selectedGenreId, selectedGenre } = props;
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    if (!selectedGenreId) return;
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });
  }, [selectedGenreId]);

  return (
    <div className="container">
      <Header title={selectedGenre.title} />

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
