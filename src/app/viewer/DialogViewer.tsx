import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ImagesContext } from 'src/lib/context/ImageContext'
import Viewer from './Viewer'
import { X } from 'lucide-react'

const DialogViewer = () => {
  const {
    imagesState: { imageDialog },
    setImageDialog,
  } = React.useContext(ImagesContext)

  return (
    <Dialog.Root open={Boolean(imageDialog)} onOpenChange={() => setImageDialog(null)}>
      <Dialog.Portal className='h-fit w-3/4'>
        <div className='fixed inset-0 z-10 flex items-start justify-center sm:items-center'>
          <Dialog.Overlay className='fixed inset-0 z-10 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in' />
          <Dialog.Content className='fixed z-10 w-5/6  gap-4 rounded-b-lg border bg-background p-6 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 data-[state=open]:sm:slide-in-from-bottom-0'>
            <Dialog.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'>
              <X className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </Dialog.Close>
            <Viewer />
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default DialogViewer
