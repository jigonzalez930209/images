import { ChangeProvider } from './ChangeContext'
import Editor2 from './Editor2'

const Editor = () => {
  return (
    <ChangeProvider>
      <Editor2 />
    </ChangeProvider>
  )
}

export default Editor
