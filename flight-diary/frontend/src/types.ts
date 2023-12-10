export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Windy = 'windy',
  Stormy = 'stormy',
  Snowy = 'snowy',
  Cloudy = 'cloudy',
}

export enum Visibility {
  Excellent = 'excellent',
  Good = 'good',
  Average = 'average',
  Poor = 'poor',
  VeryPoor = 'very poor',
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
