export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface Diaries {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type NonSensitiveDiaries = Omit<Diaries, 'comment'>;
export type NewDiariesEntry = Omit<Diaries, 'id'>;
