pragma solidity ^0.8.0;
import "./KeeperCompatibleInterface.sol";
// SPDX-License-Identifier: MIT

struct Article {
    address author;
    string text;
    address[] voters;
}

struct Ad {
    string imageHash;
    string ipfsInfo;
}

struct SponsorBid {
    address bidder;
    uint256 amount;
    address sponsor;
}

contract Journal is KeeperCompatibleInterface {
    
    /* State variables */
    Article[] frontpageArticles;
    Article[] submittedArticles;
    address[] editors;

    mapping(address => uint256) userBalances;
    mapping(address => uint256[]) articlesToVoteOn;
    mapping(address => bool) hasVoted;
    mapping(address => bool) isEditor;
    mapping(address => Article[]) authorToArticles;

    SponsorBid highestSponsorBid;
    Ad currentAd;
    address currentSponsor;
    address owner;
    uint256 frontpageSize;
    uint256 lastTimeStamp;
    uint256 interval;
    // First entry is owner, second is frontpage author and third the voters
    uint256[3] private rewardDistributionPercentages = [20, 40, 40];

    /* Modifiers */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlySponsor() {
        require(msg.sender == currentSponsor);
        _;
    }

    modifier onlyEditor() {
        require(isEditor[msg.sender]);
        _;
    }

    constructor(uint256 _frontpageSize, uint256 _interval) {
        owner = msg.sender;
        frontpageSize = _frontpageSize;
        interval = _interval;
        lastTimeStamp = block.timestamp;
        isEditor[owner] = true;
    }

    function initArticle(string memory _text) external {
        address[] memory voters;
        Article memory article = Article(msg.sender, _text, voters);
        authorToArticles[msg.sender].push(article);
        submittedArticles.push(article);
    }

    function voteForArticles(uint256 articleIndex) external onlyEditor {
        require(hasVoted[msg.sender] != true, "You have already voted.");
        require(
            submittedArticles[articleIndex].author != msg.sender,
            "You can't vote on your own article"
        );
        submittedArticles[articleIndex].voters.push(msg.sender);
        hasVoted[msg.sender] = true;
    }


    // Vurnerable to reentrancy
    function withdrawRewards(address _withdrawer) external {
        require(userBalances[_withdrawer] > 0, "You have nothing to withdraw");
        uint256 amount = userBalances[_withdrawer]; 
        userBalances[_withdrawer] = 0;
        payable(msg.sender).transfer(amount);
    }

    // amount doesnt have to be in the bid, can just check msg.value
    function bidOnAdPlacement(SponsorBid calldata _sponsorBid)
        external
        payable
    {
        require(
            _sponsorBid.amount > highestSponsorBid.amount,
            "Bid is not higher than the highest bid"
        );
        require(
            msg.value == _sponsorBid.amount,
            "Erroneous transaction: amount transferred is not correct"
        );
        // First save the bid to be returned to previous ad buyer
        // This order is necassary because it is possible the contract would otherwise not have the needed amount to refund
        SponsorBid memory bidTobeReturned = highestSponsorBid;
        highestSponsorBid = _sponsorBid;
        // Return money to previous highest bid
        require(
            getTreasuryBalance() < bidTobeReturned.amount,
            "Erroneous transaction: Do not have the required amount to refund"
        );
        payable(bidTobeReturned.bidder).transfer(bidTobeReturned.amount);
    }

    function setCurrentAd(Ad memory _currentAd) external onlySponsor {
        currentAd = _currentAd;
    }

    function setFrontpageSize(uint256 _frontpageSize) external onlyOwner {
        require(_frontpageSize != 0, "Frontpage can't be empty");
        frontpageSize = _frontpageSize;
    }

    //Called by Chainlink Keepers to check if work needs to be done
    function checkUpkeep(
        bytes calldata /*checkData */
    ) external view override returns (bool upkeepNeeded, bytes memory) {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
    }

    //Called by Chainlink Keepers to handle work
    function performUpkeep(bytes calldata) external override {
        require(
            (block.timestamp - lastTimeStamp) > interval,
            "It is not yet time for the treasury to be paid"
        );
        require(getTreasuryBalance() > 0, "There is no money in the treasury");
        publishToFrontpage();
        lastTimeStamp = block.timestamp;
        currentSponsor = highestSponsorBid.sponsor;
    }

    function getArticleVotes(uint256 articleIndex)
        external
        view
        returns (uint256)
    {
        require(
            articleIndex < submittedArticles.length,
            "Article index does not exist"
        );
        return submittedArticles[articleIndex].voters.length;
    }

    function getFrontpageSize() external view returns (uint256) {
        return frontpageSize;
    }

    function getSubmittedArticles() external view returns (Article[] memory) {
        return submittedArticles;
    }

    function getFrontpageArticles() external view returns (Article[] memory) {
        return frontpageArticles;
    }

    function deposit(uint256 amount) public payable {
        require(
            msg.value == amount,
            "Erroneous transaction: amount transferred is not correct"
        );
    }

    function getTreasuryBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function payVoters() private {
        uint256 voteCount = 0;
        for (uint256 i = 0; i < submittedArticles.length; i++) {
            voteCount += submittedArticles[i].voters.length;
        }
        uint256 reward = ((rewardDistributionPercentages[2] *
            getTreasuryBalance()) / 100) / voteCount;
        for (uint256 i = 0; i < submittedArticles.length; i++) {
            for (uint256 j = 0; j < submittedArticles[i].voters.length; j++) {
                userBalances[submittedArticles[i].voters[j]] += reward;
            }
        }
    }

    function payAuthors() private {
        uint256 reward = ((rewardDistributionPercentages[1] *
            getTreasuryBalance()) / 100) / frontpageSize;
        for (uint256 i = 0; i < frontpageSize; i++) {
            userBalances[
                frontpageArticles[frontpageArticles.length - i + 1].author
            ] += reward;
        }
    }

    function payOwner() private {
        uint256 reward = (rewardDistributionPercentages[0] *
            getTreasuryBalance()) / 100;
        userBalances[owner] += reward;
    }

    function publishToFrontpage() private {
        for (uint256 i = 0; i < frontpageSize; i++) {
            (
                Article memory article,
                uint256 mostVotedOnArticleIndex
            ) = findMostUpvotedArticle();
            frontpageArticles.push(article);
            isEditor[article.author] = true;
            delete submittedArticles[mostVotedOnArticleIndex].voters;
        }
        // Submitted articles get deleted
        delete submittedArticles;
    }

    function findMostUpvotedArticle()
        private
        view
        returns (Article storage, uint256)
    {
        uint256 mostVotedOnArticleIndex = 0;
        for (uint256 i = 1; i < submittedArticles.length; i++) {
            if (
                submittedArticles[i].voters.length >
                submittedArticles[mostVotedOnArticleIndex].voters.length
            ) {
                mostVotedOnArticleIndex = i;
            }
        }
        return (
            submittedArticles[mostVotedOnArticleIndex],
            mostVotedOnArticleIndex
        );
    }
}
