
export interface Game {
  id: string;
  title: string;
  imageUrl: string;
  size: string;
  rating: number;
  devices: ('android' | 'ios')[];
  category: 'ACTION' | 'RACING' | 'OPEN WORLD' | 'SIMULATION' | 'SPORTS' | 'SANDBOX';
  description: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}
