"use client";
import HomeLayout from "@/views/dashboard/layout";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <HomeLayout children={children} />
    </section>
  );
}
