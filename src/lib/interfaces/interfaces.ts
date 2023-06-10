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
}

export type IPlatform = 'web' | 'desktop' | null

export interface IImage {
  id: number
  name: string
  image: Blob
}
