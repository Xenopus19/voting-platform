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

export interface CanVoteResponse{
  canVote: boolean,
  message: string
}

export interface ServerErrorResponse {
  message: string;
  details?: string;
}

export const isServerError = (error: any): error is ServerErrorResponse => {
  return error && typeof error.message === 'string';
};
