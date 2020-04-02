import React from 'react'
import PropTypes from 'prop-types'
import { SupportersPageTemplate } from '../../templates/supporters-page'

const SupportersPagePreview = ({ entry, getAsset, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()

  const entryButtons = entry.getIn(['data', 'buttons'])
  const buttons = entryButtons ? entryButtons.toJS() : []

  const entrySupporters = entry.getIn(['data', 'supporters', 'list'])
  const supportersList = entrySupporters ? entrySupporters.toJS() : []

  const entryContributors = entry.getIn(['data', 'contributors', 'list'])
  const contributorsList = entryContributors ? entryContributors.toJS() : []


  if (data) {    
    return(
      <SupportersPageTemplate
        title={entry.getIn(['data', 'title'])}
        subTitle={entry.getIn(['data', 'subTitle'])}
        buttons={buttons}
        supporters={{
          title: entry.getIn(['data', 'supporters', 'title']),
          list: supportersList
        }}
        contributors={{
          title: entry.getIn(['data', 'contributors', 'title']),
          list: contributorsList
        }}
        content={widgetFor('body')}
      />
    )
  } else {
    return <div>Loading...</div>
  }  
}

SupportersPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
  widgetFor: PropTypes.func,
}

export default SupportersPagePreview
