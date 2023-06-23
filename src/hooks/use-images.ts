import { IImage } from 'src/lib/interfaces'
import { ImagesContext } from '../lib/context/ImageContext'
import * as React from 'react'
import { readFileInFileList } from 'src/lib/utils/files'

const useImages = () => {
  const { imagesState, setFile, setFiles, addFile, addFiles, setLoading, setProgress } =
    React.useContext(ImagesContext)

  const setImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    let files = e.currentTarget.files
    const s = Date.now()
    const images: IImage[] = []

    await Promise.all(
      Array.from({ length: files.length }).map(async (_, i) => {
        const t = new Date()
        const file = await readFileInFileList(i, files)
        images.push({
          id: (+new Date() * Math.random()).toString(36).substring(0, 6),
          image: file,
          name: files[i].name,
        })
        console.log(new Date().getTime() - t.getTime(), `ms to process ${files[i].name}`)
      })
    )
    console.log(Date.now() - s, 'ms all read time')

    setFiles(images)
    setLoading(false)
    e.target.value = null
  }

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    let files = e.currentTarget.files

    const processFile = await readFileInFileList(0, files)

    addFile({
      id: (+new Date() * Math.random()).toString(36).substring(0, 6),
      image: processFile,
      name: files[0].name,
    })

    setLoading(false)
    e.target.value = null
  }

  const addImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    let files = e.currentTarget.files
    const s = Date.now()
    const images: IImage[] = []

    await Promise.all(
      Array.from({ length: files.length }).map(async (_, i) => {
        const t = new Date()
        const file = await readFileInFileList(i, files)
        images.push({
          id: (+new Date() * Math.random()).toString(36).substring(0, 6),
          image: file,
          name: files[i].name,
        })
        console.log(new Date().getTime() - t.getTime(), `ms to process ${files[i].name}`)
      })
    )
    console.log(Date.now() - s, 'ms all read time')

    addFiles(images)
    setLoading(false)
    e.target.value = null
  }

  return {
    images: imagesState.files,
    setImages,
    addImage,
    addImages,
    putImages: setFiles,
    removeImage: setFile,
    updateImage: setFile,
  }
}

export default useImages
