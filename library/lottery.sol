// SPDX-License-Identifier: GPL-3.0

/*
 * Lottery  
 * @dev: Implements a random lottery among registered users
 * @author porcherface 
 * @version: 0.0.1
 */

pragma solidity >=0.7.0 <0.9.0;

contract Lottery {
  address public manager;
  address[] public players;

  constructor() public {
    manager = msg.sender;
  }

  function enter() public payable {
    require(msg.value > .01 ether);

    players.push(msg.sender);
  }

  function random() private view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, now, players)));
  }

  function pickWinner() public restricted {
    uint index = random() % players.length;

    players[index].transfer(address(this).balance);

    players = new address[](0);
  }

  function getPlayers() public view returns (address[]) {
    return players;
  }

  modifier restricted() {
    require(msg.sender == manager);
    _;
  }
}