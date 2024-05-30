import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { useAppDispatch } from "@/app/store";
import { setCredentials } from "@/features/auth/authSlice";
import { User } from "@/features/auth/interfaces";
import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, setIsPending] = useState(false);

  async function onSubmit(data: FormSchema) {
    setIsPending(true);

    try {
      const response = await axios.post<{ accessToken: string; user: User }>(
        "https://api-12dprsalajevs.kvalifikacija.rvt.lv/api/auth/login",
        data,
      );

      dispatch(setCredentials(response.data));

      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || error.message);
      }
    }

    setIsPending(false);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grow py-16">
          <Card className="mx-auto max-w-screen-sm">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>

              <CardDescription>
                Enter your email and password to login to your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>

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
                      <Input
                        type="password"
                        placeholder="••••••••••"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button disabled={isPending}>Login</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Footer />
    </div>
  );
}
