import React, { createContext } from 'react'

interface BanterContext {
  messageData?: Array<Object>,
  isLoadingUser: boolean,
  setIsLoadingUser?: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  setUser: React.Dispatch<React.SetStateAction<string | null>> | null,
  searchQuery: string,
  user: string | null,
}

const initialContextValue: BanterContext = {
  user: null,
  searchQuery: '',
  setSearchQuery: () => {},
  setUser: null,
  isLoadingUser: false,
}

const AppContext = createContext<BanterContext>(initialContextValue)

export default AppContext
