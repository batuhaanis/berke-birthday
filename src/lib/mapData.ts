export interface City {
  id: string;
  name: string;
  lat: number;
  lng: number;
  isCorrect: boolean;
  emoji: string;
}

export const cities: City[] = [
  {
    id: "tekirdag",
    name: "Tekirdağ",
    lat: 41.0015,
    lng: 27.5117,
    isCorrect: true,
    emoji: "✨",
  },
  {
    id: "istanbul",
    name: "İstanbul",
    lat: 41.0082,
    lng: 28.9784,
    isCorrect: false,
    emoji: "🌆",
  },
  {
    id: "bursa",
    name: "Bursa",
    lat: 40.1826,
    lng: 29.0665,
    isCorrect: false,
    emoji: "🏔️",
  },
  {
    id: "shumen",
    name: "Shumen",
    lat: 43.2712,
    lng: 26.9229,
    isCorrect: false,
    emoji: "🏰",
  },
];

export const correctCityId = "tekirdag";
