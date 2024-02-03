import React from "react"
import Container from "./container";

export interface MainProps {
  children?: React.ReactNode
}

export default function Main(props: MainProps) {
  return (
    <main className={`mx-auto px-4 sm:px-6 lg:px-8`}>
      <div
        className={`flex flex-col justify-center items-start max-w-2xl mx-auto mb-16`}
      >
        {props.children}
      </div>
    </main>
  )
}
