import { IImage } from 'src/lib/interfaces'
import { ImagesContext } from '../lib/context/ImageContext'
import * as React from 'react'
import { bulkPromise, image2canvas, tiffArrayBufferToImageData } from 'src/lib/utils/files'
import { useToast } from 'src/ui/use-toast'

const useImages = () => {
  const { imagesState, setFile, setFiles, addFile, addFiles, setLoading, setProgress } =
    React.useContext(ImagesContext)
  const { toast } = useToast()

  const setImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    let files = e.currentTarget.files
    const s = Date.now()
    const images: IImage[] = []

    await Promise.all(
      Array.from({ length: files.length }).map(async (_, i) => {
        const file = await bulkPromise(i, files)
        setProgress(imagesState.progress + 100 / files.length)
        if (files[i].name.includes('.tif') || files[i].name.includes('.tiff')) {
          images.push({
            id: (+new Date() * Math.random()).toString(36).substring(0, 6),
            image: image2canvas(await tiffArrayBufferToImageData(file)).toDataURL(),
            name: files[i].name,
          })
        } else {
          toast({
            title: 'Error',
            description: 'Only .tif and .tiff files are supported',
          })
          console.log('Only .tif and .tiff files are supported')
        }

        console.log(Date.now() - s, 'ms', 100 / files.length)
      })
    )
    console.log(Date.now() - s, 'ms all time')

    setFiles(images)
    setLoading(false)
    e.target.value = null
  }

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    let files = e.currentTarget.files
    const s = Date.now()
    let img: IImage = null

    const imgs = await bulkPromise(0, files)
    if (files[0].name.includes('.tif') || files[0].name.includes('.tiff')) {
      setProgress(imagesState.progress + 100 / files.length)
      img = {
        id: (+new Date() * Math.random()).toString(36).substring(0, 6),
        image: image2canvas(tiffArrayBufferToImageData(imgs)).toDataURL(),
        name: files[0].name,
      }

      addFile(img)
    }

    console.log(Date.now() - s, 'ms all time')

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
        if (files[i].name.includes('.tif') || files[i].name.includes('.tiff')) {
          images.push({
            id: (+new Date() * Math.random()).toString(36).substring(0, 6),
            image: image2canvas(await tiffArrayBufferToImageData(file)).toDataURL(),
            name: files[i].name,
          })
        } else {
          toast({
            title: 'Error',
            description: 'Only .tif and .tiff files are supported',
          })
          console.log('Only .tif and .tiff files are supported')
        }
        setProgress(imagesState.progress + 100 / files.length)

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
    putImages: setFiles,
    removeImage: setFile,
    updateImage: setFile,
  }
}

export default useImages
