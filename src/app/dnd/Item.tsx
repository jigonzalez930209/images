import { forwardRef, HTMLAttributes, CSSProperties, useState } from 'react'
import { DraggableAttributes } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { GripVertical } from 'lucide-react'

import { IImage } from 'src/lib/interfaces'
import { Button } from 'src/ui/button'

export type ItemProps = HTMLAttributes<HTMLDivElement> &
  IImage & {
    withOpacity?: boolean
    isDragging?: boolean
    attributes?: DraggableAttributes
    listeners?: SyntheticListenerMap
  }

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, withOpacity, isDragging, style, listeners, attributes, ...props }, ref) => {
    const [showHandles, setShowHandles] = useState(false)

    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? '0.5' : '1',
      borderRadius: '10px',
      boxShadow: isDragging
        ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px'
        : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
      transform: isDragging ? 'scale(1.05)' : 'scale(1)',
      ...style,
    }

    const handleMouseEnter = () => setShowHandles(true)

    const handleMouseLeave = () => setShowHandles(false)

    return (
      <div
        ref={ref}
        style={inlineStyles}
        {...props}
        className='relative h-fit rounded-md border p-2 hover:shadow-md'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showHandles && (
          <div className='absolute left-0 top-2 flex w-full justify-between'>
            <div></div>
            <Button
              variant='link'
              {...listeners}
              {...attributes}
              style={{
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              className=' hover:cursor-grab'
            >
              <GripVertical className='h-7 w-7 rounded-md bg-background py-1' />
            </Button>
          </div>
        )}
        <img src={props.image} alt={props.name} className='h-fit w-full rounded-sm object-cover' />
        <div>{props.name}</div>
      </div>
    )
  }
)

export default Item
