'use client'

import { useTypedSelector } from 'src/store'

export const useAuth = () => useTypedSelector(s => s.auth)
