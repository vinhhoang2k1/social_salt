import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import "./style.scss";
import { AuthPageProps } from "@/types";
type Props = {};

const index = (
    props: AuthPageProps<{
        status?: string;
        canResetPassword: boolean;
    }>,
) => {

    return (
        <>
            <Head title="Login page" />
            <GuestLayout>
                <section className="form-login">welcome to login page</section>
            </GuestLayout>
        </>
    );
};

export default index;
