import { Button } from "@mui/material";
import React from "react";
import useGetFrontpageArticles from "../hooks/useGetFrontpageArticles";
import usePinArticleToFrontpage from "../hooks/usePinArticleToFrontpage";
import Article from "./Article";

export default function Frontpage() {
  const pinToFrontPage = usePinArticleToFrontpage();
  const articles = useGetFrontpageArticles();
  const handlePin = () => {
    pinToFrontPage();
  };
  return (
    <div>
      <Button onClick={handlePin}>Add best article</Button>
      {articles.map((article: any) => 
          <Article text={article[1]} />
      )}
    </div>
  );
}
