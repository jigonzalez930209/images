import { ChevronLeft, ChevronRight, Edit2 } from 'lucide-react'
import React, { useContext, useRef } from 'react'

import { ImagesContext } from 'src/lib/context/ImageContext'
import { cn } from 'src/lib/utils'
import Viewer from './Viewer'

import type { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'

export type stateImage = {
  positionX: number
  positionY: number
  scale: number
} | null

const ViewerContainer = (): JSX.Element => {
  const {
    imagesState: { imageView, files: images },
    setImageView,
    setImageEdit,
  } = useContext(ImagesContext)
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)

  const [imgState, setImgState] = React.useState<stateImage>(null)

  const handleEdition = (): undefined => {
    setImageEdit(imageView)
    setImageView(null)
  }

  const zoomToImage = (): undefined => {
    if (transformComponentRef.current !== null) {
      const { zoomToElement } = transformComponentRef.current
      zoomToElement(imageView.id)
    }
  }

  const handleNext = (): undefined => {
    const index = images.findIndex((image) => image.id === imageView.id)
    const nextIndex = index + 1
    if (nextIndex < images.length) {
      const nextImage = images[nextIndex]
      setImageView(nextImage)
    } else {
      setImageView(images[0])
    }
  }
  const handlePrevious = (): undefined => {
    const index = images.findIndex((image) => image.id === imageView.id)
    const previousIndex = index - 1
    if (previousIndex >= 0) {
      const previousImage = images[previousIndex]
      setImageView(previousImage)
    } else {
      setImageView(images[images.length - 1])
    }
  }
  React.useEffect(() => {
    zoomToImage()
  }, [imageView?.id])

  if (typeof imageView?.id === 'number') return null

  return (
    <div className='relative max-h-[90vh] min-h-[50vh] w-full p-2'>
      <Edit2
        className='absolute left-2 top-2 z-40 cursor-pointer rounded-md border bg-gray-200 p-1 hover:bg-gray-300 hover:shadow-lg dark:bg-gray-700 hover:dark:bg-gray-900'
        onClick={handleEdition}
      />
      <ChevronLeft
        className={cn(
          'absolute left-2 top-1/2 z-40 cursor-pointer rounded-full border bg-gray-200 p-1 hover:bg-gray-300 hover:shadow-lg dark:bg-gray-700 hover:dark:bg-gray-900',
          images.length <= 1 && 'hidden',
        )}
        onClick={handlePrevious}
      />
      <ChevronRight
        className={cn(
          'absolute right-2 top-1/2 z-40 cursor-pointer rounded-full border bg-gray-200 p-1 hover:bg-gray-300 hover:shadow-lg dark:bg-gray-700 hover:dark:bg-gray-900',
          images.length <= 1 && 'hidden',
        )}
        onClick={handleNext}
      />
      <Viewer
        imageView={imageView}
        setImgState={setImgState}
        transformComponentRef={transformComponentRef}
      />
      <div onClick={zoomToImage}>{imageView.name}V</div>
      {imgState !== null && (
        <div className='text-xl'>
          Scale: <span className='font-semibold'>{imgState.scale}</span>
        </div>
      )}
    </div>
  )
}
export default ViewerContainer
