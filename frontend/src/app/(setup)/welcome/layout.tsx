import NavBar from "@/components/common/nav/NavBar";

type DashboardLayoutProps = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <NavBar userNav={false} />
      {children}
    </>
  );
}
