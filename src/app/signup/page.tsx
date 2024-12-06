"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupValidationSchema } from "@/validation/forms-schema";

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

// type Props = {}

const LogIn = () => {
  const form = useForm<z.infer<typeof SignupValidationSchema>>({
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignupValidationSchema>) => {
    console.log("values", values);
  }
  return (
    <div className="general-background md:py-8 px-8 pt-24 pb-8 h-full bg-[#060505e8] hide-scrollbar overflow-y-auto">
      <h2 className="text-2xl md:text-3xl heading-text-color">
        Hello! <br />
        Please Create an account <br /> to use the features of this
        app
      </h2>

      <div className="pt-[3rem] pb-[5.5rem]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-[21.9375rem]">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Firstname<span>*</span></FormLabel>
                  <FormControl>
                    <Input className="form-input" placeholder="Firstname" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Last name<span>*</span></FormLabel>
                  <FormControl>
                    <Input className="form-input" placeholder="Lastname" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Username<span>*</span></FormLabel>
                  <FormControl>
                    <Input className="username" placeholder="Username" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Email<span>*</span></FormLabel>
                  <FormControl>
                    <Input className="form-input" placeholder="Email" type="email" {...field} />
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
                  <FormLabel className="form-label">Password<span>*</span></FormLabel>
                  <FormControl>
                    <Input className="form-input" placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center">
            <Button type="submit" className="bg-[#F33F3F] px-[6.1875rem] py-[0.65rem] text-lg font-bold text-[#141414] hover:text-[#E1E1E1] mx-auto hover:border hover:border-[#E1E1E1] mb-[1.5625rem]">Create Profile</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LogIn;
