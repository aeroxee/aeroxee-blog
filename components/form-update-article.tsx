"use client";

import { type Article } from "@/lib/types/articles";
import { type Category } from "@/lib/types/category";
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

type FormUpdateProps = {
  categories: Category[];
  article: Article;
  select_category: string;
  title: string;
  title_placeholder: string;
  content: string;
  content_placeholder: string;
  select_status: string;
  published: string;
  drafted: string;
  // edit: string;
  cancel: string;
  alert_success_update: string;
  alert_error_update: string;
  required: string;
  max_title: string;
};

export default function FormUpdateArticle(props: FormUpdateProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>(props.article.categoryId);
  const [status, setStatus] = useState<string>(props.article.status);

  const { toast } = useToast();

  const router = useRouter();

  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: props.required })
      .max(30, { message: props.max_title }),
    content: z.string().min(1, { message: props.required }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.article.title,
      content: props.article.content,
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

    try {
      const response = await fetch(
        `${process.env.URL}/api/articles/${props.article._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            categoryId: category,
            title: values.title,
            content: values.content,
            status: status,
          }),
        }
      );

      if (response.ok) {
        setIsLoading(false);
        toast({
          title: "Status",
          description: props.alert_success_update,
        });
        form.reset();
        closeButton.click();
        router.refresh();
        return;
      } else {
        setIsLoading(false);
        toast({
          title: "Status",
          description: props.alert_error_update,
          variant: "destructive",
        });
        closeButton.click();
        router.refresh();
        return;
      }
    } catch {
      setIsLoading(false);
      toast({
        title: "Status",
        description: props.alert_error_update,
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
          <Select
            onValueChange={(e) => setCategory(e)}
            defaultValue={props.article.categoryId}
            required
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder={props.select_category} />
            </SelectTrigger>
            <SelectContent>
              {props.categories.map((category: Category, index: number) => (
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
                <FormLabel>{props.title}</FormLabel>
                <FormControl>
                  <Input placeholder={props.title_placeholder} {...field} />
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
                <FormLabel>{props.content}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={props.content_placeholder}
                    rows={20}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Select
            onValueChange={(e) => setStatus(e)}
            defaultValue={props.article.status}
            required
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder={props.select_status} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFTED" defaultChecked>
                {props.drafted}
              </SelectItem>
              <SelectItem value="PUBLISHED">{props.published}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <AlertDialogFooter className="mt-32 md:mt-5">
          <AlertDialogCancel id="close-button">
            {props.cancel}
          </AlertDialogCancel>
          <Button type="submit" className="flex items-center gap-1">
            {isLoading && <Loader2 size={20} className="animate-spin" />}
            Edit
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}
