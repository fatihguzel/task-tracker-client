import { APP_CONFIG } from "@/config/app-config";
import Login from "@/views/account/login";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_CONFIG.APP_NAME + " - Account Login",
  description: "Task Tracker",
};

export default function LoginPage() {
  return <Login />;
}
