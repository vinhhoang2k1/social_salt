import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import Flash from "../AppLayout/Partials/Flash";
import SideBarLeft from "./Partials/SideBarLeft";
import "./style.scss"
export default function AuthenticateLayout({ children }: PropsWithChildren) {
    const flash = usePage<PageProps>().props.flash;

    return (
        <>
            <div className="relative min-h-screen bg-center authenticate-layout">
                <SideBarLeft />
                <section className="px-2 main">{children}</section>
            </div>
            <div className="fixed print:hidden bottom-5 z-50 right-3">
                <Flash flash={flash} />
            </div>
        </>
    );
}
