pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

contract Article {
    address author;
    uint upvotes; 
    string text;

    constructor(string memory _text) {
        upvotes = 0;
        author = msg.sender;
        text = _text;
    }

    function incrementUpvotes() public {
        upvotes++;
    }
}

