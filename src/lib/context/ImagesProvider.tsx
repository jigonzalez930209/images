import * as React from 'react'
import { IImage, IImagesState, INotification, IPlatform } from '../interfaces'
import { ImagesContext } from './ImageContext'
import { graftReducer } from './imagesReducer'

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
}

interface props {
  children: JSX.Element | JSX.Element[]
  initialState: IImagesState
}

export const GraftProvider = ({ children, initialState }: props) => {
  const [imagesState, dispatch] = React.useReducer(graftReducer, initialState)

  const setNotification = (notification: INotification) =>
    dispatch({ type: 'setNotification', payload: notification })

  const setDrawerOpen = (open: boolean) => dispatch({ type: 'setDrawerOpen', payload: open })

  const setImagesState = (imagesState: IImagesState) =>
    dispatch({ type: 'setImagesState', payload: imagesState })

  const setFile = (file: IImage) => dispatch({ type: 'setFile', payload: file })

  const setFiles = (files: IImage[]) => dispatch({ type: 'setFiles', payload: files })

  const addFile = (file: IImage) => dispatch({ type: 'addFile', payload: file })

  const addFiles = (files: IImage[]) => dispatch({ type: 'addFiles', payload: files })

  const setSelectedFile = (selectedFile: IImage['id'][]) =>
    dispatch({ type: 'setSelectedFile', payload: selectedFile })

  const setPlatform = (platform: IPlatform) => dispatch({ type: 'setPlatform', payload: platform })
  React.useEffect(() => {
    setImagesState(initialState)
  }, [initialState])

  return (
    <ImagesContext.Provider
      value={{
        imagesState,
        setFiles,
        setFile,
        addFile,
        addFiles,
        setNotification,
        setSelectedFile,
        setDrawerOpen,
        setPlatform,
      }}
    >
      {children}
    </ImagesContext.Provider>
  )
}