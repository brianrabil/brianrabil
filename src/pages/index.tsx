import React from "react"
import { Link, PageProps } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Jumbotron from '../components/jumbotron';
import TechnologiesGrid from '../components/technologies-grid'
import PortfolioGrid from '../components/portfolio-grid'

const IndexPage = (props: PageProps) => (
  <Layout>
    <SEO title="Home" />
    <Jumbotron />
    <TechnologiesGrid />
    <PortfolioGrid />
  </Layout>
)

export default IndexPage
