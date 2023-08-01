import * as React from 'react'

import FilterTabs from './FilterTabs'

interface EditorContainerProps {
  children: React.ReactNode
}

const EditorContainer = ({ children }: EditorContainerProps) => {
  return (
    <div className='grid grid-cols-7 h-[80%] '>
      <div className='col-span-2'>
        <FilterTabs />
      </div>
      <div className='w-full h-[80%] col-span-5'>{children}</div>
    </div>
  )
}

export default EditorContainer
