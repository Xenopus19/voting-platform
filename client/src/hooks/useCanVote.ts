import { checkCanVoteByFingerprint } from "@/services/vote";
import { useEffect, useState } from "react";

const useCanVote = (voteId: number, fingerprint: string) => {
  const [canVote, setCanVote] = useState(false);

  const checkCanVote = async () => {
    if (!fingerprint || isNaN(voteId)) {
      return;
    }
    try {
      const response = await checkCanVoteByFingerprint(voteId, fingerprint);
      setCanVote(response.canVote);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        setCanVote(false);
      } else {
        console.error("An unknown error occured", error);
      }
    }
  };

  useEffect(() => {
    checkCanVote();
  }, [voteId, fingerprint]);

  return { canVote, checkCanVote };
};

export default useCanVote;
