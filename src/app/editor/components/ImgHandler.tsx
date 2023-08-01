import type { IImage } from 'src/lib/interfaces'

type ImgHandlerProps = {
  img: IImage
}

const ImgHandler = (props: ImgHandlerProps) => {
  return (
    <div className='flex h-full w-full items-center justify-center bg-gray-800 '>
      ImgHandler{' '}
    </div>
  )
}

export default ImgHandler
