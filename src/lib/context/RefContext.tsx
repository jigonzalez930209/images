import { createContext, useState } from 'react'

type RefContextProps = {
  refer: {
    id: string
    ref: React.MutableRefObject<HTMLInputElement>
  }[]
  addRef: (id: string, ref: React.MutableRefObject<HTMLInputElement>) => void
  removeRef: (id: string) => void
  getRef: (id: string) => React.MutableRefObject<HTMLInputElement> | undefined
}

export const RefProvider = ({ children }: { children: React.ReactNode }) => {
  const [refer, setRefer] = useState<RefContextProps['refer']>([])

  const addRef = (id: string, ref: React.MutableRefObject<HTMLInputElement>) => {
    setRefer(refer =>
      refer.find(i => i.id === id) ? refer.map(i => (i.id === id ? { id, ref } : i)) : [...refer, { id, ref }]
    )
  }

  const removeRef = (id: string) => {
    setRefer(refer => refer.filter(ref => ref.id !== id))
  }

  const getRef = (id: string) => {
    return refer.find(ref => ref.id === id)?.ref
  }

  return (
    <RefContext.Provider
      value={{
        refer,
        addRef,
        removeRef,
        getRef,
      }}
    >
      {children}
    </RefContext.Provider>
  )
}

export const RefContext = createContext<RefContextProps>({} as RefContextProps)
