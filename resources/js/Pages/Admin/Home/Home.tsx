import AuthenticateLayout from "@/Layouts/AuthenticateAdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

type Props = {};

const Home = (props: Props) => {
    return (
        <>
            <Head title="Login page" />

            <AuthenticateLayout>
              this is contentn
            </AuthenticateLayout>
        </>
    );
};

export default Home;
