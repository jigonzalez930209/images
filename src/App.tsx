import { cn } from './lib/utils'
import { Menu } from './menu'
import { ThemeProvider } from './theme-provider'

const App = () => {
  document.body.removeAttribute('data-section')
  return (
    <html lang='en' suppressHydrationWarning className='overflow-clip bg-black'>
      <head />
      <body className='scrollbar-none  h-screen w-full overflow-clip bg-transparent font-sans antialiased'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='h-full overflow-clip'>
            <Menu />
            <div
              className={cn(
                'bg-background h-full overflow-auto border-t pb-8',
                // "scrollbar-none"
                'scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-md'
              )}
            >
              aa
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default App
