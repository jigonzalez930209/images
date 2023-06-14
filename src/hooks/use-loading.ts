import { ImagesContext } from '../lib/context/ImageContext'
import { useContext } from 'react'

const useLoading = () => {
  const {
    imagesState: { loading },
    setLoading,
  } = useContext(ImagesContext)

  return { loading, setLoading }
}

export default useLoading
