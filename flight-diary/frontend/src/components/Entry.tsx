import { Diaries } from '../types';

const Entry = (props: { diary: Diaries }) => {
  return (
    <div>
      <h3>{props.diary.date}</h3>
      <p>visibility: {props.diary.visibility}</p>
      <p>whather: {props.diary.weather}</p>
      <p>
        comment: <i>{props.diary.comment}</i>
      </p>
    </div>
  );
};

export default Entry;
