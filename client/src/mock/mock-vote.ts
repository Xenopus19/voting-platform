import type { VoteFull } from "@/types";

export const MOCK_VOTE: VoteFull = {
  id: 101,
  title: "What film genre do you prefer?",
  expirationDate: new Date("2026-05-20T18:00:00Z"),
  userId: 45,
  options: [
    { id: 1, text: "Horror", votersAmount: 156 },
    { id: 2, text: "Fantasy", votersAmount: 89 },
    { id: 3, text: "Sci-Fi", votersAmount: 144 },
    { id: 4, text: "Drama", votersAmount: 56 }
  ],
  createdAt: "2026-04-01T10:30:00Z",
  updatedAt: "2026-04-15T14:20:00Z"
};

export const DRINK_VOTE_MOCK: VoteFull = {
  id: 102,
  title: "What is your favorite beverage?",
  expirationDate: new Date("2026-06-15T12:00:00Z"),
  userId: 45,
  options: [
    { id: 1, text: "Coffee", votersAmount: 245 },
    { id: 2, text: "Tea", votersAmount: 182 },
    { id: 3, text: "Fresh Juice", votersAmount: 94 },
    { id: 4, text: "Smoothie", votersAmount: 67 },
    { id: 5, text: "Water", votersAmount: 312 }
  ],
  createdAt: "2026-04-10T08:00:00Z",
  updatedAt: "2026-04-12T11:30:00Z"
};

export const WEATHER_VOTE_MOCK: VoteFull = {
  id: 103,
  title: "What kind of weather do you like most?",
  expirationDate: new Date("2026-07-01T20:00:00Z"),
  userId: 12,
  options: [
    { id: 1, text: "Sunny & Warm", votersAmount: 410 },
    { id: 2, text: "Rainy & Cozy", votersAmount: 156 },
    { id: 3, text: "Snowy & Cold", votersAmount: 89 },
    { id: 4, text: "Thunderstorm", votersAmount: 45 },
    { id: 5, text: "Cloudy & Breezy", votersAmount: 210 }
  ],
  createdAt: "2026-04-20T15:45:00Z",
  updatedAt: "2026-04-21T09:15:00Z"
};

const mocks = [MOCK_VOTE, WEATHER_VOTE_MOCK, DRINK_VOTE_MOCK];
export default mocks

export const randomMockVote = () => {
  return mocks[Math.floor(Math.random() * mocks.length)]
}