"use client";

import { Category } from "@/lib/types/category";
import { User } from "@/lib/types/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AlertDialogCancel, AlertDialogFooter } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(50, { message: "Enter a title with only 50 characters" }),
  content: z.string().min(1, { message: "Content is required." }),
});

export default function FormInsertArticle({
  categories,
}: {
  categories: Category[];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "# Enter a content with markdown",
    },
  });

  const userCookies = getCookie("user");
  if (!userCookies) {
    window.location.href = "/login";
    return;
  }
  const user: User = JSON.parse(userCookies);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const closeButton: HTMLButtonElement | null =
      document.querySelector("#close-button");
    if (!closeButton) return;

    const response = await fetch(`${process.env.URL}/api/articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        categoryId: category,
        title: values.title,
        content: values.content,
        status: status,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsLoading(false);
      toast({
        title: "Status",
        description: `${data.message}`,
      });
      form.reset();
      closeButton.click();
      router.refresh();
      return;
    } else {
      setIsLoading(false);
      toast({
        title: "Status",
        description: data.message,
        variant: "destructive",
      });
      closeButton.click();
      router.refresh();
      return;
    }
  };

  return (
    <Form {...form}>
      <form action="" method="post" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-2">
          <Select onValueChange={(e) => setCategory(e)} required>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category: Category, index: number) => (
                <SelectItem key={index} value={category._id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please enter your content with markdown."
                    rows={20}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Select onValueChange={(e) => setStatus(e)} required>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFTED" defaultChecked>
                Draft
              </SelectItem>
              <SelectItem value="PUBLISHED">Publish</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <AlertDialogFooter className="mt-32 md:mt-5">
          <AlertDialogCancel id="close-button">Cancel</AlertDialogCancel>
          <Button type="submit" className="flex items-center gap-1">
            {isLoading && <Loader2 size={20} className="animate-spin" />}
            Save
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}
