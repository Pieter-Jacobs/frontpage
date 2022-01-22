import React, { useRef, useState, useEffect } from "react";
import { Button } from "@mui/material";
import useGetSubmittedArticles from "../hooks/useGetSubmittedArticles";
import useGetEditorVoted from "../hooks/useGetEditorVoted";
import Article from "./Article";
import useUpvoteArticles from "../hooks/useUpvoteArticles";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useEthers } from "@usedapp/core";
import { constants } from "ethers";

export default function Editorial() {
  const { account } = useEthers();  
  const articles = useGetSubmittedArticles();
  const submittedVotes = useGetEditorVoted(account !== null && account !== undefined ? account : constants.AddressZero);
  const upvoteArticles = useUpvoteArticles();
  const [upvoted, setUpvoted] = useState<Array<boolean>>(
    new Array(articles.length).fill(false)
  );

  const getAllIndices = (arr: any[], val: any) => {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
  }
  const handleVotes = () => {
    const articleIndices = getAllIndices(upvoted, true);
    upvoteArticles(articleIndices);
  };

  return (
    <div>
      {submittedVotes ? (
        <h1>Thank you for your vote</h1>
      ) : (
        <div>
          {articles.map((article: [string, string, number], key: number) => (
            <Article
              index={key}
              text={article[1]}
              upvoted={upvoted}
              setUpvoted={setUpvoted}
            />
          ))}
          <Button onClick={handleVotes}>Submit Votes</Button>
        </div>
      )}
    </div>
  );
}
