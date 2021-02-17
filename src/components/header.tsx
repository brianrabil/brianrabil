import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    className={`mx-auto px-4 sm:px-6 lg:px-8`}
  >
    <div className={`flex items-center justify-between h-24 items-center`}>
      <h1>
        <Link
          to="/"
          className={`text-lg text-black dark:text-white flex items-center`}
        >
          <img className={`h-8 w-8 rounded-full mr-3`} src={`bdr-avatar.jpeg`} />
          <span className={`font-bold italic`}>Brian</span>
          <span className={`italic font-light`}>Rabil</span>
        </Link>
      </h1>
      <a className={`text-lg text-black dark:text-white`}>🚀 brianrabil@gmail.com</a>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
