import GuestLayout from "@/Layouts/GuestLayout";
import { Head, router } from "@inertiajs/react";
import "./style.scss";
import { AuthPageProps, ICreateUser } from "@/types";
import useBetterForm from "@/Utilities/useBetterForm";
import { FormEventHandler } from "react";
import { TLoginPayload } from "@/types/Auth/auth";
type Props = {};

const index = (
    props: AuthPageProps<{
        status?: string;
        canResetPassword: boolean;
    }>,
) => {
    const params = new URLSearchParams(window.location.search);
    const userForm = useBetterForm<TLoginPayload>({
        email: "vinh@gmail.com",
        password: "12345678",
    });
    console.log("userForm", userForm.data);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post("/login", {
            ...userForm.data,
        });
    };
    return (
        <>
            <Head title="Login page" />
            <GuestLayout>
                <form className="space-y-4" onSubmit={submit}>
                    <section>
                        <p className="text-center text-lg text-blue-gray-500">
                            Account Details
                        </p>
                        <button type="submit">submit</button>
                    </section>
                </form>
            </GuestLayout>
        </>
    );
};

export default index;
