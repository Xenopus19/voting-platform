import type { VoteCreationInfoType } from "@/components/create-vote";
import type { VoteFull } from "@/types";
import api from "@/util/api"

export const getVote = async (voteId: number) : Promise<VoteFull> => {
    try {
        const response = await api.get<VoteFull>(`votes/${voteId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting vote", error);
        throw error;
    }
}

export const createVote = async (voteInfo: VoteCreationInfoType) : Promise<VoteFull> => {
    try {
        const response = await api.post<VoteFull>(`votes`, voteInfo);
        return response.data;
    } catch (error) {
        console.error("Error getting vote", error);
        throw error;
    }
}