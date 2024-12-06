"use client";
import React, { useContext } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SigninValidationSchema } from "@/validation/forms-schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { loginUser } from "@/api/api";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

// type Props = {}

const LogIn = () => {
  const router = useRouter();
  const { checkAuthUser } = useContext(AuthContext);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof SigninValidationSchema>>({
    resolver: zodResolver(SigninValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

  const onSubmit = async (values: z.infer<typeof SigninValidationSchema>) => {
    try {
      const session = await loginUser(values.email, values.password); // {success, token, message}
      if (!session) {
        // Get the token, pass into the setCookie function as authToken
        return toast({
          title: "Sign in failed. Please try again",
        });
      }

      const isLoggedin = await checkAuthUser();

      if (isLoggedin) {
        toast({
          title: "Sign in successful",
        });
        form.reset();
        router.push("/");
      } else {
        return toast({
          title: "Sign in failed. Please try again",
        });
      }
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  };
  return (
    <div className="general-background md:py-8 px-8 pt-24 pb-8 h-full bg-[#060505e8] hide-scrollbar overflow-y-auto">
      <h2 className="text-2xl md:text-3xl heading-text-color">
        Hello! <br />
        Please log in or create an account <br /> to use the features of this
        app
      </h2>

      <div className="pt-[6.4375rem] pb-[15.5rem]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-[21.9375rem]"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">
                    Email<span>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="form-input mb-0"
                      placeholder="Email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="!mb-5">
                    This is your email connected to yur account.
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
                  <FormLabel className="form-label">
                    Password<span>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="form-input"
                      placeholder="Email"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                className="bg-[#F33F3F] px-[6.1875rem] py-[0.65rem] text-lg font-bold text-[#141414] hover:text-[#E1E1E1] mx-auto hover:border hover:border-[#E1E1E1] mb-[1.5625rem]"
              >
                Log in
              </Button>
            </div>
            <div className="w-full flex justify-center">
              <p className="text-lg font-bold text-white">
                or{" "}
                <span className="underline text-[#F33F3F] cursor-pointer">
                  <Link href={"/signup"}>create an account</Link>
                </span>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LogIn;
