"use client";

import EncodeBase64Image from "@/lib/encode-base64-image";
import { User } from "@/lib/types/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import Link from "next/link";
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
}

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  username: z.string().min(1, { message: "Username is required." }),
  email: z.string().min(1, { message: "Email is required." }),
  bio: z.string().min(1, { message: "Bio is required." }),
});

export default function FormUpdateUser({ user }: FormUpdateUserProps) {
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      bio: user.bio ? user.bio : "",
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
      const encode = await EncodeBase64Image(avatar);
      formData.append("avatar", encode);
    }
    formData.append("bio", values.bio);

    const response = await fetch(
      `${process.env.URL}/api/users?id=${user._id}`,
      {
        method: "PUT",
        // headers: { "Content-Type": "application/json" },
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      setIsLoading(false);
      toast({
        title: "Status!",
        description: data.message,
      });
      router.refresh();
      return;
    } else {
      setIsLoading(false);
      toast({
        title: "Status!",
        description: data.message,
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
              <FormLabel>First name</FormLabel>
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
              <FormLabel>Last name</FormLabel>
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
              <FormLabel>Username</FormLabel>
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
              <FormLabel>Email</FormLabel>
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
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Avatar</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/jpg"
              onChange={handleFileChange}
            />
          </FormControl>
          <FormDescription>
            <Link
              href={`data:image/png;base64,${user.avatar}`}
              target="_blank"
              className="text-xs text-sky-600 font-light"
            >
              Your current avatar
            </Link>
          </FormDescription>
          <FormMessage />
        </FormItem>

        <Button type="submit" className="flex items-center gap-1">
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Pencil size={20} />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
}
