import { getVote } from "@/services/vote";
import type { VoteFull } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VoteChart from "./vote-chart";

const VotePage = () => {
  const [vote, setVote] = useState<VoteFull>();
  const { id } = useParams<{ id: string }>();

  const voteId = id ? parseInt(id, 10) : NaN;

  useEffect(() => {
    const fetchVote = async () => {
      const response = await getVote(voteId);
      setVote(response)
    };

    if (isNaN(voteId)) {
      return;
    }
    fetchVote();
  }, [voteId]);

  if (isNaN(voteId)) {
    return <p>Not valid id (ID: {id})</p>;
  }
  if(!vote) return;
  return <>
  <p className="text-2xl font-extrabold">{vote?.title}</p>
  <VoteChart vote={vote}/>
  </>;
};

export default VotePage;
