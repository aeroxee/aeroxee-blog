"use client";

import { deleteArticle } from "@/lib/articles";
import { Eraser, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

type ArticleDeleteActionProps = {
  delete_title: string;
  delete_description: string;
  alert_success_delete: string;
  alert_error_delete: string;
  title: string;
  delete: string;
  cancel: string;
  id: string;
};

export default function ArticleDeleteAction(props: ArticleDeleteActionProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    const ok = await deleteArticle(id);
    if (ok) {
      setIsLoading(false);
      toast({
        title: "Status!",
        description: props.alert_success_delete,
      });
      setOpen(false);
      router.refresh();
    } else {
      setIsLoading(false);
      toast({
        title: "Status!",
        description: props.alert_error_delete,
        variant: "destructive",
      });
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex items-center gap-1"
          onClick={() => setOpen(true)}
        >
          <Eraser size={20} />
          {props.title}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.delete_title}</AlertDialogTitle>
          <AlertDialogDescription>
            {props.delete_description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            {props.cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(props.id)}
            className="flex items-center gap-1"
          >
            {isLoading && <Loader2 size={20} className="animate-spin" />}
            {props.delete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
