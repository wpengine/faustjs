import { gql, useQuery } from '@apollo/client';

export default function Component() {
  const { data } = useQuery(Component.query);

  return <>Testing persisted queries</>;
}

Component.query = gql`
  query MyQuery {
    allSettings {
      discussionSettingsDefaultCommentStatus
      discussionSettingsDefaultPingStatus
      generalSettingsDateFormat
      generalSettingsDescription
      generalSettingsLanguage
      generalSettingsStartOfWeek
      generalSettingsTimeFormat
      generalSettingsTimezone
      generalSettingsTitle
      generalSettingsUrl
      readingSettingsPageForPosts
      readingSettingsPageOnFront
      readingSettingsPostsPerPage
      readingSettingsShowOnFront
      writingSettingsDefaultCategory
      writingSettingsDefaultPostFormat
      writingSettingsUseSmilies
    }
    mediaItems {
      edges {
        node {
          id
          altText
          author {
            node {
              id
            }
          }
          ancestors {
            edges {
              node {
                id
                contentTypeName
                databaseId
                contentType {
                  node {
                    id
                    canExport
                    connectedTaxonomies {
                      edges {
                        node {
                          id
                          description
                          graphqlPluralName
                          graphqlSingleName
                          hierarchical
                          isRestricted
                          label
                          public
                          name
                          restBase
                          restControllerClass
                          showCloud
                          showInAdminColumn
                          showInMenu
                          showUi
                          showInRest
                          showInQuickEdit
                          showInNavMenus
                          showInGraphql
                        }
                      }
                    }
                    conditionalTags {
                      isArchive
                      isAttachment
                      isAuthor
                      isCategory
                      isDate
                      isDay
                      isFrontPage
                      isHome
                      isMonth
                      isMultiAuthor
                      isPage
                      isPageTemplate
                      isPostTypeArchive
                      isPreview
                      isPrivacyPolicy
                      isSearch
                      isSingle
                      isSingular
                      isSticky
                      isTag
                      isTax
                      isYear
                    }
                    contentNodes {
                      edges {
                        node {
                          id
                          guid
                          enclosure
                          desiredSlug
                          databaseId
                          date
                          dateGmt
                          contentTypeName
                          isPreview
                          isContentNode
                          isRestricted
                          isTermNode
                          modified
                          link
                          status
                          slug
                          previewRevisionId
                          previewRevisionDatabaseId
                          modifiedGmt
                          uri
                          templates
                          template {
                            templateName
                          }
                        }
                        cursor
                      }
                    }
                    isFrontPage
                    isRestricted
                    graphqlPluralName
                    graphqlSingleName
                    hasArchive
                    hierarchical
                  }
                }
                conditionalTags {
                  isArchive
                  isPrivacyPolicy
                  isPreview
                  isPostTypeArchive
                  isPageTemplate
                  isPage
                  isMultiAuthor
                  isMonth
                  isHome
                  isFrontPage
                  isDay
                  isDate
                  isCategory
                  isAuthor
                  isAttachment
                  isSingular
                  isSearch
                  isSingle
                  isSticky
                  isTag
                  isTax
                  isYear
                }
                desiredSlug
                dateGmt
                date
                enclosure
                isTermNode
                isRestricted
                isPreview
                isContentNode
                guid
                enqueuedStylesheets {
                  edges {
                    node {
                      id
                    }
                  }
                }
                enqueuedScripts {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            }
          }
        }
        cursor
      }
    }
  }
`;
