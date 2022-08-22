// SPDX-License-Identifier: GPL-3.0

/*
 * simplebank
 * @dev: simple contract for accetting custom token from a sender
 * @author: porcherface 
 * @version: 0.0.1
 */

pragma solidity >=0.7.0 <0.9.0;

abstract contract Token {
    function transferFrom(address sender, address to, uint256 amt) public
    {}
}

contract SimpleBank{
    Token tokenContract;

    constructor(Token _tokenContract) public {
        tokenContract = _tokenContract;
    }
    
    function deposit(uint amt) public returns (bool)  {
        require(amt != 0 , "deposit amount cannot be zero");
        tokenContract.transferFrom(msg.sender, address(this),amt);
        return true;
    }
} 