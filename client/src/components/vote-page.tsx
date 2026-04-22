import { getVote, voteForOption } from "@/services/vote";
import type { VoteFull } from "@/types";
import { useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import VoteChart from "./vote-chart";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import useCanVote from "@/hooks/useCanVote";
import VoteForm from "./vote-form";

const VotePage = () => {
  const [vote, setVote] = useState<VoteFull>();
  const [fingerprint, setFingerprint] = useState("");

  const { id } = useParams<{ id: string }>();

  const voteId = id ? parseInt(id, 10) : NaN;
  const { canVote, checkCanVote } = useCanVote(voteId, fingerprint);

   const fetchVote = async () => {
      if (isNaN(voteId)) {
        return;
      }
      const response = await getVote(voteId);
      setVote(response);
    };
  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };

    fetchVote();
    getFingerprint();
  }, [voteId]);

  if (isNaN(voteId)) {
    return <p>Not valid id (ID: {id})</p>;
  }
  if (!vote) return;
  
  const getVoteStatus = (): ReactNode => {
    if(new Date(vote.expirationDate) < new Date()){
      return <p>The vote has already ended.</p>
    }
    else if(!canVote){
      return <p>You have already voted on this poll.</p>
    }
    else{
      return <p>This vote expires on: {new Date(vote.expirationDate).toLocaleDateString()}.</p>
    }
  }

  const makeVote = async (optionId: number) => {
    try {
      await voteForOption(voteId, optionId, fingerprint);
      checkCanVote();
      fetchVote();
    } catch (error) {}
  };
  return (
    <>
      <p className="mb-2 text-2xl font-extrabold">{vote?.title}</p>
      {getVoteStatus()}
      {canVote === true && <VoteForm options={vote.options} onSubmit={makeVote} />}
      <VoteChart vote={vote} />
    </>
  );
};

export default VotePage;
