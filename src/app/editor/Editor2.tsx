import React, { useContext } from 'react'

import { ImagesContext } from 'src/lib/context/ImageContext'
import Loader from 'src/lib/components/Loader'
import DialogWrapper from 'src/lib/components/Dialog/Dialog'
import { ChangeContext } from './ChangeContext'
import EditorContainer from './components/EditorContainer'

const Editor2 = () => {
  const {
    imagesState: { imageEdit },
    setImageEdit,
  } = useContext(ImagesContext)
  const { changeHistory, loading } = useContext(ChangeContext)

  return (
    <DialogWrapper onOpenChange={() => setImageEdit(null)} open={Boolean(imageEdit)}>
      {loading && <Loader />}
      <EditorContainer>
        <div className='grid grid-cols-2 h-[1fr]'>
          <img
            src={changeHistory?.length && changeHistory[changeHistory?.length - 1]?.image}
            alt={
              (changeHistory?.length && changeHistory[changeHistory?.length - 1]?.name) ||
              'no image'
            }
          />
          <img src={imageEdit?.image} alt={imageEdit?.name} />
        </div>
      </EditorContainer>
    </DialogWrapper>
  )
}

export default Editor2
