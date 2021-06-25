import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Image from "./image"
import Fade from "react-reveal/Fade"

export default () => {
  return (
    <div className={`py-12`}>
      <Fade>
        <h2 className={`text-3xl font-medium mb-8 flex items-center`}>
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400 block`}
          >
            Recent works
          </span>
        </h2>
      </Fade>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
        <Image
          title="Warrior Academy"
          image={
            <StaticImage
              src="../images/warrior-academy-mockup.png"
              alt="Warrior Academy"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        />
        <Image
          title="My Financial"
          image={
            <StaticImage
              src="../images/my-financial-mockup.png"
              alt="My Financial"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        />
        <Image
          title="Warrior Academy Course Platform"
          image={
            <StaticImage
              src="../images/warrior-academy-learning-mockup.png"
              alt="Warrior Academy Course Platform"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        />
        <Image
          title="Synthetic Analyst"
          image={
            <StaticImage
              src="../images/sa-module-builder-mockup.png"
              alt="Synthetic Analyst"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        />
        <Image
          title="Compeat"
          image={
            <StaticImage
              src="../images/compeat-mockup.png"
              alt="Compeat"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        />
        <Image
          title="CAP Map"
          image={
            <StaticImage
              src="../images/cap-map-mockup.png"
              alt="CAP Map"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        />
        <Image
          title="GMARS Logo"
          image={
            <StaticImage
              src="../images/gmars-logo.png"
              alt="GMARS Logo"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        />
      </div>
    </div>
  )
}
