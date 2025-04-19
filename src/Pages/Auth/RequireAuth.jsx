import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate, useLocation } from 'react-router'

const RequireAuth = ({children}) => {
    const {token} = useContext(AuthContext)
    const location = useLocation()
    console.log(token)
  return token ? children : <Navigate state={{from:location}} to='/login' replace />

}

export default RequireAuth