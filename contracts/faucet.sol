// SPDX-License-Identifier: GPL-3.0

/*
 * caos-faucet
 * @dev: clonefactory for the BUTTERFLY token
 * @author: porcherface 
 * @version: 0.0.1
 */

pragma solidity >=0.7.0 <0.9.0;

import "./caos.sol";
import "./utils/owner.sol";
import "./utils/safemath.sol";

// we only need the transfer from our CAOS token
interface faucetIERC20 {
    function transfer(address _to, uint256 _amount) external returns (bool);
    function transferFrom(address _from, address _to, uint256 _amount) external returns (bool);
    function balanceOf(address tokenOwner) external view returns (uint);
}

contract Faucet is Owner, SafeMath{

	address public tokenAddress;

    faucetIERC20 private _token;

    uint private _faucetSize;

    mapping(address => bool) receivers;
    event faucetOpened(uint tokensAvailable);
    event faucetEmitted(address receiver);

    constructor(address tokenaddr){ 
        tokenAddress = tokenaddr;
    	_token = faucetIERC20(tokenaddr);
        _faucetSize = 1000;
    }
    function setToken(address tokenaddr) public isOwner {
        _token = faucetIERC20(tokenaddr);
    }

    function getCaosBalance () public view returns (uint) {
        return (_token.balanceOf(address(this)));
    }
    
    function myAddress() public view returns (address){
        return (address(this));
    }

    function setFaucetSize (uint256 newSize) public isOwner returns(uint)  {
        require ( _token.balanceOf(address(this)) > safeAdd(_faucetSize, newSize) );
        _faucetSize = safeAdd(_faucetSize, newSize);
        emit faucetOpened(_faucetSize);
        return _faucetSize;
    }

    function getFaucetSize () public view returns(uint)   {
        return _faucetSize;
    
    }

    /* *********************************************** */
    /* *********************************************** */
    function getCaosFromFaucet () public payable returns(bool)  {
        require(_token.balanceOf(address(this)) > 0, "faucet has no funds");
        require(_faucetSize > 0, "faucet is closed for now");
        require(receivers[msg.sender] == false, "sender is greylisted");

        receivers[msg.sender] = true;
        _token.transfer(msg.sender, 1*10**18);
        _faucetSize = safeSub(_faucetSize, 1);
        emit faucetEmitted(msg.sender);
        return false;
    }
    /* *********************************************** */
    /* *********************************************** */

    receive() external payable{

    }
}
