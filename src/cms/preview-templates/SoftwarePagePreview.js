import React from 'react'
import PropTypes from 'prop-types'
import { SoftwarePageTemplate } from '../../templates/software-page'

const SoftwarePagePreview = ({ entry, getAsset, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()

  const entryIntro = entry.getIn(['data', 'intro', 'text', 'paragraph'])
  const paragraphList = entryIntro ? entryIntro.toJS() : []

  const entryColumnsIntro = entry.getIn(['data', 'intro', 'columns'])
  const introColumns = entryColumnsIntro ? entryColumnsIntro.toJS() : []

  if (data) {    
    return(
      <SoftwarePageTemplate
        title={entry.getIn(['data', 'title'])}
        subTitle={entry.getIn(['data', 'subTitle'])}
        intro={{          
          video: entry.getIn(['data', 'intro', 'video']),
          text: paragraphList,
          columns: introColumns
        }}
        content={widgetFor('body')}
      />
    )
  } else {
    return <div>Loading...</div>
  }  
}

SoftwarePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default SoftwarePagePreview
