export function setUpvotedArticle(articleIndex: number) {
  return {
    type: "SET_UPVOTED_ARTICLE",
    payload: {
      articleIndex: articleIndex,
    },
  };
}
