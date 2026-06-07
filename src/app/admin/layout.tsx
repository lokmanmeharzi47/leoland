import type { Metadata } from "next";
import AdminLayoutClient from "@/components/layout/AdminLayoutClient";

export const metadata: Metadata = {
  title: "LeoLand Admin",
  description: "Enterprise Console for LeoLand",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}
