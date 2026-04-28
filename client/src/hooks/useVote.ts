import { getVote } from "@/services/vote";
import type { VoteFull } from "@/types";
import { useCallback, useEffect, useState } from "react";

const useVote = (voteId: number) => {
  const [vote, setVote] = useState<VoteFull>();
  const [isVoteLoading, setIsVoteLoading] = useState(false);

  const fetchVote = useCallback(async () => {
    if (isNaN(voteId)) return;

    setIsVoteLoading(true);
    try {
      const response = await getVote(voteId);
      setVote(response);
    } catch (error) {
      console.error("Failed to fetch vote:", error);
    } finally {
      setIsVoteLoading(false);
    }
  }, [voteId]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (isNaN(voteId)) return;

      setIsVoteLoading(true);
      const response = await getVote(voteId);

      if (isMounted) {
        setVote(response);
        setIsVoteLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false; 
    };
  }, [voteId]);

  return { vote, isVoteLoading, fetchVote };
};

export default useVote;
