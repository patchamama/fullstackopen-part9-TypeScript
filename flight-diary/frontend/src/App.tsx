import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './components/Header';
import { Diaries } from './types';
import Entry from './components/Entry';

function App() {
  const [diaries, setDiaries] = useState<Diaries[]>([]);
  useEffect(() => {
    // fetch('http://localhost:3000/api/diaries')
    axios
      .get<Diaries[]>('http://localhost:3000/api/diaries')
      .then((response) => console.log(setDiaries(response.data)));
  }, []);

  return (
    <>
      <Header text='Add new entry' />
      <Header text='Diary entries' />

      {diaries.map((diary) => (
        <Entry key={diary.id} diary={diary} />
      ))}
    </>
  );
}

export default App;
