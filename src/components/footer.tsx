import * as React from "react"
import Fade from "react-reveal/Fade"

export default () => (
  <footer className={`flex flex-col bg-gradient-to-r bg-white dark:bg-black`}>
    <Fade>
      <div className={`flex flex-col items-center py-16`}>
        <div
          className={`text-center text-4xl flex flex-col leading-relaxed mb-8 text-white`}
        >
          <span
            className={`font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400 block`}
          >
            Lets make history.
          </span>
          <span className={`text-2xl`}>BrianRabil@gmail.com</span>
        </div>
        <span className={`text-5xl`}>🚀</span>
      </div>
    </Fade>

    <div className={`text-sm py-4 px-4 sm:px-6 lg:px-8 text-purple-200`}>
      © {new Date().getFullYear()}{" "}
      <a href="https://www.brianrabil.com">Brian Rabil</a>
    </div>
  </footer>
)
