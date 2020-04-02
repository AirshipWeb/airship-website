import React from 'react'
import PropTypes from 'prop-types'
import { UsersPageTemplate } from '../../templates/users-page'

const UsersPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()

  const entryHeader = entry.getIn(['data', 'table', 'header'])
  const headerList = entryHeader ? entryHeader.toJS() : []

  const entryRow = entry.getIn(['data', 'table', 'body', 'row'])
  const rowList = entryRow ? entryRow.toJS() : []

  const entryVideos = entry.getIn(['data', 'videos'])
  const videosList = entryVideos ? entryVideos.toJS() : []

  if (data) {
    return (
      <UsersPageTemplate
        title={entry.getIn(['data', 'title'])}
        subTitle={entry.getIn(['data', 'subTitle'])}
        introduction={entry.getIn(['data', 'introduction'])}
        table={{
          header: headerList,
          body: rowList,          
        }}
        videos={videosList}
        content={widgetFor('body')}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

UsersPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default UsersPagePreview
