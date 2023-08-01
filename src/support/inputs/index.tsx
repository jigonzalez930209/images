import { RefContext } from 'src/lib/context/RefContext'
import { useContext, useEffect } from 'react'
import { ALL_ACCEPTED_EXT } from 'src/lib/utils/const'
import useImages from 'src/hooks/use-images'

const InputsRef = () => {
  const { addRef, removeRef } = useContext(RefContext)
  const { setImages, addImage, addImages } = useImages()

  const handleOpenFolder = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const fileObj = e.target.files && e.target.files[0]
    if (!fileObj) {
      return
    }
    await setImages(e)
    e.target.value = null
  }

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const fileObj = e.target.files && e.target.files[0]
    if (!fileObj) {
      return
    }
    await addImage(e)
    e.target.value = null
  }

  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const fileObj = e.target.files && e.target.files[0]
    if (!fileObj) {
      return
    }
    await addImages(e)
    e.target.value = null
  }

  useEffect(() => {
    const openFolder = document.getElementById('open-folder') as HTMLInputElement
    const openFile = document.getElementById('open-file') as HTMLInputElement
    const openMany = document.getElementById('open-many') as HTMLInputElement

    addRef('open-folder', { current: openFolder })
    addRef('open-file', { current: openFile })
    addRef('open-many', { current: openMany })
    return () => {
      removeRef('open-folder')
      removeRef('open-file')
      removeRef('open-many')
    }
  }, [])

  return (
    <div style={{ display: 'none' }}>
      <input
        id='open-folder'
        multiple
        accept={ALL_ACCEPTED_EXT.join(', ')}
        type='file'
        onChange={handleOpenFolder}
      />
      <input
        id='open-file'
        accept={ALL_ACCEPTED_EXT.join(', ')}
        type='file'
        onChange={handleAddImage}
      />
      <input
        id='open-many'
        multiple
        accept={ALL_ACCEPTED_EXT.join(', ')}
        type='file'
        onChange={handleAddImages}
      />
    </div>
  )
}

export default InputsRef
