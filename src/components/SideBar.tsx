import { useEffect, useState } from 'react';
import { Button } from './Button';
import '../styles/SideBar.scss';
import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

type SideBarProps = {
  genreSelected: number;
  handleClickButton: (id: number) => void;
};

export function SideBar(props: SideBarProps) {
  // Complete aqui
  const { genreSelected, handleClickButton } = props;
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={genreSelected === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
