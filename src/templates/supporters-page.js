import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

import leftArrow from '../img/svg/arrow-left.svg'
import metadata from '../content/site-metadata.json'  

export const SupportersPageTemplate = ({ seo, title, subTitle, content, introText, buttons, supporters, contributors, contentComponent }) => {
  const PageContent = contentComponent || Content
    
  let perChunk = 4 // items per chunk    
  let inputArray = supporters.list;
  let supportersList = inputArray.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk)

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])

  perChunk = 4;
  inputArray = contributors.list;
  let contributorsList = inputArray.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk)

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])

  return (

    <main className="main">      
      {seo && 
      <Helmet title={seo.title ? seo.title : metadata.siteMetadata.title} titleTemplate={metadata.siteMetadata.titleTemplate}>        
        {seo.description && <meta name="description" content={seo.description} />}
        {seo.image && <meta name="image" content={`${withPrefix('/')}${seo.image.publicURL}`} />}        
        {seo.url && <meta property="og:url" content={seo.url} />}
        {seo.title && <meta property="og:title" content={seo.title} />}
        {seo.description && (
          <meta property="og:description" content={seo.description} />
        )}
        {seo.image && <meta property="og:image" content={`${withPrefix('/')}${seo.image.publicURL}`} />}
        <meta name="twitter:card" content="summary" />
        {seo.twitterUsername && (
          <meta name="twitter:creator" content={seo.twitterUsername} />
        )}        
        {seo.title && <meta name="twitter:title" content={seo.title} />}
        {seo.description && (
          <meta name="twitter:description" content={seo.description} />
        )}
        {seo.image && <meta name="twitter:image" content={`${withPrefix('/')}${seo.image.publicURL}`} />}          
      </Helmet>
      }
      <div className="top-green-line"></div> 
      <section className="hero-intro is-primary hero">
        <div className="hero-body">
          <div className="container container-thin">
            <div className="hero-content">
              <h3 className="hero-title">{title}</h3>
              <div className="hero-entry"><p>{subTitle}</p></div>
            </div>
          </div>
        </div>
      </section> 
      <section className="section section-article-simple">
        <div className="container container-thin">
          <div className="section-body">
            <article className="article-simple default-page">
              <p>{introText}</p>
              <section className="section section-padding-top-0">
                {buttons.map((b, index) => {
                  return (
                    <a href={b.link} className="button is-primary-dark is-rounded" key={index}><span>{b.text}</span>
                      <span className="ico">
                        <img src={leftArrow} alt="Learn More" />
                      </span>
                    </a>
                  )
                })}
                <br/><br/><br/>
                <div className="container1"><h2 className="features">{supporters.title}</h2>
                </div>
                <div className="container container-center">
                  {
                    supportersList.map((d, listIndex) => {
                      return(                    
                        <div className='columns' style={{alignItems: 'center', justifyContent: 'center'}} key={listIndex}>
                          {d.map((i, index) => {
                            return (
                              <div className="column columns-sponsors" key={index}>
                                {i.image ? i.image.extension === 'svg' && !i.image.childImageSharp ? 
                                <img src={!!i.image.publicURL ? i.image.publicURL : i.image} alt={i.alt} className={i.class} />
                                :
                                <img src={!!i.image.childImageSharp ? i.image.childImageSharp.fluid.src : i.image} className={i.class} alt={i.alt} />
                                :
                                ''
                                }     
                              </div>
                            )
                          })}
                        </div>
                      )
                    })
                  }
                  <p>&nbsp;</p>
                </div>
                <div className="container1">
                  <h2 className="features">{contributors.title}</h2>
                </div>
                <div className="container container-center">
                  {
                    contributorsList.map((d, listIndex) => {
                      return(                    
                        <div className='columns' style={{alignItems: 'center', justifyContent: 'center'}} key={listIndex}>
                          {d.map((i, index) => {
                            return (
                              <div className="column columns-sponsors" key={index}>
                                {i.image ? i.image.extension === 'svg' && !i.image.childImageSharp ? 
                                <img src={!!i.image.publicURL ? i.image.publicURL : i.image} alt={i.alt} className={i.class} />
                                :
                                <img src={!!i.image.childImageSharp ? i.image.childImageSharp.fluid.src : i.image} className={i.class} alt={i.alt} />
                                :
                                ''
                                }     
                              </div>
                            )
                          })}
                        </div>
                      )
                    })
                  }
                  <p>&nbsp;</p>
                </div>                
              <PageContent className="content" content={content} />
              <br />
              {buttons.map((b, index) => {
                return (
                  <a href={b.link} className="button is-primary-dark is-rounded" key={index}><span>{b.text}</span>
                    <span className="ico">
                      <img src={leftArrow} alt="Learn More" />
                    </span>
                  </a>
                )
              })}
              </section>
            </article>
          </div> 
        </div>
      </section>
    </main>
  )
}

SupportersPageTemplate.propTypes = {
  seo: PropTypes.object,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  introText: PropTypes.string,
  buttons: PropTypes.object,
  supporters: PropTypes.object,
  contributors: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const SupportersPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SupportersPageTemplate
        contentComponent={HTMLContent}
        seo={post.frontmatter.seo}
        title={post.frontmatter.title}
        subTitle={post.frontmatter.subTitle}
        introText={post.frontmatter.introText}
        buttons={post.frontmatter.buttons}
        supporters={post.frontmatter.supporters}
        contributors={post.frontmatter.contributors}
        content={post.html}        
      />      
    </Layout>
  )
}

SupportersPage.propTypes = {
  data: PropTypes.object.isRequired,
} 

export default SupportersPage

export const supportersPageQuery = graphql`
  query SupportersPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        seo {
          title
          description
          url
          image {
            childImageSharp {
              fluid(maxWidth: 640, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL            
          }
          twitterUsername
        }
        title
        subTitle
        introText
        buttons {
          text
          link
        }
        supporters {
          title
          list {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }            
              extension
              publicURL
            }
            alt
            class
          }
        }
        contributors {
          title
          list {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }            
              extension
              publicURL
            }
            alt
            class
          }
        }
      }
    }
  }
`
