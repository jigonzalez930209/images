import { useState, useCallback, useContext } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'

import { ImagesContext } from 'src/lib/context/ImageContext'
import { ImagesGridColumns } from 'src/lib/utils/const'
import useImages from 'src/hooks/use-images'
import { IImage } from 'src/lib/interfaces'
import { cn } from 'src/lib/utils'

import SortableItem from './SortableItem'
import Item from './Item'

const Container = () => {
  const { images, putImages } = useImages()
  const { imagesState } = useContext(ImagesContext)

  const [activeId, setActiveId] = useState<IImage | null>(null)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setActiveId(images.find((i) => i.id === event.active.id))
    },
    [images],
  )
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      if (active.id !== over?.id) {
        const oldIndex = images.findIndex((img) => img.id === active.id)
        const newIndex = images.findIndex((img) => img.id === over!.id)
        const newImages = arrayMove<IImage>(images, oldIndex, newIndex)

        putImages(newImages)
      }

      setActiveId(null)
    },
    [images],
  )
  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  return (
    images.length > 0 && (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={images} strategy={rectSortingStrategy}>
          <div
            className={cn(
              'overflow-auto border-t bg-background',
              'scrollbar-none',
              ImagesGridColumns[imagesState.columns],
              'grid gap-5 scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-md',
            )}
          >
            {images?.map((img) => <SortableItem key={img?.id} image={img} />)}
          </div>
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
          {activeId?.id ? <Item image={activeId} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    )
  )
}

export default Container
