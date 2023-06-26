import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'
import { ChevronLeft, ChevronRight, Edit2, MinusIcon, PlusIcon, X } from 'lucide-react'
import React, { useContext, useRef } from 'react'

import { ImagesContext } from 'src/lib/context/ImageContext'
import { cn } from 'src/lib/utils'

const Controls = ({ zoomIn, zoomOut, resetTransform }) => (
  <div className='absolute bottom-0 left-0 w-full align-middle justify-center scale-75 z-20 flex gap-2'>
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
    imagesState: { imageView, files: images },
    setImageView,
    setImageEdit,
  } = useContext(ImagesContext)
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)

  const [imgState, setImgState] = React.useState<{ positionX: number, positionY: number, scale: number } | null>(null)

  const handleEdition = () => {
    setImageEdit(imageView)
    setImageView(null)
  }

  const zoomToImage = () => {
    if (transformComponentRef.current) {
      const { zoomToElement } = transformComponentRef.current
      zoomToElement(imageView.id)
    }
  }

  const handleNext = () => {
    const index = images.findIndex(image => image.id === imageView.id)
    const nextIndex = index + 1
    if (nextIndex < images.length) {
      const nextImage = images[nextIndex]
      setImageView(nextImage)
    } else {
      setImageView(images[0])
    }
  }
  const handlePrevious = () => {
    const index = images.findIndex(image => image.id === imageView.id)
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

  if (!Boolean(imageView)) return null

  return (
    <div className='relative p-2 w-full min-h-[50vh] max-h-[90vh]'>
      <Edit2 className='absolute left-2 top-2 z-40 cursor-pointer border rounded-md bg-gray-200 p-1 hover:bg-gray-300 hover:shadow-lg dark:bg-gray-700 hover:dark:bg-gray-900'
        onClick={handleEdition}
      />
      <ChevronLeft
        className={cn(
          'absolute left-2 top-1/2 z-40 cursor-pointer rounded-full border bg-gray-200 p-1 hover:bg-gray-300 hover:shadow-lg dark:bg-gray-700 hover:dark:bg-gray-900',
          images.length <= 1 && 'hidden'
        )}
        onClick={handlePrevious}
      />
      <ChevronRight
        className={cn(
          'absolute right-2 top-1/2 z-40 cursor-pointer rounded-full border bg-gray-200 p-1 hover:bg-gray-300 hover:shadow-lg dark:bg-gray-700 hover:dark:bg-gray-900',
          images.length <= 1 && 'hidden'
        )}
        onClick={handleNext}
      />
      <div className='flex items-center justify-center w-full h-full min-h-[70vh]'>
        <TransformWrapper
          initialScale={1}
          centerOnInit
          centerZoomedOut
          wheel={{ step: 1 }}
          ref={transformComponentRef}
          maxScale={50}
          onTransformed={(_, state) => setImgState(state)}
        >
          {utils => (
            <React.Fragment>
              <Controls {...utils} />
              <TransformComponent
                contentClass='flex items-center justify-center'
                wrapperClass='flex items-center justify-center'
                contentStyle={{
                  width: '100%',
                  height: '100%',
                }}
                wrapperStyle={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <img
                  className='object-scale-down max-h-[85vh] min-h-[70vh] min-w-[50wh] max-w-[85vw]'
                  src={imageView.image} alt={imageView.image} id={imageView.id} />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
      <div onClick={zoomToImage}>{imageView.name}</div>
      {imgState && <div>scale: {imgState.scale} X: {imgState.positionX} Y: {imgState.positionY}</div>}
    </div>
  )
}
export default Viewer
