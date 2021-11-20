from brownie import accounts


def test_article_initialization(deploy_editorial_fixture):
    # Arrange
    editorial = deploy_editorial_fixture
    text_1 = "This is the first text"
    text_2 = "This is the second text"
    text_3 = "This is the third text"
    # Act
    editorial.initArticle(text_1, {"from": accounts[0]})
    editorial.initArticle(text_2, {"from": accounts[5]})
    editorial.initArticle(text_3, {"from": accounts[2]})
    articles = editorial.getSubmittedArticles()
    authors = []
    texts = []
    upvotes = []
    for article in articles:
        authors.append(article[0])
        texts.append(article[1])
        upvotes.append(article[2])
    #assert
    assert texts == [text_1, text_2, text_3]
    assert upvotes == [0, 0, 0]
    assert authors == [accounts[0], accounts[5], accounts[2]]

def test_upvoting(deploy_editorial_fixture):
    # Arrange
    editorial = deploy_editorial_fixture
    upvotes = 5
    # Act
    editorial.initArticle("This is the first text", {"from": accounts[0]})
    for upvote in range(upvotes):
        editorial.upvoteArticle(0)
    # Assert
    assert upvotes == editorial.getUpvotes(0)

def test_frontpage(deploy_editorial_fixture):
    # Arrange
    editorial = deploy_editorial_fixture
    least_upvoted_text = "This is the worst text"
    middle_text = "This is the middle text"
    most_upvoted_text = "This is the most upvoted text"
    # Act
    editorial.initArticle(least_upvoted_text, {"from": accounts[0]})
    editorial.initArticle(middle_text, {"from": accounts[2]})
    editorial.initArticle(most_upvoted_text, {"from": accounts[1]})
    for upvote in range(3):
        editorial.upvoteArticle(0)
    for upvote in range(5):
        editorial.upvoteArticle(1)
    for upvote in range(10):
        editorial.upvoteArticle(2)
    editorial.pinArticleToFrontPage()
    articles = editorial.getFrontpageArticles()
    # Assert
    assert most_upvoted_text == articles[0][1]

