import { Button } from '../ui/button'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '../ui/menubar'
import { FileImage, Maximize, X } from 'lucide-react'
import { useCallback, useContext } from 'react'
import { Icons } from './icons'
import { MenuModeToggle } from './menu-mode-toggle'
import ImagesFiles from './open-folder'
import { ImagesContext } from 'src/lib/context/ImageContext'

export function Menu() {
  const { imagesState, setColumns } = useContext(ImagesContext)

  const minimizeWindow = useCallback(async () => {
    const { appWindow } = await import('@tauri-apps/plugin-window')

    appWindow?.minimize()
  }, [])

  const maximizeWindow = useCallback(async () => {
    const { appWindow } = await import('@tauri-apps/plugin-window')
    const isMaximized = await appWindow?.isMaximized()

    if (isMaximized) {
      appWindow?.unmaximize()
    } else {
      appWindow?.maximize()
    }
  }, [])

  const closeWindow = useCallback(async () => {
    const { appWindow } = await import('@tauri-apps/plugin-window')

    appWindow.close()
  }, [])

  return (
    <Menubar className='w-full rounded-none border-b border-none pl-2 lg:pl-3'>
      <MenubarMenu>
        <div className='inline-flex h-fit w-fit items-center text-cyan-500'>
          <FileImage className='h-5 w-5' />
        </div>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className='font-bold'>App</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>About App</MenubarItem>
          <MenubarSeparator />
          <MenubarShortcut />
          <MenubarItem onClick={closeWindow}>
            Quit Images <MenubarShortcut>⌘Q</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger disabled className='relative'>
          Project
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled>
            New <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Open <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>
            Import <MenubarShortcut>⌘I</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className='min-w-fit'>Images Files</MenubarTrigger>
        <ImagesFiles />
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Grid</MenubarCheckboxItem>
          <MenubarCheckboxItem>Flex</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value={imagesState.columns.toString()}>
            <MenubarRadioItem value='0' onClick={() => setColumns(0)}>
              1
            </MenubarRadioItem>
            <MenubarRadioItem value='1' onClick={() => setColumns(1)}>
              2
            </MenubarRadioItem>
            <MenubarRadioItem value='2' onClick={() => setColumns(2)}>
              3
            </MenubarRadioItem>
            <MenubarRadioItem value='3' onClick={() => setColumns(3)}>
              4
            </MenubarRadioItem>
            <MenubarRadioItem value='6' onClick={() => setColumns(4)}>
              6
            </MenubarRadioItem>
            <MenubarRadioItem value='8' onClick={() => setColumns(6)}>
              8
            </MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset disabled>
            Show Status Bar
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Hide Sidebar</MenubarItem>
          <MenubarItem disabled inset>
            Enter Full Screen
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenuModeToggle />

      {/* <ExamplesNav /> */}

      <div data-tauri-drag-region className='inline-flex h-full w-full justify-end'>
        {/* <div className='pr-3'>
          <ModeToggle />
        </div> */}

        <Button onClick={minimizeWindow} variant='ghost' className='h-8 focus:outline-none'>
          <Icons.minimize className='h-3 w-3' />
        </Button>
        <Button onClick={maximizeWindow} variant='ghost' className='h-8 focus:outline-none'>
          <Maximize className='h-4 w-4' />
        </Button>
        <Button onClick={closeWindow} variant='ghost' className='h-8 focus:outline-none'>
          <X className='h-4 w-4' />
        </Button>
      </div>
    </Menubar>
  )
}
