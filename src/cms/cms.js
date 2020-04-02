import CMS from 'netlify-cms-app'

import CommunityPagePreview from './preview-templates/CommunityPagePreview'
import SoftwarePagePreview from './preview-templates/SoftwarePagePreview'
import SupportersPagePreview from './preview-templates/SupportersPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import UsersPagePreview from './preview-templates/UsersPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

import { Widget as FileRelationWidget } from '@ncwidgets/file-relation'
import { Widget as IdWidget } from '@ncwidgets/id'

CMS.registerWidget(IdWidget)
CMS.registerWidget(FileRelationWidget)

CMS.registerPreviewStyle('style/styles.scss');

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('software', SoftwarePagePreview)
CMS.registerPreviewTemplate('users', UsersPagePreview)
CMS.registerPreviewTemplate('community', CommunityPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('supporters', SupportersPagePreview)