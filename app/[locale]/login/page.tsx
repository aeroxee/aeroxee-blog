import Container from "@/components/container";
import FormLogin from "@/components/form-login";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/navigation";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | aeroxee",
  description: "Login account aeroxee to free access make article.",
  openGraph: {
    title: "Login | aeroxee",
    description: "Login account aeroxee to free access make article.",
    type: "website",
  },
};

export default function Login() {
  return (
    <Container className="relative w-full min-w-full min-h-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[96%] lg:w-[30%]">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Login Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-5 cursor-pointer">
              <Link href="/" passHref>
                <div className="flex items-center gap-3">
                  <ArrowLeft size={20} />
                  Back to home
                </div>
              </Link>
            </div>
            <FormLogin />
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
