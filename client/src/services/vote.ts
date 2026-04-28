import type { VoteCreationInfoType } from "@/components/create-vote";
import { isServerError, type CanVoteResponse, type VoteFull } from "@/types";
import api from "@/util/api";

export const getVote = async (voteId: number): Promise<VoteFull> => {
  try {
    const response = await api.get<VoteFull>(`votes/${voteId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting vote", error);
    throw error;
  }
};

export const createVote = async (
  voteInfo: VoteCreationInfoType,
): Promise<VoteFull> => {
  try {
    const response = await api.post<VoteFull>(`votes`, voteInfo);
    return response.data;
  } catch (error) {
    console.error("Error getting vote", error);
    throw error;
  }
};

export const checkCanVoteByFingerprint = async (
  voteId: number,
  fingerprint: string,
) => {
  try {
    const response = await api.post<CanVoteResponse>(
      `votes/${voteId}/canVote`,
      { fingerprint },
    );
    return response.data;
  } catch (error) {
    console.error("Server returned error.", error);
    throw error;
  }
};

export const voteForOption = async (
  voteId: number,
  optionId: number,
  fingerprint: string,
) => {
  try {
    const response = await api.put(`votes/${voteId}`, {
      fingerprint,
      optionId,
    });
    return response.data;
  } catch (error: unknown) {
    if (isServerError(error)) {
      return { canVote: false };
    }
    throw error;
  }
};

export const deleteVote = async (voteId: number) => {
  try {
    await api.delete(`votes/${voteId}`);
  } catch (error) {
    console.log(error)
    throw error;
  }
}