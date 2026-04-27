import { deleteVote, voteForOption } from "@/services/vote";
import { type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VoteChart from "./vote-chart";
import useCanVote from "@/hooks/useCanVote";
import VoteForm from "./vote-form";
import { useUser } from "@/context/userContext";
import { Button } from "./ui/button";
import CopyLink from "./copy-link";
import { useMessage } from "@/context/errorContext";
import useVote from "@/hooks/useVote";
import useFingerprint from "@/hooks/useFingerprint";

const VotePage = () => {
  const { fingerprint } = useFingerprint();
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const { setError, setFullMessage } = useMessage();

  const { id } = useParams<{ id: string }>();

  const voteId = id ? parseInt(id, 10) : NaN;

  const { canVote, checkCanVote } = useCanVote(voteId, fingerprint);
  const { vote, isVoteLoading, fetchVote } = useVote(voteId);

  if (isNaN(voteId)) {
    return <p>Not valid id (ID: {id})</p>;
  }
  if (isLoading || (isVoteLoading && !vote)) {
    return <p>Loading...</p>;
  }
  if (!vote) {
    navigate("/");
    return;
  }

  const isExpired = new Date(vote.expirationDate) < new Date();
  const isOwnedByCurrentUser = vote.userId === user?.id;

  const getVoteStatus = (): ReactNode => {
    if (isExpired) {
      return <p>The vote has already ended.</p>;
    } else if (!canVote) {
      return <p>You have already voted on this poll.</p>;
    }
  };

  const makeVote = async (optionId: number) => {
    try {
      await voteForOption(voteId, optionId, fingerprint);
      setFullMessage(
        "Your vote was successfully applied.",
        false,
        "Thank you for voting.",
      );
      checkCanVote();
      fetchVote();
    } catch (error) {
      setError(error);
    }
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
        {isOwnedByCurrentUser && (
          <Button onClick={sendDelete} variant="destructive">
            Delete Vote
          </Button>
        )}
      </div>
      <p className="text-xs text-accent-foreground">
        This vote expires on:{" "}
        {new Date(vote.expirationDate).toLocaleDateString()}.
      </p>
      {isOwnedByCurrentUser && !isExpired && <CopyLink />}
      {getVoteStatus()}
      {canVote === true && (
        <VoteForm options={vote.options} onSubmit={makeVote} />
      )}
      <VoteChart vote={vote} />
    </>
  );
};

export default VotePage;
