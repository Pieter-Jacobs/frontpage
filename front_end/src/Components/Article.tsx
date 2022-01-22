import { faTh, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import DOMpurify from "dompurify"
import React, { useState } from "react";

interface props {
  text: string;
  index?: number;
  upvoted?: boolean[];
  setUpvoted?: (upvoted: boolean[]) => void;
}


export default function Article(props: props) {
  const handleUpvote = () => {
    if (props.upvoted && props.index && props.setUpvoted) {
      const upvoted_copy = [...props.upvoted];
      upvoted_copy[props.index] = !upvoted_copy[props.index];
      props.setUpvoted(upvoted_copy);
    }
  };

  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: DOMpurify.sanitize(props.text)}}></div>
      {props.upvoted && props.index !== undefined && props.setUpvoted ? (
        <ToggleButtonGroup>
          <ToggleButton selected={props.upvoted[props.index]} onClick={handleUpvote} value="check">
            <FontAwesomeIcon icon={faThumbsUp} />
          </ToggleButton>
        </ToggleButtonGroup>
      ) : null
      }
    </div>
  );
}
