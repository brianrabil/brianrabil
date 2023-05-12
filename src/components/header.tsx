import * as React from "react"
import Link from "next/link"
import Image from "next/image"

interface HeaderProps {
  siteTitle?: string
}

export default function Header({ siteTitle }: HeaderProps) {
  return (
    <header className={`mx-auto px-4 sm:px-6 lg:px-8`}>
      <div className={`flex items-center justify-between h-24`}>
        <h1>
          <Link
            href="/"
            className={`text-lg text-black dark:text-white flex items-center`}
          >
            <div
              className={`rounded-full overflow-hidden flex items-center justify-center mr-3`}
              style={{ height: 36, width: 36 }}
            >
              <Image
                className={`rounded-full overflow-hidden`}
                src="/images/bdr-avatar.jpeg"
                alt="BDR"
                layout="fixed"
                loading="lazy"
                height={36}
                width={36}
              />
            </div>
            <span className={`font-semibold`}>Brian </span>
            <span className={`font-light`}>Rabil</span>
          </Link>
        </h1>
        <div>
          <Link
            className={`text-base text-black dark:text-white flex items-center hover:text-purple-600 dark:hover:text-purple-200 cursor-pointer transition duration-150 ease-in-out`}
            href="/about"
          >
            About
          </Link>
          <a
            className={`text-base text-black dark:text-white flex items-center hover:text-purple-600 dark:hover:text-purple-200 cursor-pointer transition duration-150 ease-in-out`}
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              ></path>
            </svg>{" "}
            brianrabil@gmail.com
          </a>
        </div>
      </div>
    </header>
  )
}
