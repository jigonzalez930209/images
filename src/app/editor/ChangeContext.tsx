import * as React from 'react'
import { IImage } from 'src/lib/interfaces'

export interface IChangeContext {
  changeHistory: IImage[]
  currentImage?: IImage
  loading: boolean
  setLoading: (loading: boolean) => void
  setImage: (image: IImage) => void
  removeImage: (id: string) => void
  setCurrentImage: (image: IImage) => void
}

export const ChangeContext = React.createContext<IChangeContext>({} as IChangeContext)

export const ChangeProvider = ({ children }: { children: React.ReactNode }) => {
  const [changeHistory, setChangeHistory] = React.useState<IImage[]>([])
  const [currentImage, setCurrentImage] = React.useState<IImage>()
  const [loading, setLoading] = React.useState(false)

  const removeImage = (id: string) => {
    setChangeHistory((image) => image.filter((i) => i.id !== id))
  }

  const setImage = (newImage: IImage) =>
    setChangeHistory((prev) => (prev.length > 0 ? [...prev, newImage] : [newImage]))

  return (
    <ChangeContext.Provider
      value={{
        changeHistory,
        loading,
        setLoading,
        setImage,
        removeImage,
        currentImage,
        setCurrentImage,
      }}
    >
      {children}
    </ChangeContext.Provider>
  )
}
