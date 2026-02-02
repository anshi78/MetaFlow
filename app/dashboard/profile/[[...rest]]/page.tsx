// Profile.tsx
import { UserProfile, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import React from 'react'

function Profile() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-2xl mb-4'>Profile</h2>
      
      <SignedIn>
        {/* Only attempts to render if the user is verified */}
        <UserProfile routing="hash" />
      </SignedIn>

      <SignedOut>
        {/* Redirects to login if the session is missing */}
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}

export default Profile