import { useContext } from 'react'
import { ChangeContext } from '../../ChangeContext'
import { FILTERS_ORDER, applyFilter, customerFilter } from '../../filters'
import { ImagesContext } from 'src/lib/context/ImageContext'
import { Button } from 'src/ui/button'

const AdjustmentsTab = () => {
  const {
    imagesState: { imageEdit },
  } = useContext(ImagesContext)

  const { setImage, changeHistory, setLoading } = useContext(ChangeContext)

  const filterImage = async (filter: customerFilter) => {
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
  }

  return (
    <div className='grid grid-cols-3 gap-2 p-2'>
      {FILTERS_ORDER.adjustment.map((filter) => (
        <Button
          key={filter}
          onClick={() => filterImage(filter)}
          className='rounded-md p-2 capitalize'
        >
          {filter.split('_').join(' ')}
        </Button>
      ))}
    </div>
  )
}

export default AdjustmentsTab
