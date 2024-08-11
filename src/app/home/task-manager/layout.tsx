import { APP_CONFIG } from "@/config/app-config";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_CONFIG.APP_NAME + " - Task Manager",
  description: "Task Tracker",
};

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
