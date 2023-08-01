import { useContext, useEffect, useState } from 'react'
import { ImagesContext } from 'src/lib/context/ImageContext'
import { ChangeContext } from '../../ChangeContext'
import { FILTERS_ORDER, Filters, applyFilter } from '../../filters'
import { Button } from 'src/ui/button'

const FiltersTab = () => {
  const {
    imagesState: { imageEdit },
  } = useContext(ImagesContext)

  const [filter, setFilter] = useState<Filters | ''>('')

  const { setImage, changeHistory, setLoading } = useContext(ChangeContext)

  const filterImage = async (filter: Filters, params: {}) => {
    console.time('Process Image')
    setLoading(true)
    await setTimeout(() => {
      setImage({
        ...imageEdit,
        image: applyFilter(changeHistory[changeHistory.length - 1] || imageEdit, filter),
      })

      setLoading(false)
    }, 1)

    console.timeEnd('Process Image')
    setFilter('')
  }

  useEffect(() => {
    if (filter === 'alter_channel') {
      filterImage(filter, { channel: 'red' })
    } else if (filter === 'gaussian_blur') {
      filterImage(filter, { radius: 3 })
    } else if (filter === 'hsv') {
      filterImage(filter, { hue: 180, saturation: 1, value: 1 })
    } else if (filter === 'selective_color_convert') {
      filterImage(filter, { hue: 180, saturation: 1, lightness: 1 })
    }

    if (filter) {
      filterImage(filter)
    }
  }, [filter])

  return (
    <div className='grid grid-cols-3 gap-2 p-2'>
      {FILTERS_ORDER.filters.map((filter) => (
        <Button
          key={filter}
          onClick={() => setFilter(filter)}
          className='rounded-md h-16 capitalize'
        >
          {filter.split('_').join(' ')}
        </Button>
      ))}
    </div>
  )
}

export default FiltersTab
