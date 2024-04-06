import Container from "@/components/container";
import FormRegister from "@/components/form-register";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | aeroxee",
  description: "Register account aeroxee to free access make article.",
};

export default function Register() {
  return (
    <Container className="relative w-full min-w-full min-h-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[96%] lg:w-[60%]">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Register Account</CardTitle>
          </CardHeader>
          <CardContent>
            <FormRegister />
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
