import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SignUpSchema = z.object({
  username: z.string().min(3, {
    message: "Username should be no less than 2 symbols.",
  }),
  password: z.string().min(6, {
    message: "Password should be no less than 6 symbols.",
  }),
});

export type SignUpInfoType = z.infer<typeof SignUpSchema>;

interface SignUpFormProps {
  onSubmit: (data: SignUpInfoType) => void;
}

const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const form = useForm<SignUpInfoType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const submit = async (data: SignUpInfoType) => {
    onSubmit(data);
  };

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="space-y-8 w-full max-w-md"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                  Username used for login and shown to others.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
