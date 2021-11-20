pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

struct Article {
    address author;
    string text;
    uint upvotes;
}

contract Editorial {
    Article[] frontpageArticles; 
    Article[] submittedArticles;
    mapping (address => Article[]) authorToArticles;

    function findMostUpvotedArticle() private view returns (Article memory _article){
        uint mostUpvotedArticleIndex = 0;
        for(uint i=1; i < submittedArticles.length; i++) {
            if (submittedArticles[i].upvotes > submittedArticles[mostUpvotedArticleIndex].upvotes) {
                mostUpvotedArticleIndex = i;
            }
        }
        return submittedArticles[mostUpvotedArticleIndex];
    }

    function pinArticleToFrontPage() private {
        Article memory article = findMostUpvotedArticle();
        frontpageArticles.push(article);
    }

    function initialiseArticle(address _author, string memory _text) public {
        Article memory article = Article(_author, _text, 0);
        authorToArticles[_author].push(article);
        submittedArticles.push(article);
    }
    
    function emptyArticles(Article[] storage _articles) internal {
        while(_articles.length > 0)
            _articles.pop();
    }

    function upvoteArticle(uint articleIndex) public {
        submittedArticles[articleIndex].upvotes += 1;
    }
    
}