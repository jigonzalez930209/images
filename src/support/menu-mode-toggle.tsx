import { Icons } from './icons'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from '../ui/menubar'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function MenuModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <MenubarMenu>
      <MenubarTrigger>Theme</MenubarTrigger>
      <MenubarContent forceMount>
        <MenubarRadioGroup value={theme}>
          <MenubarRadioItem value='light' onClick={() => setTheme('light')}>
            <Icons.sun className='mr-2 h-4 w-4' />
            <span>Light</span>
          </MenubarRadioItem>
          <MenubarRadioItem value='dark' onClick={() => setTheme('dark')}>
            <Icons.moon className='mr-2 h-4 w-4' />
            <span>Dark</span>
          </MenubarRadioItem>
          <MenubarRadioItem value='system' onClick={() => setTheme('system')}>
            <Icons.laptop className='mr-2 h-4 w-4' />
            <span>System</span>
          </MenubarRadioItem>
        </MenubarRadioGroup>
      </MenubarContent>
    </MenubarMenu>
  )
}
