'use client'

import {DiscussionEmbed} from "disqus-react";

interface DisqusCommentProps {
  pageId: string; // slug
  pageTitle: string; // title of the page
}

const DisqusComments = ({ pageId, pageTitle }: DisqusCommentProps) => {
  const disqusShortname = "kimminkyeu.github.io";
  const disqusConfig = {
    url: `https://kimminkyeu.github.io`,
    identifier: pageId, // Single post id // or slug
    title: pageTitle, // Single post title // post title
    language: 'ko',
  }
  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}
export default DisqusComments;