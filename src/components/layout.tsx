/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from "react"
import { Container } from './container'
import { Header } from "./header"
import { Footer } from './footer'

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)
  const data = {} as any;

  return (
    <div className={`bg-white dark:bg-black`}>
      <Header siteTitle={"Brian Rabil"} />
      <div>
        <main>
          <Container>
            {children}
          </Container>
        </main>
        <Footer />
      </div>
    </div>
  )
}

