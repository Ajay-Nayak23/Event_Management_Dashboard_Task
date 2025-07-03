export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  price: number;
  category: string;
  image: string;
  organizerId: string;
  organizerName: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'user';
  avatar?: string;
}

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  registeredAt: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}