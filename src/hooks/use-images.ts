import { IImage } from 'src/lib/interfaces'
import { ImagesContext } from '../lib/context/ImageContext'
import * as React from 'react'
import { bulkPromise, image2canvas, tiffArrayBufferToImageData } from 'src/lib/utils/files'

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
        const file = await bulkPromise(i, files)
        setProgress(imagesState.progress + 100 / files.length)
        images.push({
          id: (+new Date() * Math.random()).toString(36).substring(0, 6),
          image: image2canvas(await tiffArrayBufferToImageData(file)).toDataURL(),
          name: files[i].name,
        })

        console.log(Date.now() - s, 'ms', 100 / files.length)
      })
    )
    console.log(Date.now() - s, 'ms all time')

    setFiles(images)
    setLoading(false)
    e.target.value = null
    console.log(images)
  }

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    let files = e.currentTarget.files
    const s = Date.now()
    let img: IImage = null

    const imgs = await bulkPromise(0, files)
    setProgress(imagesState.progress + 100 / files.length)
    img = {
      id: (+new Date() * Math.random()).toString(36).substring(0, 6),
      image: image2canvas(tiffArrayBufferToImageData(imgs)).toDataURL(),
      name: files[0].name,
    }

    console.log(Date.now() - s, 'ms all time')

    addFile(img)
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
        const file = await bulkPromise(i, files)
        setProgress(imagesState.progress + 100 / files.length)
        images.push({
          id: (+new Date() * Math.random()).toString(36).substring(0, 6),
          image: image2canvas(await tiffArrayBufferToImageData(file)).toDataURL(),
          name: files[i].name,
        })

        console.log(Date.now() - s, 'ms', 100 / files.length)
      })
    )
    console.log(Date.now() - s, 'ms all time')

    addFiles(images)
    setLoading(false)
    e.target.value = null
  }

  return {
    images: imagesState.files,
    setImages,
    addImage,
    addImages,
    removeImage: setFile,
    updateImage: setFile,
  }
}

export default useImages
