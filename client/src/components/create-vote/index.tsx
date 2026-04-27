import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { createVote } from "@/services/vote";
import { useNavigate } from "react-router-dom";
import { useMessage } from "@/context/errorContext";

const CreateVoteSchema = z.object({
  title: z
    .string()
    .max(15, {
      message: "Vote title should be no more than 15 symbols.",
    })
    .min(3, {
      message: "Vote title should be no less than 3 symbols.",
    }),
  expirationDate: z.date(),
  options: z
    .array(
      z.object({
        text: z
          .string()
          .min(3, "Option should be more than 3 symbols.")
          .max(15, "Option should be no more than 15 symbols"),
      }),
    )
    .min(2, "Add at least 2 options"),
});

export type VoteCreationInfoType = z.infer<typeof CreateVoteSchema>;

const CreateVote = () => {
  const {setError, setFullMessage} = useMessage()
  const navigate = useNavigate();
  const form = useForm<VoteCreationInfoType>({
    resolver: zodResolver(CreateVoteSchema),
    defaultValues: {
      title: "My Vote Title",
      expirationDate: new Date(Date.now() + 86400000),
      options: [{ text: "" }, { text: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const submit = async (data: VoteCreationInfoType) => {
    try{
      await createVote(data);
      setFullMessage('Vote created successfully.', false, "Send link found on it's page to your voters.")
      navigate('/user-page');
    }
    catch(error){
      setError(error)
    }
  };
  return (
    <div>
      <p className="text-2xl font-extrabold">Create Vote</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <div className="mt-3 mb-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vote title</FormLabel>
                  <FormControl>
                    <Input placeholder="Vote title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <div className="mt-3 mb-3">
            <FormField
              control={form.control}
              name="expirationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}                        
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <FormLabel>Vote options:</FormLabel>
          <div>
            {fields.map((op, index) => (
              <div key={op.id} className="mb-3 mt-3 border-2 p-2 rounded-xl">
                <FormField
                  control={form.control}
                  name={`options.${index}.text`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Option {index + 1}</FormLabel>
                      <FormControl>
                        <Input placeholder={`Option ${index + 1}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <Button
                  className="mt-2"
                  variant="outline"
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                append({ text: "" });
              }}
              type="button"
            >
              Add option
            </Button>
          </div>

          <div className="flex justify-center w-full mt-6">
            <Button className="px-5 py-6 text-xl" type="submit">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateVote;
