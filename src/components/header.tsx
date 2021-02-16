import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    className={`mx-auto px-4 sm:px-6 lg:px-8`}
  >
    <div className={`flex items-center justify-between h-16 items-center`}>
      <h1>
        <Link
          to="/"
        >
          {siteTitle}
        </Link>
      </h1>
      <a>brianrabil@gmail.com</a>
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
