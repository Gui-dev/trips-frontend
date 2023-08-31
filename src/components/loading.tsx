import { FaSpinner } from 'react-icons/fa'

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 z-40 flex h-screen w-full items-center justify-center overscroll-none bg-white">
      <h1 className="animate-spin text-3xl text-primary-normal">
        <FaSpinner />
      </h1>
    </div>
  )
}

export default Loading
