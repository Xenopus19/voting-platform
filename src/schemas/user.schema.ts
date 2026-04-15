import { z } from 'zod';

export const CreateUserSchema = z.object({
    username: z.string().min(3, "Username should be not less than 3 symbols."),
    password: z.string().min(6, "Password should be not less than 6 symbols."),
});

export type NewUser = z.infer<typeof CreateUserSchema>;