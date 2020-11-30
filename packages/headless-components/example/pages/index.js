import React from 'react'
import Head from 'next/head'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import { initializeApollo, addApolloState } from '../lib/apollo'
import { WPMenu, WP_MENU_QUERY } from '@wpengine/headless-components'

const Index = ({ allPosts: { edges }, preview }) => {
  const heroPost = edges[0]?.node
  const morePosts = edges.slice(1)

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          {/* TODO: extract Menu to Intro component. */}
          <WPMenu />
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.featuredImage?.node}
              date={heroPost.date}
              author={heroPost.author?.node}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          <WPMenu location='footer' />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)
  const apolloClient = initializeApollo()

  await apolloClient.query({ query: WP_MENU_QUERY })

  return addApolloState(apolloClient, {
    props: { allPosts, preview },
    revalidate: 1
  })
}

export default Index
