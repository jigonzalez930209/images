import { useContext } from 'react'
import { ImagesContext } from 'src/lib/context/ImageContext'
import { ChangeContext } from '../../ChangeContext'
import { FILTERS_ORDER, Filters, applyFilter } from '../../filters'

const EffectsTab = () => {
  const {
    imagesState: { imageEdit },
  } = useContext(ImagesContext)

  const { setImage, changeHistory, setLoading } = useContext(ChangeContext)

  const filterImage = async (filter: Filters) => {
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
    <div className='grid grid-cols-3 gap-2'>
      {FILTERS_ORDER.effects.map((filter) => (
        <button
          key={filter}
          onClick={() => filterImage(filter)}
          className=' rounded-md p-2 capitalize'
        >
          {filter.split('_').join(' ')}
        </button>
      ))}
    </div>
  )
}

export default EffectsTab
