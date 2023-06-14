import { open, save } from '@tauri-apps/plugin-dialog'
import { readBinaryFile, readTextFile } from '@tauri-apps/plugin-fs'
import UTIF from 'utif'

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
    const b = Date.now()
    const readAll = await readAllFiles(selected.map(s => s.path))
    const e = Date.now()
    console.log(`readAllFiles took ${e - b}ms`)
    return readAll
  } else if (selected === null) {
    console.log('user cancelled the selection')
  } else {
    console.log('user selected a single file')
  }
}

const readAllFiles = async (files: string[]) => {
  const readFiles = Promise.all(
    files.map(file => {
      const fileData = readBinaryFile(file)
      return fileData
    })
  )
  const filesR = await readFiles
  return filesR.map((file, index) => {
    const buffer = file.buffer
    const ifds = UTIF.decode(buffer)
    const firstPageOfTif = ifds[0]
    UTIF.decodeImage(buffer, firstPageOfTif)
    const rgba = UTIF.toRGBA8(firstPageOfTif)

    const imageWidth = firstPageOfTif.width
    const imageHeight = firstPageOfTif.height

    const cnv = document.createElement('canvas')
    cnv.width = imageWidth
    cnv.height = imageHeight

    const ctx = cnv.getContext('2d')
    const imageData = ctx.createImageData(imageWidth, imageHeight)
    for (let i = 0; i < rgba.length; i++) {
      imageData.data[i] = rgba[i]
    }
    ctx.putImageData(imageData, 0, 0)

    return {
      name: files[index].split('\\').pop() as string,
      image: cnv.toDataURL(),
    }
  })
}

const bulkPromise = async (i: number, files: FileList) => files[i].arrayBuffer().then(buffer => buffer)

const image2canvas = (imageData: ImageData) => {
  const context = document.createElement('canvas').getContext('2d')
  context.canvas.width = imageData.width
  context.canvas.height = imageData.height

  context.putImageData(imageData, 0, 0)

  return context.canvas
}

const tiffArrayBufferToImageData = buffer => {
  const ifds = UTIF.decode(buffer)
  UTIF.decodeImage(buffer, ifds[0])
  const image = ifds[0]
  const array = new Uint8ClampedArray(UTIF.toRGBA8(image))
  return new ImageData(array, image.width, image.height)
}

export { readFilesUsingTauriProcess, bulkPromise, image2canvas, tiffArrayBufferToImageData }
