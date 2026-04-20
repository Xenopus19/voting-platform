import z from "zod";

export const CreateVoteSchema = z.object({
  title: z
    .string()
    .max(15, {
      message: "Vote title should be no more than 15 symbols.",
    })
    .min(3, {
      message: "Vote title should be no less than 3 symbols.",
    }),
  expirationDate: z.coerce.date(),
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
