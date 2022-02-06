import { faTh, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { setUpvotedArticle } from "../actions/editorial";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import DOMpurify from "dompurify"
import React, { useState } from "react";

interface props {
  text: string;
  index?: number;
  inEditorial: boolean
}


export default function Article(props: props) {
  const dispatch = useDispatch()
  const upvotedNumber = useSelector(
    (state: RootStateOrAny) => state.editorial.upvotedArticle
  ) 
  const upvoted = useSelector(
    (state: RootStateOrAny) => state.editorial.upvotedArticle
  ) === props.index

  const handleUpvote = () => {
    if(props.index !== undefined) {
      console.log(upvotedNumber)
      dispatch(setUpvotedArticle(props.index));
      console.log(upvotedNumber)
    }
  };
  
  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: DOMpurify.sanitize(props.text)}}></div>
      {props.inEditorial ? (
        <ToggleButtonGroup>
          <ToggleButton selected={upvoted} onClick={handleUpvote} value="check">
            <FontAwesomeIcon icon={faThumbsUp} />
          </ToggleButton>
        </ToggleButtonGroup>
      ) : null
      }
    </div>
  );
}
