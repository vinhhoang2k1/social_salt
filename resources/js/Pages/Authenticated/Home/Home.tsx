import { router } from '@inertiajs/react'
import React from 'react'

type Props = {}

const Home = (props: Props) => {
  const handleLogout = (e) => {
    router.post('logout');
  }
  return (
    <div>
      <h1>hello home</h1>
      <button type="button" onClick={handleLogout}>
      handle logout
      </button>
    </div>
  )
}

export default Home