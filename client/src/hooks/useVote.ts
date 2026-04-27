import { getVote } from "@/services/vote";
import type { VoteFull } from "@/types";
import { useEffect, useState } from "react";

const useVote = (voteId: number) => {
    const [vote, setVote] = useState<VoteFull>();
    const [isVoteLoading, setIsVoteLoading] = useState(false);

    const fetchVote = async () => {
    if (isNaN(voteId)) {
      return;
    }
    setIsVoteLoading(true);
    const response = await getVote(voteId);
    setVote(response);
    setIsVoteLoading(false);
  };

    useEffect(() => {
    fetchVote();
  }, [voteId]);

    return {vote, isVoteLoading, fetchVote}
}

export default useVote;