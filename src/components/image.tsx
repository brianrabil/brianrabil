import * as React from "react"
import Fade from "react-reveal/Fade"

interface ImageCardProps {
  title?: string
  image?: React.ReactNode // Gatsby Static Image
  onClick?: (id: string) => void
}

const Image: React.FC<ImageCardProps> = ({ image, title, onClick }) => {
  return (
    <Fade>
      <div
        onClick={() => onClick && onClick(title)}
        key={title}
        className={`flex flex-col cursor-pointer`}
      >
        {image}
        <div className={`flex items-center justify-between py-2`}>
          <span className={`text-sm text-black dark:text-gray-400`}>
            {title}
          </span>
        </div>
      </div>
    </Fade>
  )
}

export default Image
