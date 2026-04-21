import type { VoteCreationInfoType } from "@/components/create-vote";
import type { CanVoteResponse, VoteFull } from "@/types";
import api from "@/util/api";
import axios from "axios";

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
    console.error("Error checking voting for an option.", error);
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
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      return { canVote: false };
    }
    throw error;
  }
};
