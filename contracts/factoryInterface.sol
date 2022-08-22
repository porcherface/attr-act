// SPDX-License-Identifier: GPL-3.0

/*
 * butterfly-Factory
 * @dev: clonefactory for the BUTTERFLY token
 * @author: porcherface 
 * @version: 0.0.1
 */

pragma solidity >=0.7.0 <0.9.0;

import "./caos.sol";
import "./utils/owner.sol";
import "./butterfly.sol";

// we only need the transfer from our CAOS token
interface factoryIERC20 {

    function transferFrom(address _from, address _to, uint256 _amount) external returns (bool);
    function balanceOf(address tokenOwner) external returns (uint);
}

abstract contract FactoryInterface{
    
    address public tokenAddress;

    mapping(address => bool) public players;

    uint256 num_players;
    uint256 butterflyCounter;
 
    mapping (address => address) public ownerOf;
    mapping (address => address) public butterflyOf; /* unused for now */

    event ButterflyBorn(address addr, address owner);
    event addedPlayer(address player);
    event etherReceived(address from, uint amount);
    event caosReceived(address from, uint amount);

    receive() virtual external payable;
    function enterWithCaos()virtual public;
    function setToken(address tokenaddr)virtual public;
    function checkBalance(address buyer)virtual public returns (uint);
    function ownerAdd(address player)virtual public;
    function viewPlayers()virtual public view returns (uint);
	function requestButterfly(address player)virtual public payable returns (address);
    function getCounter ()virtual public view returns(uint) ;

}


