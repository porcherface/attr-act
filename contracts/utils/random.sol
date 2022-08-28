// SPDX-License-Identifier: GPL-3.0

/*
 * Random  
 * @dev: simple random number generator
 * @author porcherface 
 * @version: 0.0.1
 */

pragma solidity >=0.7.0 <0.9.0;

abstract contract Random{
        
    uint public constant MAX = uint(0) - uint(1); // using underflow to generate the maximum possible value
    uint public constant SCALE = 500;
    uint public constant SCALIFIER = MAX / SCALE;
    uint public constant OFFSET = 100; 

    function randomish() public view returns(uint) {
        uint seed = uint(keccak256(abi.encodePacked(now)));
        uint scaled = seed / SCALIFIER;
        uint adjusted = scaled + OFFSET;
        return adjusted;
    }

}