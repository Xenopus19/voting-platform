import { useUser } from "@/context/userContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VoteCard from "./vote-card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UserPage = () => {
  const { user, checkUser, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  if (!isLoading && !user) {
    navigate("/");
  }
  if (isLoading || !user) {
    return <p className="font-bold text-xl">Loading...</p>;
  }

  const goToCreateVote = () => {
    navigate('/create-vote')
  }

  return (
    <div>
      <p className="font-extrabold font-heading text-2xl mb-2">
        {user?.username}
      </p>
      <Separator />
      <div className="flex flex-row mt-2 items-center justify-between">
        <p className="font-bold text-l">My Votes:</p>
        <Button onClick={goToCreateVote}>Create new</Button>
      </div>

      <div className="m-2 p-2">
        {user.votes.map((v) => {
          return (
            <div key={v.title}>
              <VoteCard vote={v} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserPage;
