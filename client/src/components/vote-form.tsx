import type { Option } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { useState } from "react";

interface VoteFormProps {
  onSubmit: (voteId: number) => void;
  options: Option[];
}

const VoteForm = ({ onSubmit, options }: VoteFormProps) => {
    const [optionId, setOptionId] = useState(String(options[0].id));
  return (
    <div className="flex flex-col gap-2 mt-2">
      <Select onValueChange={setOptionId} value={optionId}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(o => <SelectItem key={o.id} value={String(o.id)}>{o.text}</SelectItem>)}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={() => onSubmit(Number(optionId))}>Vote</Button>
    </div>
  );
};

export default VoteForm;
