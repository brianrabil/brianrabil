import React from "react"
import Fade from "react-reveal/Fade"

export default () => {
  return (
    <div className="py-12 md:pt-24 md:pb-12">
      <Fade>
        <div className={`max-w-2xl`}>
          <h4 className={`text-2xl font-medium mb-3 flex items-center`}>
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400 block`}
            >
              Welcome!
            </span>{" "}
            <span>👋</span>
          </h4>
          <h2 className={`text-xl text-black dark:text-white leading-relaxed`}>
            <p className={`mb-4`}>
              I'm a UI/UX engineer based in the Washington D.C. area. I
              specialize in web application development with Typescript, React,
              and Redux. Over the course of my career, I've had the privilege of
              working with the CIA, Department of Defense, the Marines, Foxconn,
              SAIC, banks, hospitals, and entrepreneurs. I plan on adding more
              content to this site soon. Stay tuned!
            </p>
          </h2>
        </div>
      </Fade>
    </div>
  )
}
