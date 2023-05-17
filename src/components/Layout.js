import React from 'react'
import { withPrefix } from 'gatsby'
import { Helmet } from 'react-helmet'
import SEO from '../components/SEO'
import TopBar from '../components/TopBar'
import NavigationWidget from 'navigation-widget/dist';
import 'navigation-widget/dist/index.css';
import { getEnvVariable, SPONSORED_PROJECT_ID } from '../utils/envVariables'
import sponsoredProjects from "../content/sponsored-projects.json";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import '../style/style.scss'

const TemplateWrapper = ({ children }) => {

  const currentProject = parseInt(getEnvVariable(SPONSORED_PROJECT_ID));

  return (
    <div>
      <Helmet>
        <html lang="en" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />
      </Helmet>
      <SEO />
      <NavigationWidget projects={sponsoredProjects} currentProject={currentProject} containerClass="container" navbarTitle="An OpenInfra Foundation Project" popupTitle="More OpenInfra Foundation Projects" />
      {/* <TopBar /> */}
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper