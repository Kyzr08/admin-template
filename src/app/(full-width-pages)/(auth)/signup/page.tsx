import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrarse | KyzrUI",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
