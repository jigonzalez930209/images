import { cn } from '../lib/utils'
import { Menu } from '../support/menu'
import * as React from 'react'
import { Progress } from 'src/ui/progress'
import useImages from '../hooks/use-images'
import useLoading from '../hooks/use-loading'
import useProgress from '../hooks/use-progress'
import { RefProvider } from 'src/lib/context/RefContext'
import InputsRef from 'src/support/inputs'
import { ImagesContext } from 'src/lib/context/ImageContext'
import { ImagesGridColumns } from 'src/lib/utils/const'

const App = () => {
  const { progress } = useProgress()
  const { loading } = useLoading()
  const { images } = useImages()
  const { imagesState } = React.useContext(ImagesContext)
  console.log({ images, loading, progress })
  document.body.removeAttribute('data-section')
  return (
    <div className='bg-transparent font-sans antialiased scrollbar-none'>
      {loading && (
        <div className='absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 '>
          <Progress className='w-1/3' value={progress}></Progress>
        </div>
      )}
      <header className='fixed left-0 top-0 w-full bg-background'>
        <RefProvider>
          <Menu />
          <InputsRef />
        </RefProvider>
      </header>
      <div className='h-14'></div>
      <div className='min-h-full overscroll-none px-2'>
        <div
          className={cn(
            'min-h-full overflow-auto border-t bg-background',
            'scrollbar-none',
            ImagesGridColumns[imagesState.columns],
            'grid gap-5 scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-md'
          )}
        >
          {images.map((file, i) => (
            <div key={i + file.name}>
              <img key={i} src={file.image} className='h-full object-scale-down' />
              {file.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
