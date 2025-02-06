export interface CatImage {
  id: string;
  url: string;
  breeds: Breed[];
}

export interface Breed {
  id: string;
  name: string;
}

export interface BreedWithDetails extends Breed {
  image: CatImage;
  origin: string;
  temperament: string;
  description: string;
  // TODO: Add more details if needed
}

export type CacheKey = ['randomImages' | 'randomBreedImages', string?];
