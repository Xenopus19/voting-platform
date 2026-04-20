import type { VoteBase } from "@/types";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface VoteCardProps {
  vote: VoteBase;
}

const VoteCard = ({ vote }: VoteCardProps) => {
  const navigate = useNavigate();
  const isExpired = new Date(vote.expirationDate) < new Date();

  const goToVotePage = () => {
    navigate(`/votes/${vote.id}`)
  }
  return (
    <div className="border-2 rounded-xl p-2 mb-2 mt-2">
      <div className="flex flex-row items-center justify-between ">
        <p className="font-bold text-l">{vote.title}</p>
        <Button onClick={goToVotePage}>Show</Button>
      </div>
      <p className="text-xs">
        Vote status: {isExpired ? "Finished" : "Ongoing"}
      </p>
    </div>
  );
};

export default VoteCard;
