export interface User {
  id: number;
  username: string;
  votes: VoteBase[];
}

export interface VoteBase {
  id: number;
  title: string;
  expirationDate: Date;
  userId: number;
}

export interface VoteFull extends VoteBase {
  options: Option[]; 
  user?: {
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Option{
    id: number, 
    text: string,
    votersAmount: number
}
