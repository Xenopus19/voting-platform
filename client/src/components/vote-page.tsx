import { getVote, voteForOption } from "@/services/vote";
import type { VoteFull } from "@/types";
import { useEffect, useState } from "react";
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
  console.log(canVote)

  const makeVote = async (optionId: number) => {
    try {
      await voteForOption(voteId, optionId, fingerprint);
      checkCanVote();
      fetchVote();
    } catch (error) {}
  };
  return (
    <>
      <p className="text-2xl font-extrabold">{vote?.title}</p>
      {canVote === true && <VoteForm options={vote.options} onSubmit={makeVote} />}
      <VoteChart vote={vote} />
    </>
  );
};

export default VotePage;
