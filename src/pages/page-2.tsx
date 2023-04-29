import * as React from "react"
import { Layout } from "../components/layout"
import Link from "next/link"

export default function SecondPage(props: any) {
  return (
    <Layout>
      {/* <SEO title="Page two" /> */}
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2 ({props.path})</p>
      <Link href="/">Go back to the homepage</Link>
    </Layout>
  )
}
