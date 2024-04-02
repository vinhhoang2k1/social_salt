import { PropsWithChildren } from "react";
import AppLayout from "../AppLayout";


export default function GuestLayout({
  children,
}: PropsWithChildren) {
  return (
    <AppLayout>
      <div className="selection:bg-red-500 selection:text-white">
        <main>{children}</main>
      </div>
    </AppLayout>
  );
}
