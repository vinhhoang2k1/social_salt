import { PropsWithChildren } from "react";
import AppLayout from "../AppLayout";
import "./styles.scss"

export default function GuestLayout({
  children,
}: PropsWithChildren) {
  return (
    <AppLayout>
      <div className="guest-layout min-h-screen ">
        <main>{children}</main>
      </div>
    </AppLayout>
  );
}
