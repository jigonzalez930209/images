import { IImage, IImagesState, INotification, IPlatform } from '../interfaces/interfaces'

type ImagesAction = {
  type:
    | 'setNotification'
    | 'setImagesState'
    | 'setPlatform'
    | 'setFiles'
    | 'setFile'
    | 'setDrawerOpen'
    | 'addFiles'
    | 'addFile'
    | 'setSelectedFile'

  payload: INotification | boolean | IPlatform | IImage | IImage[] | number | number[] | IImagesState
}

export const graftReducer = (state: IImagesState, action: ImagesAction): IImagesState => {
  switch (action.type) {
    case 'setNotification':
      return {
        ...state,
        notifications: action.payload as INotification,
      }
    case 'setFiles':
      return {
        ...state,
        files: action.payload as IImage[],
      }

    case 'setImagesState':
      return {
        ...state,
        ...(action.payload as IImagesState),
      }
    case 'setPlatform': {
      return {
        ...state,
        platform: action.payload as 'web' | 'desktop',
      }
    }
    case 'setFile': {
      const file = action.payload as IImage
      const files = state.files.map(f => (f.id === file.id ? file : f))
      return {
        ...state,
        files,
      }
    }
    case 'setDrawerOpen': {
      return {
        ...state,
        drawerOpen: action.payload as boolean,
      }
    }
    case 'addFiles': {
      const files = action.payload as IImage[]
      return {
        ...state,
        files: [...state.files, ...files],
      }
    }
    case 'addFile': {
      const file = action.payload as IImage
      return {
        ...state,
        files: [...state.files, file],
      }
    }
    case 'setSelectedFile': {
      const id = action.payload as number
      const files = state.files.map(f => ({ ...f, selected: f.id === id }))
      return {
        ...state,
        files,
      }
    }

    default:
      return state
  }
}
