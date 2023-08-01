import * as React from 'react'
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch'
import { MinusIcon, PlusIcon, X } from 'lucide-react'
import { IImage } from 'src/lib/interfaces'
import { stateImage } from './ViewerContainer'

type ControlsProps = {
  zoomIn: () => void
  zoomOut: () => void
  resetTransform: () => void
}
const Controls = ({ zoomIn, zoomOut, resetTransform }: ControlsProps) => (
  <div className='absolute bottom-0 left-0 z-20 flex w-full scale-75 justify-center gap-2 align-middle'>
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

type ViewerProps = {
  transformComponentRef: React.MutableRefObject<ReactZoomPanPinchRef>
  setImgState: React.Dispatch<React.SetStateAction<stateImage>>
  imageView: IImage
}

const Viewer = ({ transformComponentRef, setImgState, imageView }: ViewerProps) => {
  return (
    <div className='flex h-full min-h-[70vh] w-full items-center justify-center'>
      <TransformWrapper
        initialScale={1}
        centerOnInit
        centerZoomedOut
        wheel={{ step: 1 }}
        ref={transformComponentRef}
        maxScale={50}
        onTransformed={(_, state) => setImgState(state)}
      >
        {(utils) => (
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
                className='max-h-[85vh] min-h-[70vh] min-w-[50wh] max-w-[85vw] object-scale-down'
                src={imageView.image}
                alt={imageView.image}
                id={imageView.id}
              />
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  )
}

export default Viewer
