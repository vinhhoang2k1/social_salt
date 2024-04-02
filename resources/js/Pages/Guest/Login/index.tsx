import GuestLayout from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/react'

type Props = {}

const index = (props: Props) => {
  
  return (
    <>
      <Head title="Login page" />
      <GuestLayout>
        welcome to login page
      </GuestLayout>
    </>
  )
}

export default index