import { deleteVote, getVote, voteForOption } from "@/services/vote";
import type { VoteFull } from "@/types";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VoteChart from "./vote-chart";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import useCanVote from "@/hooks/useCanVote";
import VoteForm from "./vote-form";
import { useUser } from "@/context/userContext";
import { Button } from "./ui/button";

const VotePage = () => {
  const [vote, setVote] = useState<VoteFull>();
  const [fingerprint, setFingerprint] = useState("");
  const { user, checkUser, isLoading } = useUser();
  const navigate = useNavigate();

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
    if (new Date(vote.expirationDate) < new Date()) {
      return <p>The vote has already ended.</p>;
    } else if (!canVote) {
      return <p>You have already voted on this poll.</p>;
    } else {
      return (
        <p>
          This vote expires on:{" "}
          {new Date(vote.expirationDate).toLocaleDateString()}.
        </p>
      );
    }
  };

  const makeVote = async (optionId: number) => {
    try {
      await voteForOption(voteId, optionId, fingerprint);
      checkCanVote();
      fetchVote();
    } catch (error) {}
  };

  const sendDelete = async () => {
    try {
      if (window.confirm(`Are you sure want to delete ${vote.title}?`)) {
        await deleteVote(vote.id);
        navigate("/user-page");
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="mb-2 text-2xl font-extrabold">{vote?.title}</p>
        {vote.userId === user?.id && (
          <Button onClick={sendDelete} variant="destructive">
            Delete Vote
          </Button>
        )}
      </div>
      {getVoteStatus()}
      {canVote === true && (
        <VoteForm options={vote.options} onSubmit={makeVote} />
      )}
      <VoteChart vote={vote} />
    </>
  );
};

export default VotePage;
