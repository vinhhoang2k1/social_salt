import AuthenticateLayout from '@/Layouts/AuthenticateLayout';
import { Head } from '@inertiajs/react';
import React from 'react'

type Props = {}

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