import { Button } from './ui/button'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from './ui/menubar'
import { FileImage, Maximize, X } from 'lucide-react'
import { useCallback } from 'react'
import { Icons } from './icons'
import { MenuModeToggle } from './menu-mode-toggle'

export function Menu() {
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
    <Menubar className='rounded-none border-b border-none pl-2 lg:pl-3'>
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
            Quit Music <MenubarShortcut>⌘Q</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className='relative'>Project</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
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
        <MenubarContent>
          <MenubarItem>
            Open <MenubarShortcut>⌘A</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open Folder <MenubarShortcut>⇧⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Grid</MenubarCheckboxItem>
          <MenubarCheckboxItem>Flex</MenubarCheckboxItem>
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
