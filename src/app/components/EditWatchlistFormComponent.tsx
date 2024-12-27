"use client";
import { EditWatchlistValidationSchema } from "@/validation/forms-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TWatchlist } from "@/types";
import { updateWatchlist } from "@/api/watchlist/api";
import { useToast } from "@/hooks/use-toast";

type Props = {
  data: TWatchlist;
};

const EditWatchlistFormComponent = ({
  data: { id, watchlist_name, description },
}: Props) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof EditWatchlistValidationSchema>>({
    resolver: zodResolver(EditWatchlistValidationSchema),
    defaultValues: {
      watchlist_name: watchlist_name,
      description: description || "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof EditWatchlistValidationSchema>
  ) => {
    console.log("Button clicked");
    // We first create an updatedFields object that will hold the final data we send as a request
    const updatedFields: Partial<
      z.infer<typeof EditWatchlistValidationSchema>
    > = {};
    // Then we need to check if the watchlist name is not equal to the values' watchlist_name, if it is true, then there is change
    // Then we add it to the updatedFields object

    if (values.watchlist_name !== watchlist_name) {
      // .getValues gets the current value of the field
      updatedFields.watchlist_name = values.watchlist_name;
    }

    if (values.description !== description) {
      updatedFields.description = values.description;
    }

    // Now we need to check if any of the updatedFields have changed. We can basically convert the keys into an array, if it is empty, it
    // is empty, it means no value was added to the updatedFields object. That means no change was made

    if (Object.keys(updatedFields).length === 0) {
      return toast({
        title: "No change was made",
      });
    }

    const response = await updateWatchlist(id as string, updatedFields);
    console.log(response);
    if (!response.success) {
      return toast({
        title: response.message,
      });
    }

    toast({
      title: response.message,
    });
    form.reset();
    window.location.reload();
  };
  return (
    <div className="text-text-default">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-[3.125rem]">
          <FormField
            control={form.control}
            name="watchlist_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!mb-[0.3125rem]">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Batman movies..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-[1.9rem]">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-[7.875rem] resize-none"
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-[#F33F3F] text-[#141414] font-bold text-[16px] text-center py-[11px] px-[56px] cursor-pointer mt-10 hover:bg-[#141414] hover:text-text-default"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditWatchlistFormComponent;
