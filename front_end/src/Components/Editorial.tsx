import React, { useRef, useState, useEffect } from "react";
import { Button } from "@mui/material";
import useGetSubmittedArticles from "../hooks/useGetSubmittedArticles";
import useGetEditorVoted from "../hooks/useGetEditorVoted";
import useUpvoteArticles from "../hooks/useUpvoteArticles";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useEthers } from "@usedapp/core";
import { constants } from "ethers";
import Article from "./Article";

export default function Editorial() {
  const dispatch = useDispatch()
  const upvotedArticle = useSelector(
    (state: RootStateOrAny) => state.editorial.upvotedArticle
  );
  const { account } = useEthers();  
  const articles = useGetSubmittedArticles();
  const userVoted = useGetEditorVoted(account !== null && account !== undefined ? account : constants.AddressZero);
  const upvoteArticles = useUpvoteArticles();


  // const getAllIndices = (arr: any[], val: any) => {
  //   var indexes = [], i;
  //   for(i = 0; i < arr.length; i++)
  //       if (arr[i] === val)
  //           indexes.push(i);
  //   return indexes;
  // }

  const handleVotes = () => {
    //const articleIndices = getAllIndices(upvoted, true);
    upvoteArticles(upvotedArticle);
  };

  return (
    <div>
      {userVoted ? (
        <h1>Thank you for your vote</h1>
      ) : (
        <div>
          {articles.map((article: [string, string, number], key: number) => (
            <Article
              index={key}
              inEditorial={true}
              text={article[1]}
            />
          ))}
          <Button onClick={handleVotes}>Submit Votes</Button>
        </div>
      )}
    </div>
  );
}
