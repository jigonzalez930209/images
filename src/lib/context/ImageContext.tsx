import * as React from 'react'
import { IImage, IImagesState, INotification, IPlatform } from '../interfaces'

export type ImagesContextProps = {
  imagesState: IImagesState
  setImages: (images: IImage[]) => void
  addImage: (image: IImage) => void
  addImages: (image: IImage[]) => void
  updateImage: (image: IImage) => void
  setImageView: (image: IImage) => void
  setImageEdit: (image: IImage) => void
  setNotification: (notification: INotification) => void
  // setSelectedFile: (selectedFileType: IImage['id'][]) => void
  setDrawerOpen: (open: boolean) => void
  setPlatform: (platform: IPlatform) => void
  setProgress: (progress: number) => void
  setLoading: (loading: boolean) => void
  setColumns: (columns: number) => void
}

export const ImagesContext = React.createContext<ImagesContextProps>({} as ImagesContextProps)
