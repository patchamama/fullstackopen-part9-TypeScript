import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './components/Header';
import { Diaries, NewDiariesEntry } from './types';
import Entry from './components/Entry';
import { Notification } from './components/Notification';

function App() {
  const [diaries, setDiaries] = useState<Diaries[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // fetch('http://localhost:3000/api/diaries')
    axios
      .get<Diaries[]>('http://localhost:3000/api/diaries')
      .then((response) => console.log(setDiaries(response.data)));
  }, []);

  //---------
  interface ValidationError {
    message: string;
    errors: Record<string, string[]>;
  }

  const FormEntry = () => {
    const [newDiary, setNewDiary] = useState<NewDiariesEntry>({
      date: '',
      visibility: '',
      weather: '',
      comment: '',
    });
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(newDiary);
      axios
        .post<Diaries>('http://localhost:3000/api/diaries', newDiary)
        .then((response) => {
          setDiaries([...diaries, response.data]);
          setNewDiary({ date: '', visibility: '', weather: '', comment: '' });
        })
        .catch((error) => {
          if (
            axios.isAxiosError<ValidationError, Record<string, unknown>>(error)
          ) {
            console.log(error.status);
            console.error(error.response);

            setNotification(
              error.response?.data?.toString() || 'Sorry, an error occurred'
            );
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          } else {
            console.error(error);
          }
        });
    };

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type='date'
            name='date'
            value={newDiary?.date}
            onChange={(event) =>
              setNewDiary({ ...newDiary, date: event?.target.value })
            }
          />
        </label>
        <br />
        <label>
          Visibility:
          <input
            type='radio'
            id='great'
            name='visibility'
            value='great'
            onChange={(event) =>
              setNewDiary({ ...newDiary, visibility: event?.target.value })
            }
          />
          <label htmlFor='great'>great</label>
          <input
            type='radio'
            id='good'
            name='visibility'
            value='good'
            onChange={(event) =>
              setNewDiary({ ...newDiary, visibility: event?.target.value })
            }
          />
          <label htmlFor='good'>good</label>
          <input
            type='radio'
            name='visibility'
            id='ok'
            value='ok'
            onChange={(event) =>
              setNewDiary({ ...newDiary, visibility: event?.target.value })
            }
          />
          <label htmlFor='ok'>ok</label>
          <input
            type='radio'
            name='visibility'
            id='poor'
            value='poor'
            onChange={(event) =>
              setNewDiary({ ...newDiary, visibility: event?.target.value })
            }
          />
          <label htmlFor='poor'>poor</label>
        </label>
        <br />
        <label>
          Weather:
          <input
            type='radio'
            name='weather'
            id='sunny'
            value='sunny'
            onChange={(event) =>
              setNewDiary({ ...newDiary, weather: event?.target.value })
            }
          />
          <label htmlFor='sunny'>sunny</label>
          <input
            type='radio'
            name='weather'
            id='rainy'
            value='rainy'
            onChange={(event) =>
              setNewDiary({ ...newDiary, weather: event?.target.value })
            }
          />
          <label htmlFor='rainy'>rainy</label>
          <input
            type='radio'
            name='weather'
            id='cloudy'
            value='cloudy'
            onChange={(event) =>
              setNewDiary({ ...newDiary, weather: event?.target.value })
            }
          />
          <label htmlFor='cloudy'>cloudy</label>
          <input
            type='radio'
            name='weather'
            id='stormy'
            value='stormy'
            onChange={(event) =>
              setNewDiary({ ...newDiary, weather: event?.target.value })
            }
          />
          <label htmlFor='stormy'>stormy</label>
          <input
            type='radio'
            name='weather'
            id='windy'
            value='windy'
            onChange={(event) =>
              setNewDiary({ ...newDiary, weather: event?.target.value })
            }
          />
          <label htmlFor='windy'>windy</label>
        </label>
        <br />
        <label>
          Comment:
          <input
            type='text'
            name='comment'
            value={newDiary?.comment}
            onChange={(event) =>
              setNewDiary({ ...newDiary, comment: event?.target.value })
            }
          />
        </label>
        <br />
        <input type='submit' value='Add' />
      </form>
    );
  };

  return (
    <>
      <Header text='Add new entry' />

      <Notification message={notification} />
      <FormEntry />

      <Header text='Diary entries' />

      {diaries.map((diary) => (
        <Entry key={diary.id} diary={diary} />
      ))}
    </>
  );
}

export default App;
