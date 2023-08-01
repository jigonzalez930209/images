import { IImage, IImagesState, INotification, IPlatform } from '../interfaces/interfaces'

type ImagesAction = {
  type:
    | 'setImagesState'
    | 'setImages'
    | 'addImages'
    | 'addImage'
    | 'updateImage'
    | 'setImageView'
    | 'setImageEdit'
    | 'setNotification'
    | 'setPlatform'
    | 'setDrawerOpen'
    | 'setSelectedFile'
    | 'setProgress'
    | 'setLoading'
    | 'setColumns'

  payload:
    | INotification
    | boolean
    | IPlatform
    | IImage
    | IImage[]
    | number
    | number[]
    | IImagesState
    | null
}

export const imagesReducer = (state: IImagesState, action: ImagesAction): IImagesState => {
  switch (action.type) {
    case 'setNotification':
      return {
        ...state,
        notifications: action.payload as INotification,
      }
    case 'setImages':
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
    case 'setDrawerOpen': {
      return {
        ...state,
        drawerOpen: action.payload as boolean,
      }
    }
    case 'addImages': {
      const files = action.payload as IImage[]
      return {
        ...state,
        files: [...state.files, ...files],
      }
    }
    case 'addImage': {
      const file = action.payload as IImage
      return {
        ...state,
        files: [...state.files, file],
      }
    }
    case 'updateImage': {
      const img = action.payload as IImage
      const images = state.files.map((f) => (f.id === img.id ? img : f))
      return {
        ...state,
        files: images,
      }
    }

    // case 'setSelectedFile': {
    //   const id = action.payload as number
    //   const files = state.files.map(f => ({ ...f, selected: f.id === id }))
    //   return {
    //     ...state,
    //     files,
    //   }
    // }

    case 'setColumns': {
      return {
        ...state,
        columns: action.payload as number,
      }
    }

    case 'setProgress': {
      return {
        ...state,
        progress: action.payload as number,
      }
    }

    case 'setLoading':
      return {
        ...state,
        progress: 0,
        loading: action.payload as boolean,
      }

    case 'setImageView':
      return {
        ...state,
        imageView: action.payload as IImage | null,
      }

    case 'setImageEdit': {
      return {
        ...state,
        imageEdit: action.payload as IImage | null,
      }
    }

    default:
      return state
  }
}
