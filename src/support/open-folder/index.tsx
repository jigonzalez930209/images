import { useContext } from 'react'
import { MenubarContent, MenubarItem } from 'src/ui/menubar'

import { MenubarShortcut } from 'src/ui/menubar'
import useImages from 'src/hooks/use-images'
import { RefContext } from 'src/lib/context/RefContext'

const ImagesFiles = () => {
  const { getRef } = useContext(RefContext)
  const { images } = useImages()

  const openFolder = () => {
    getRef('open-folder').current?.click()
  }

  const addOneFile = () => {
    getRef('open-file').current?.click()
  }

  const addFiles = () => {
    getRef('open-many').current?.click()
  }

  return (
    <MenubarContent forceMount>
      <MenubarItem onClick={addOneFile}>
        Add one <MenubarShortcut>⌘A</MenubarShortcut>
      </MenubarItem>
      <MenubarItem disabled={!Boolean(images.length)} onClick={addFiles}>
        Add files <MenubarShortcut>⇧⌘A</MenubarShortcut>
      </MenubarItem>
      <MenubarItem onClick={openFolder}>
        Open Folder <MenubarShortcut>⇧⌘O</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  )
}
export default ImagesFiles
