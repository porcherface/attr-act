// SPDX-License-Identifier: GPL-3.0

/*
 * Random  
 * @dev: simple random number generator
 * @author porcherface 
 * @version: 0.0.1
 */

pragma solidity >=0.7.0 <0.9.0;

abstract contract Random{
    function random() private view returns (uint) {
	    return uint(keccak256(abi.encodePacked(block.difficulty)));
    }
}