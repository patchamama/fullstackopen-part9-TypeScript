enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Windy = 'windy',
  Stormy = 'stormy',
  Snowy = 'snowy',
  Cloudy = 'cloudy',
}

enum Visibility {
  Excellent = 'excellent',
  Good = 'good',
  Average = 'average',
  Poor = 'poor',
  VeryPoor = 'very poor',
}

export interface Diaries {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}
