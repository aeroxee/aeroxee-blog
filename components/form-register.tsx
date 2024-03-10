"use client";

import { Link } from "@/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";

export default function FormRegister() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const formSchema = z
    .object({
      firstName: z.string().min(1, {
        message: "First name is required.",
      }),
      lastName: z.string().min(1, { message: "Last name is required" }),
      username: z
        .string()
        .min(5, {
          message: "Username must be at least 5 characters.",
        })
        .max(15, {
          message: "Username must be a maximum of 15 characters.",
        }),
      email: z
        .string()
        .email({
          message: "Please enter a valid email.",
        })
        .min(1, {
          message: "Email is required.",
        }),
      password1: z.string().min(1, { message: "Password is required." }),
      password2: z
        .string()
        .min(1, { message: "Password confirmation is required." }),
    })
    .required({
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      password1: true,
      password2: true,
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    if (values.password1 !== values.password2) {
      toast({
        title: "Password confirmation error",
        description: "Password confirmation not same.",
        action: <ToastAction altText="Ok">Ok</ToastAction>,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password2,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description:
            "Congratulation! Your account has been registered. Please login to login page..",
          action: <ToastAction altText="Ok">Ok</ToastAction>,
          variant: "default",
        });
        setIsLoading(false);
        return;
      } else {
        toast({
          title: "Register error",
          description: data.message,
          action: <ToastAction altText="Ok">Ok</ToastAction>,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    } catch {
      toast({
        title: "Server error",
        description: "Server error, please try again.",
        action: <ToastAction altText="Ok">Ok</ToastAction>,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
  };

  return (
    <Form {...form}>
      <form method="post" action="" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
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
                  <Input placeholder="Enter your last name" {...field} />
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
                  <Input placeholder="Enter your username" {...field} />
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
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password confirmation</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password confirmation"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1">
          <Button type="submit" className="flex items-center gap-1">
            {isLoading && <Loader2 size={20} className="animate-spin" />}
            Register
          </Button>
        </div>
        <Link href="/login" className="mt-2 text-xs font-extralight underline">
          Already have an account, login here.
        </Link>
      </form>
    </Form>
  );
}
