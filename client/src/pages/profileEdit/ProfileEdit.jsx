import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './profileEdit.css'

export default function ProfileEdit() {

    const {user} = useContext(AuthContext)
  return (
    <div>Welcome {user.username}</div>

  )
}
