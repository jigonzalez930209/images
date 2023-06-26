import * as React from 'react'
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor'

import { ColorsMap } from '@scaleflex/ui/theme/roots/palette/entity/colors-map'
import { Theme } from '@scaleflex/ui/theme'

import { ImagesContext } from 'src/lib/context/ImageContext'

const palette: ColorsMap = {
  "txt-primary": '',
  "txt-primary-invert": '',
  "txt-secondary": '',
  "txt-secondary-invert": '',
  "txt-placeholder": '',
  "accent-primary": '',
  "accent-primary-hover": '',
  "accent-primary-active": '',
  "accent-primary-disabled": '',
  "bg-primary": '',
  "bg-primary-hover": '',
  "bg-primary-active": '',
  "bg-primary-0-5-opacity": '',
  "bg-secondary": '',
  "icons-primary": '',
  "icons-primary-opacity-0-6": '',
  "icons-secondary": '',
  "icons-placeholder": '',
  "btn-primary-text": '',
  "btn-disabled-text": '',
  "link-primary": '',
  "link-hover": '',
  "link-active": '',
  "borders-primary": '',
  "borders-secondary": '',
  "borders-strong": '',
  "borders-invert": '',
  "border-active-bottom": '',
  "active-secondary": '',
  "active-secondary-hover": '',
  "active-secondary-active": '',
  "tag": '',
  "error": '',
  "success": '',
  "info": '',
  "light-shadow": '',
  'warning': ''
}

const Editor = () => {
  const { imagesState: { imageEdit }, setImageEdit, updateImage } = React.useContext(ImagesContext)

  return (
    <div className='w-full h-full'>
      {imageEdit && (
        <FilerobotImageEditor
          defaultSavedImageName={imageEdit.name}
          defaultSavedImageType='png'
          onClose={() => setImageEdit(null)}
          previewPixelRatio={1}
          savingPixelRatio={1}
          source={imageEdit.image}
          onSave={(editedImageObject, designState) => {
            console.log('saved', editedImageObject, designState)
            updateImage({
              ...imageEdit,
              image: editedImageObject.imageBase64,
            })
            setImageEdit(null) // close editor and save image to context state
          }}
          annotationsCommon={{
            fill: '#ff0000',
          }}
          Text={{ text: 'Type your text here ...' }}
          Rotate={{ angle: 90, componentType: 'slider' }}
          Crop={{
            presetsItems: [
              {
                titleKey: 'classicTv',
                descriptionKey: '4:3',
                ratio: 4 / 3,
                // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
              },
              {
                titleKey: 'cinemascope',
                descriptionKey: '21:9',
                ratio: 21 / 9,
                // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
              },
            ],
            presetsFolders: [
              {
                titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
                // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                groups: [
                  {
                    titleKey: 'facebook',
                    items: [
                      {
                        titleKey: 'profile',
                        width: 180,
                        height: 180,
                        descriptionKey: 'fbProfileSize',
                      },
                      {
                        titleKey: 'coverPhoto',
                        width: 820,
                        height: 312,
                        descriptionKey: 'fbCoverPhotoSize',
                      },
                    ],
                  },
                ],
              },
            ],
          }}
          defaultSavedImageQuality={1}
          tabsIds={[TABS.FINETUNE, TABS.FILTERS, TABS.RESIZE, TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK,]} // or {['Adjust', 'Annotate', 'Watermark']}
          defaultTabId={TABS.FINETUNE}
          defaultToolId={TOOLS.NOISE}
          forceToPngInEllipticalCrop
          theme={{
            palette: palette,
          } as Pick<Theme, 'palette' | 'breakpoints' | 'shape' | 'typography'>}
        />
      )}
    </div>
  )
}

export default Editor