import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'
import { ChevronLeft, ChevronRight, MinusIcon, PlusIcon, X } from 'lucide-react'
import React, { useContext, useRef } from 'react'

import { ImagesContext } from 'src/lib/context/ImageContext'
import { cn } from 'src/lib/utils'

const Controls = ({ zoomIn, zoomOut, resetTransform }) => (
  <div className='absolute bottom-10 right-2 z-20 flex gap-2'>
    <div
      className='m-0 cursor-pointer rounded-full border bg-gray-200 p-1 hover:bg-gray-300 hover:shadow-lg dark:bg-gray-700 hover:dark:bg-gray-900'
      onClick={() => zoomIn()}
    >
      <PlusIcon />
    </div>
    <div
      className='m-0 cursor-pointer rounded-full border bg-gray-200 p-1 hover:bg-gray-300 hover:shadow-lg dark:bg-gray-700 hover:dark:bg-gray-900'
      onClick={() => zoomOut()}
    >
      <MinusIcon />
    </div>
    <div
      className='m-0 cursor-pointer rounded-full border bg-gray-200 p-1 hover:bg-gray-300 hover:shadow-lg dark:bg-gray-700 hover:dark:bg-gray-900'
      onClick={() => resetTransform()}
    >
      <X className='text-' />
    </div>
  </div>
)

const Viewer = () => {
  const {
    imagesState: { imageDialog, files: images },
    setImageDialog,
  } = useContext(ImagesContext)
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)

  const zoomToImage = () => {
    if (transformComponentRef.current) {
      const { zoomToElement } = transformComponentRef.current
      zoomToElement(imageDialog.id)
    }
  }

  const handleNext = () => {
    const index = images.findIndex(image => image.id === imageDialog.id)
    const nextIndex = index + 1
    if (nextIndex < images.length) {
      const nextImage = images[nextIndex]
      setImageDialog(nextImage)
    } else {
      setImageDialog(images[0])
    }
  }
  const handlePrevious = () => {
    const index = images.findIndex(image => image.id === imageDialog.id)
    const previousIndex = index - 1
    if (previousIndex >= 0) {
      const previousImage = images[previousIndex]
      setImageDialog(previousImage)
    } else {
      setImageDialog(images[images.length - 1])
    }
  }
  React.useEffect(() => {
    zoomToImage()
  }, [imageDialog?.id])

  if (!Boolean(imageDialog)) return null

  return (
    <div className='relative w-[100%] items-center justify-center p-2'>
      <TransformWrapper
        initialScale={1}
        centerOnInit
        centerZoomedOut
        limitToBounds={false}
        wheel={{ step: 0.08 }}
        ref={transformComponentRef}
      >
        {utils => (
          <React.Fragment>
            <Controls {...utils} />
            <ChevronLeft
              className={cn(
                'absolute left-2 top-1/2 z-20 cursor-pointer rounded-full border bg-gray-200 p-1 hover:bg-gray-300 hover:shadow-lg dark:bg-gray-700 hover:dark:bg-gray-900',
                images.length <= 1 && 'hidden'
              )}
              onClick={handlePrevious}
            />

            <TransformComponent>
              <div className='m-auto w-5/6'>
                <img src={imageDialog.image} alt={imageDialog.image} id={imageDialog.id} />
              </div>
            </TransformComponent>
            <ChevronRight
              className={cn(
                'absolute right-2 top-1/2 z-20 cursor-pointer rounded-full border bg-gray-200 p-1 hover:bg-gray-300 hover:shadow-lg dark:bg-gray-700 hover:dark:bg-gray-900',
                images.length <= 1 && 'hidden'
              )}
              onClick={handleNext}
            />
          </React.Fragment>
        )}
      </TransformWrapper>
      <div onClick={zoomToImage}>{imageDialog.name}</div>
    </div>
  )
}
export default Viewer
