import AuthenticateLayout from "@/Layouts/AuthenticateLayout";
import { Head, router } from "@inertiajs/react";

type Props = {};

const Home = (props: Props) => {
    return (
        <>
            <Head title="Home page" />
            <AuthenticateLayout>
              this is content
            </AuthenticateLayout>
        </>
    );
};

export default Home;
