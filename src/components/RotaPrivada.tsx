import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../api/auth'

interface RotaPrivadaProps {
  children: ReactNode
}

export default function RotaPrivada({ children }: RotaPrivadaProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children
}
