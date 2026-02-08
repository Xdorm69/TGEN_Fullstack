"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/validator/auth";
import { FetchHandler } from "@/utils/fetch";
import { useAuth } from "@/context/auth-context";

type LoginSchema = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      setLoading(true);
      const response = await FetchHandler.post("/api/v1/auth/login", data);
      if (!response.success) {
        return toast.error(response.message);
      }
      setUser(response.data[0]);
      toast.success(response.message);
      router.push("/test");
    } catch (error: any) {
      toast.error(error?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="heading text-center">Login to TGEN</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              Login
            </Button>
          </form>
        </Form>

        <Link href="/signup" className="font-mono text-sm text-blue-500">
          Don't have an account? Sign up
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default LoginPage;
