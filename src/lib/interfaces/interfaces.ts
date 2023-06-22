type NotificationType = 'error' | 'warning' | 'success' | 'info' | null

export interface INotification {
  title: string
  content: string[]
  type: NotificationType
}

export interface IImagesState {
  notifications: INotification
  loading: boolean
  drawerOpen: boolean
  files: IImage[]
  platform: IPlatform
  selectedFile: IImage['id'][]
  progress: number
  columns: number
  imageDialog: IImage | null
}

export type IPlatform = 'web' | 'desktop' | null

export interface IImage {
  id: string
  name: string
  image: string
}

export type ImagesAcceptedTypes = '.png' | '.jpeg' | '.tiff' | '.bmp' | '.tif' | '.jpg'
