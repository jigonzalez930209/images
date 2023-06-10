import { ImagesContext } from '@/lib/context/ImageContext'
import * as React from 'react'

const useImages = () => {
  const { imagesState, setFile, setFiles, addFile, addFiles } = React.useContext(ImagesContext)

  return {
    images: imagesState.files,
    setImages: setFiles,
    addImage: addFile,
    addImages: addFiles,
    removeImage: setFile,
    updateImage: setFile,
  }
}

export default useImages
