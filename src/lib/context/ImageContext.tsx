import * as React from 'react'
import { IImage, IImagesState, INotification, IPlatform } from '../interfaces'

export type ImagesContextProps = {
  imagesState: IImagesState
  setFiles: (files: IImage[]) => void
  setFile: (file: IImage) => void
  addFile: (file: IImage) => void
  addFiles: (files: IImage[]) => void
  setNotification: (notification: INotification) => void
  // setSelectedFile: (selectedFileType: IImage['id'][]) => void
  setDrawerOpen: (open: boolean) => void
  setPlatform: (platform: IPlatform) => void
  setProgress: (progress: number) => void
  setLoading: (loading: boolean) => void
  setColumns: (columns: number) => void
}

export const ImagesContext = React.createContext<ImagesContextProps>({} as ImagesContextProps)
