export type Tracker = {
  id: string | undefined;
  userId: string | undefined; // Assuming userId is of type string
  title: string;
  description: string;
  rating: number;
  image: string;
  latitude: number;
  longitude: number;
};
