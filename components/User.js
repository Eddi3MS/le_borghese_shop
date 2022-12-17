import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'
import styled from 'styled-components'
import { UserCircle } from 'phosphor-react'

export default function User() {
  const route = useRouter()
  const { user, error, isLoading } = useUser()
  if (!user)
    return (
      <div onClick={() => route.push(`/api/auth/login`)}>
        <UserCircle size={32} />
        <h3>Login</h3>
      </div>
    )
  return (
    <Profile onClick={() => route.push(`/profile`)}>
      <img src={user.picture} alt={user.name} />
      <h3>{user.name}</h3>
    </Profile>
  )
}

const Profile = styled.div`
  img {
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
  }
`
