'use client'

import {DiscussionEmbed} from "disqus-react";

interface DisqusCommentProps {
  pageId: string; // slug
  pageTitle: string; // title of the page
}

// https://kimminkyeu-github-io.disqus.com/admin/settings/general/
const DisqusComments = ({ pageId, pageTitle }: DisqusCommentProps) => {
  const disqusShortname = "kimminkyeu-github-io";
  const disqusConfig = {
    url: `https://kimminkyeu.github.io/${pageId}`,
    identifier: pageId, // Single post id // or slug
    title: pageTitle, // Single post title // post title
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
