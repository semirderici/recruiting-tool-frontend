import { SidebarLayout } from "@/components/SidebarLayout";

export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}


