// SPDX-License-Identifier: GPL-3.0

/*
 * Circuit breaker  
 * @dev: Implements an emergency red button
 * @author porcherface 
 * @version: 0.0.1
 */

pragma solidity >=0.7.0 <0.9.0;

contract CircuitBreaker{

	bool private stopped = false;
	address private owner;

	modifier isAdmin() {
	    require(msg.sender == owner);
	    _;
	}

	function toggleContractActive() isAdmin public
	{
	    // You can add an additional modifier that restricts stopping a contract to be based on another action, such as a vote of users
	    stopped = !stopped;
	}

	modifier stopInEmergency { if (!stopped) _; }
	modifier onlyInEmergency { if (stopped) _; }

	function deposit() stopInEmergency public
	{
	    // some code
	}

	function withdraw() onlyInEmergency public
	{
	    // some code
	}

}
