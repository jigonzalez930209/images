import * as React from 'react'
import { IImage, IImagesState, INotification, IPlatform } from '../interfaces'
import { ImagesContext } from './ImageContext'
import { imagesReducer } from './imagesReducer'

export const INITIAL_STATE: IImagesState = {
  notifications: {
    content: [''],
    title: '',
    type: null,
  },
  files: [],
  platform: null,
  drawerOpen: false,
  selectedFile: [],
  loading: false,
  progress: 0,
  columns: 2,
  imageView: null,
  imageEdit: null,
}

interface props {
  children: JSX.Element | JSX.Element[]
  initialState: IImagesState
}

export const ImagesProvider = ({ children, initialState }: props) => {
  const [imagesState, dispatch] = React.useReducer(imagesReducer, initialState)

  const setNotification = (notification: INotification) =>
    dispatch({ type: 'setNotification', payload: notification })

  const setDrawerOpen = (open: boolean) => dispatch({ type: 'setDrawerOpen', payload: open })

  const setImagesState = (imagesState: IImagesState) =>
    dispatch({ type: 'setImagesState', payload: imagesState })

  const setImages = (images: IImage[]) => dispatch({ type: 'setImages', payload: images })

  const addImage = (image: IImage) => dispatch({ type: 'addImage', payload: image })

  const addImages = (images: IImage[]) => dispatch({ type: 'addImages', payload: images })

  // const setSelectedFile = (selectedFile: IImage['id'][]) =>
  //   dispatch({ type: 'setSelectedFile', payload: selectedFile })

  const setPlatform = (platform: IPlatform) => dispatch({ type: 'setPlatform', payload: platform })

  const setProgress = (progress: number) => dispatch({ type: 'setProgress', payload: progress })

  const setLoading = (loading: boolean) => dispatch({ type: 'setLoading', payload: loading })

  const setColumns = (columns: number) => dispatch({ type: 'setColumns', payload: columns })

  const setImageView = (image: IImage) => dispatch({ type: 'setImageView', payload: image })

  const setImageEdit = (image: IImage) => dispatch({ type: 'setImageEdit', payload: image })

  const updateImage = (image: IImage) => dispatch({ type: 'updateImage', payload: image })

  React.useEffect(() => {
    setImagesState(initialState)
  }, [initialState])

  return (
    <ImagesContext.Provider
      value={{
        imagesState,
        setImages,
        addImage,
        addImages,
        setColumns,
        setImageEdit,
        updateImage,
        setNotification,
        // setSelectedFile,
        setImageView,
        setDrawerOpen,
        setPlatform,
        setProgress,
        setLoading,
      }}
    >
      {children}
    </ImagesContext.Provider>
  )
}
