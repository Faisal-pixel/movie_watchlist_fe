"use client"
import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { CreateWatchlistValidationSchema } from "@/validation/forms-schema";
import { Textarea } from "@/components/ui/textarea"

type Props = {};

const CreateWatchlist = (props: Props) => {
  const form = useForm<z.infer<typeof CreateWatchlistValidationSchema>>({
    resolver: zodResolver(CreateWatchlistValidationSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof CreateWatchlistValidationSchema>
  ) => {
    console.log(values);
  };
  return (
    <div className="pl-[1.4375rem] pr-[4.1875rem] py-[3.125rem] bg-mainBackground h-screen text-text-default">
      <p className="text-3xl">Create a new Watchlist</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-[3.125rem]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Batman movies..." {...field} />
                </FormControl>
                <FormDescription className="!mb-[1.875rem]">
                  This is the name of your watchlist.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="h-[7.875rem] resize-none" placeholder="Description" {...field} />
                </FormControl>
                <FormDescription className="!mb-[1.875rem]">
                  This is the description of your watchlist.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-[#F33F3F] text-[#141414] font-bold text-[16px] text-center py-[11px] px-[56px] cursor-pointer hover:bg-[#141414] hover:text-text-default">
            Create watchlist
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateWatchlist;
