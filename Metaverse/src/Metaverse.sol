// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

// Address: 0x83AE6e04aFa3ebB3939dB4B2a45DC42B1B62a970

// create metaverse smart contracts with NFT tokens
contract Metaverse is ERC721, Ownable {
    
    // define name and symbol of NFT token
    constructor() ERC721("META", "YJP"){

    }

    // counters to regulate the current amount of NFTs tokens minted
    // 'using' is used for including a library within a contract in solidity
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    // establish total number of NFTs available
    uint256 public maxSupply = 100;

    // add cost associated with creating NFTs in Metaverse
    uint256 public cost = 100 wei;

    // store data about owner and property each owner has
    mapping(address => Building []) NFTOwners; // Building is an array that contain a list of buildings

    // establish properties of the Metaverse buildings
    struct Building {
        string name;
        int8 width;
        int8 height;
        int8 depth;
        int8 x;
        int8 y;
        int8 z;
    }

    // keep track of the list of Metaverse buildings
    Building[] public buildings;

    // obtain all the buildings created in the Metaverse
    function getBuildings() public view returns (Building [] memory) {
        return buildings;
    }

    // get current supply of NFT tokens created
    function totalSupply() public view returns (uint) {
        return supply.current();
    }

    // create buildings as NFT tokens in the Metaverse
    function mint(string memory _building_name, int8 _width, int8 _height, int8 _depth, int8 _x, int8 _y, int8 _z) public payable {
        require(supply.current() <= maxSupply, "Current supply is greater than max supply!");
        require(msg.value <= cost, "Not enough funds!");
        supply.increment();
        _safeMint(msg.sender, supply.current());
        Building memory _newBuild = Building(_building_name, _width, _height, _depth, _x, _y, _z);
        buildings.push(_newBuild); // required for total length of buildings
        NFTOwners[msg.sender].push(_newBuild); // relate for each owner their NFTs
    }

    // extract funds from smart contract to wallet
    function withdraw() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    // obtain a user's Metaverse buildings
    function getOwnerBuildings() public view returns(Building [] memory){
        return NFTOwners[msg.sender];
    }
}


