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
            type='text'
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
            type='text'
            name='visibility'
            value={newDiary?.visibility}
            onChange={(event) =>
              setNewDiary({ ...newDiary, visibility: event?.target.value })
            }
          />
        </label>
        <br />
        <label>
          Weather:
          <input
            type='text'
            name='weather'
            value={newDiary?.weather}
            onChange={(event) =>
              setNewDiary({ ...newDiary, weather: event?.target.value })
            }
          />
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
        <input type='submit' value='Submit' />
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
