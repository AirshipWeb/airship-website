import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

import metadata from '../content/site-metadata.json'

export const UsersPageTemplate = ({ seo, title, subTitle, introduction, table, videos, content, contentComponent }) => {
  const PageContent = contentComponent || Content

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
              <p>{introduction}</p>
              <table className="table is-bordered" style={{width:'100%'}}>
                <thead>
                  <tr>                    
                    {table.header.map((col, index) => {                      
                      return (
                        <th className={index === 0 ? 'is-usecase-header-left':'is-usecase-header-right'} key={index}>{col.column}</th>
                      )
                    })}                    
                  </tr>
                </thead>
                <tbody>
                  {table.body.map((row, index) => {
                    return (
                      <tr key={index}>
                      {row.row.map((col, index) => {                        
                        return (
                          <th className={index === 0 ? 'is-usecase-left':'is-usecase-right'} key={index}>{col.column}</th>
                        )
                      })}
                      </tr>                                   
                    )
                  })}
                </tbody>
              </table>
              <PageContent className="content" content={content} />
              {videos.map((video, index) => {
                return (
                  <React.Fragment key={index}>
                    <br />
                    <div className="h2_green">{video.title}</div>
                    <div className="video-wrapper"><iframe width="560" height="315" src={video.url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe></div>
                  </React.Fragment>
                )
              })}
            </article>
          </div> 
        </div>
      </section>
    </main>
  )
}

UsersPageTemplate.propTypes = {
  seo: PropTypes.object,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  introduction: PropTypes.string,
  table: PropTypes.object,
  videos: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const UsersPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <UsersPageTemplate
        seo={post.frontmatter.seo}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        subTitle={post.frontmatter.subTitle}
        introduction={post.frontmatter.introduction}
        table={post.frontmatter.table}
        videos={post.frontmatter.videos}
        content={post.html}
      />
    </Layout>
  )
}

UsersPage.propTypes = {
  data: PropTypes.object.isRequired,
} 

export default UsersPage

export const UsersPageQuery = graphql`
  query usersPage($id: String!) {
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
        introduction
        table {
          header {
            column
          }
          body {
            row {
              column
            }
          }
        }
        videos {
          title
          url
        }      
      }
    }
  }
`
