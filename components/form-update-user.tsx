"use client";

import EncodeBase64Image from "@/lib/encode-base64-image";
import { User } from "@/lib/types/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

interface FormUpdateUserProps {
  user: User;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio: string;
  max_bio: string;
  avatar: string;
  image_size: string;
  success: string;
  error: string;
  required: string;
  save: string;
  current_avatar: string;
}

export default function FormUpdateUser(props: FormUpdateUserProps) {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setAvatar(selectedFile);
    }
  };

  const formSchema = z.object({
    firstName: z.string().min(1, { message: props.required }),
    lastName: z.string().min(1, { message: props.required }),
    username: z.string().min(1, { message: props.required }),
    email: z.string().min(1, { message: props.required }),
    bio: z
      .string()
      .min(1, { message: props.required })
      .max(255, { message: props.max_bio }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      username: props.user.username,
      email: props.user.email,
      bio: props.user.bio ? props.user.bio : "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const formData = new FormData();

    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("username", values.username);
    formData.append("email", values.email);

    if (avatar) {
      // Only 3MB size image.
      const MAX_IMAGE_SIZE = 1;
      if (avatar.size > MAX_IMAGE_SIZE * 1024 * 1024) {
        toast({
          title: "Status!",
          description: props.image_size,
          variant: "destructive",
        });
        return;
      }

      const encode = await EncodeBase64Image(avatar);
      formData.append("avatar", encode);
    }
    formData.append("bio", values.bio);

    try {
      const response = await fetch(
        `${process.env.URL}/api/users?id=${props.user._id}`,
        {
          method: "PUT",
          // headers: { "Content-Type": "application/json" },
          body: formData,
        }
      );

      if (response.ok) {
        setIsLoading(false);
        toast({
          title: "Status!",
          description: props.success,
        });
        router.refresh();
        return;
      } else {
        setIsLoading(false);
        toast({
          title: "Status!",
          description: props.error,
          variant: "destructive",
        });
        router.refresh();
        return;
      }
    } catch {
      setIsLoading(false);
      toast({
        title: "Status!",
        description: props.error,
        variant: "destructive",
      });
      router.refresh();
      return;
    }
  };

  return (
    <Form {...form}>
      <form
        action=""
        method="PUT"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{props.firstName}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{props.lastName}</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>{props.username}</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>{props.email}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{props.bio}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>{props.avatar}</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/jpg"
              onChange={handleFileChange}
            />
          </FormControl>
          <FormDescription>
            <a
              href={`data:image/png;base64,${props.user.avatar}`}
              target="_blank"
              className="text-xs text-sky-600 font-light"
            >
              {props.current_avatar}
            </a>
          </FormDescription>
          <FormMessage />
        </FormItem>

        <Button type="submit" className="flex items-center gap-1">
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Pencil size={20} />
          )}
          {props.save}
        </Button>
      </form>
    </Form>
  );
}
