import z from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(3, {
    message: "Username should be no less than 2 symbols.",
  }),
  password: z.string().min(6, {
    message: "Password should be no less than 6 symbols.",
  }),
});

export type SignUpInfoType = z.infer<typeof SignUpSchema>;
