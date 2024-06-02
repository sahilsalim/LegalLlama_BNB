//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "./DataFeeds.sol";

contract LegalLlama is ERC721URIStorage {

    DataFeeds public dataFeeds;

    address aggregatorAddress = 0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41;

    constructor() ERC721("LL NFT", "LLNFT") {
        dataFeeds = new DataFeeds(aggregatorAddress);
    }

    bool public isFulfilled = true;
    uint public lastRqstTokenId;

    struct LegalAsset {
        uint256 tokenId;
        address payable owner;
        address payable creator;
        uint256 price;
        bool isSelling;
        string _uri;
        string _pdfHash;
    }

    mapping (uint256 => LegalAsset) public idToAsset;
    uint public tokenId;

    function mintPDF(address _to) public returns (uint) {
        tokenId++;
        _mint(_to, tokenId);
        idToAsset[tokenId] = LegalAsset(
            tokenId,
            payable(msg.sender),
            payable(msg.sender),
            0,
            false,
            "",
            ""
        );
        return tokenId;
    }

    function setURI(uint _tokenId, string memory _tokenURI) public {
        LegalAsset storage asset = idToAsset[_tokenId];
        asset._uri = _tokenURI;
        _setTokenURI(_tokenId, _tokenURI);
    }

    function sell(uint _tokenId, uint _price) public {
        LegalAsset storage asset = idToAsset[_tokenId];
        asset.isSelling = true;
        asset.price = _price;
    } 

    function buy(uint256 _tokenId) public payable {
        LegalAsset memory asset = idToAsset[_tokenId];
        require(msg.value == asset.price, "");
        require(asset.isSelling == true, "");

        uint256 royalty = (asset.price * 3)/100; // 3% royalties
        uint256 remainingFunds = asset.price - royalty;
        asset.creator.transfer(royalty);
        asset.owner.transfer(remainingFunds);

        payable(asset.creator).transfer(royalty);
        payable(asset.owner).transfer(remainingFunds);

        safeTransferFrom(address(this), msg.sender, tokenId);
        idToAsset[tokenId].owner = payable(msg.sender);
    }

    function fetchAllModels() public view returns (LegalAsset[] memory){
        uint counter = 0;
        uint length = tokenId;
        LegalAsset[] memory models = new LegalAsset[](length);
        for (uint i = 1; i <= length; i++) {
            uint currentId = i;
            LegalAsset storage currentItem = idToAsset[currentId];
            models[counter] = currentItem;
            counter++; 
        }
        return models;
    }

    function fetchInventory(address _user) public view returns (LegalAsset[] memory){
        uint counter = 0;
        uint length;

        for (uint i = 1; i <= tokenId; i++) {
            if (idToAsset[i].owner == _user) {
                length++;
            }
        }

        LegalAsset[] memory models = new LegalAsset[](length);
        for (uint i = 1; i <= tokenId; i++) {
            if (idToAsset[i].owner == _user) {
                uint currentId = i;
                LegalAsset storage currentItem = idToAsset[currentId];
                models[counter] = currentItem;
                counter++;
            }
        }
        return models;
    }

    function getPriceInUsd(uint _tokenId) public view returns (uint) {
        uint _amount = idToAsset[_tokenId].price;
        return dataFeeds.calculate(_amount);
    }
}