const defaultState = {
  upvotedArticle: null
};

export function editorial(state: any = defaultState, action: any) {
  switch (action.type) {
    case "SET_UPVOTED_ARTICLE":
      return {
        ...state, 
        upvotedArticle: action.payload.articleIndex 
      }
    default:
      return state;
  }
}
