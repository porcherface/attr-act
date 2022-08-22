// SPDX-License-Identifier: GPL-3.0

/*
 * safemath
 * @dev: implemetation of robust math on uint256
 * @author: porcherface 
 * @version: 0.0.1
 */

pragma solidity >=0.7.0 <0.9.0;

//Safe Math Interface
contract SafeMath {
 
    function safeAdd(uint a, uint b) public pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }
 
    function safeSub(uint a, uint b) public pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }
 
    function safeMul(uint a, uint b) public pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }
 
    function safeDiv(uint a, uint b) public pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}