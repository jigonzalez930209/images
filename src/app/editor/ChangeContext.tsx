import * as React from "react"
import { IImage } from "src/lib/interfaces"

export interface IChangeContext {
  changeHistory: IImage[]
  currentImage?: IImage
  setImage: (image: IImage) => void
  removeImage: (id: string) => void
  setCurrentImage: (image: IImage) => void
}

export const ChangeContext = React.createContext<IChangeContext>({} as IChangeContext)

export const ChangeProvider = ({ children }: { children: React.ReactNode }) => {
  const [changeHistory, setChangeHistory] = React.useState<IImage[]>([])
  const [currentImage, setCurrentImage] = React.useState<IImage>()

  const removeImage = (id: string) => {
    setChangeHistory(image => image.filter(i => i.id !== id))
  }

  const setImage = (newImage: IImage) => setChangeHistory((prev) => ([...prev, newImage]))

  return (
    <ChangeContext.Provider
      value={{
        changeHistory,
        setImage,
        removeImage,
        currentImage,
        setCurrentImage
      }}
    >
      {children}
    </ChangeContext.Provider>
  )
}