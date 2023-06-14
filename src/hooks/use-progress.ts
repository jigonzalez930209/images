import { ImagesContext } from 'src/lib/context/ImageContext'
import { useContext, useEffect, useState } from 'react'

const useProgress = () => {
  const {
    imagesState: { progress },
    setProgress,
  } = useContext(ImagesContext)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (progress === 100) {
      setIsCompleted(true)
    }
  }, [progress])

  return { progress, isCompleted, setProgress }
}

export default useProgress
