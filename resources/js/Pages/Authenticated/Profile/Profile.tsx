import AuthenticateLayout from '@/Layouts/AuthenticateLayout';
import { IBasePropsPage } from '@/types/common/Common.type';
import { Head } from '@inertiajs/react';

type Props = {
    
} & IBasePropsPage<{}>

const Profile = (props: Props) => {
    return (
        <>
            <Head title="Home page" />
            <AuthenticateLayout>
              this is content
            </AuthenticateLayout>
        </>
    );
}

export default Profile