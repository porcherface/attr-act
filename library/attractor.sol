// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/*
 * Attractor
 * @dev custom structs and functions for BTFL NFT
 * @author: porcherface 
 * @version: 0.0.1
 */

 contract Attractor{
    struct Params {
        uint256 sigma;
        uint256 rho;
        uint256 beta;
        uint256 time_decimals;
        uint256 mint_time;
        string name;
        string author;
        string id;
    }
}