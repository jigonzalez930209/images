import * as React from 'react'

import { Progress } from 'src/ui/progress'
import { RefProvider } from 'src/lib/context/RefContext'
import InputsRef from 'src/support/inputs'
import { Menu } from '../support/menu'
import useLoading from '../hooks/use-loading'
import useProgress from '../hooks/use-progress'
import Container from './dnd/Container'

const App = () => {
  const { progress } = useProgress()
  const { loading } = useLoading()

  document.body.removeAttribute('data-section')
  return (
    <div className='overflow-none bg-transparent font-sans antialiased scrollbar-none'>
      {loading && (
        <div className='absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 '>
          <Progress className='w-1/3' value={progress}></Progress>
        </div>
      )}
      <header className='overflow-none z-20 w-full bg-background'>
        <RefProvider>
          <Menu />
          <InputsRef />
        </RefProvider>
      </header>
      <main className='h-[93vh] overflow-auto border-t bg-background pb-8 scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-md'>
        <Container />
      </main>
    </div>
  )
}

export default App
