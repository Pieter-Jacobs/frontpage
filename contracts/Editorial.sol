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

    function pinArticleToFrontPage() public {
        Article memory article = findMostUpvotedArticle();
        frontpageArticles.push(article);
    }

    function initArticle(string memory _text) public {
        Article memory article = Article(msg.sender, _text, 0);
        authorToArticles[msg.sender].push(article);
        submittedArticles.push(article);
    }
    
    function emptyArticles(Article[] storage _articles) internal {
        while(_articles.length > 0)
            _articles.pop();
    }

    function upvoteArticle(uint articleIndex) public {
        require(articleIndex < submittedArticles.length, "Article index does not exist");
        submittedArticles[articleIndex].upvotes += 1;
    }

    function getUpvotes(uint articleIndex) public view returns (uint _upvotes) {
        require(articleIndex < submittedArticles.length, "Article index does not exist");
        return submittedArticles[articleIndex].upvotes;
    }

    function getSubmittedArticles() public view returns (Article[] memory _submittedArticles){
        return submittedArticles;
    }

    function getFrontpageArticles() public view returns (Article[] memory _frontpageArticles){
        return frontpageArticles;
    }
}