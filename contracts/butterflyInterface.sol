// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/*
 * Attractor
 * @dev custom structs and functions for BTFL NFT
 * @author: porcherface 
 * @version: 0.0.1
 */
import "./utils/owner.sol";
import "./utils/counters.sol";

abstract contract ButterflyInterface{
    
    function myAddress() virtual public view returns (address);
    function setOwner(address newOwner) virtual public;
    function getTokenId()  virtual public view returns (uint);
    function getTokenCode() virtual public view returns (uint);
    function getTokenData() virtual public view returns (uint);

}