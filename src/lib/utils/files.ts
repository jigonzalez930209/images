import { open, save } from '@tauri-apps/api/dialog'
import { readBinaryFile } from '@tauri-apps/api/fs'

const readFilesUsingTauriProcess = async () => {
  const selected = await open({
    multiple: true,
    filters: [
      {
        name: '[*.jpg] [*.png] [*.tif]',
        extensions: ['jpg', 'png', 'tif'],
      },
    ],
  })
  if (Array.isArray(selected)) {
    const readAll = await readAllFiles(selected)
    return await readAll
  } else if (selected === null) {
    console.log('user cancelled the selection')
  } else {
    console.log('user selected a single file')
  }
}

const readAllFiles = async (files: string[]) => {
  const readFiles = await Promise.all(
    files.map(async file => {
      const fileData = await readBinaryFile(file)
      return fileData
    })
  )

  return readFiles.map((file, index) => {
    return {
      name: files[index],
      image: new Blob([file], { type: 'image' }),
    }
  })
}

export { readFilesUsingTauriProcess }
