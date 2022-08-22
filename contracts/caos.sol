// SPDX-License-Identifier: GPL-3.0

/*
 * CAOS-Token
 * @dev: token used to generate a unique attractor
 * @author: porcherface 
 * @version: 0.0.1
 */

pragma solidity >=0.7.0 <0.9.0;

/* ERC20 abstract interface 
 * all functions below must be implemented in this file
 */
abstract contract ERC20Interface {
    function totalSupply() virtual public view returns (uint);
    function balanceOf(address tokenOwner) virtual public view returns (uint balance);
    function allowance(address tokenOwner, address spender) virtual public view returns (uint remaining);
    function transfer(address to, uint tokens) virtual public returns (bool success);
    function approve(address spender, uint tokens) virtual public returns (bool success);
    function transferFrom(address from, address to, uint tokens) virtual public returns (bool success);
 
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}
import "./utils/owner.sol";
import "./utils/safemath.sol";

contract Caos is Owner, SafeMath{

    address public minter;
    string  public symbol;
    string  public name;
    uint8   public decimals;
    uint    private _totalSupply;

    mapping (address => uint) public balances;
    mapping(address => mapping(address => uint)) allowed;
 
    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);
    event Approval(address from, address to, uint amount);

    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    function mint(address receiver, uint amount) public isOwner{
        balances[receiver] += amount;
        emit Sent(address(0x0), msg.sender, _totalSupply);
    }

    // Constructor code is only run when the contract
    // is created
    constructor(){

        
        symbol = "CAOS";
        name = "Caos";
        decimals = 18;    
       _totalSupply = 10**8 * 10**uint256(decimals);

        mint(msg.sender, _totalSupply);
    }

    //want to see my addresss?
    function myAddress() public view returns (address){
        return address(this);
    }

    // Errors allow you to provide information about
    // why an operation failed. They are returned
    // to the caller of the function.
    error InsufficientBalance(uint requested, uint available);

    // Gives the totalSupply of the contract
    function totalSupply() public view returns (uint) {
        return _totalSupply  - balances[address(0)];
    }
 
    // Returns the balances for each addr
    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return balances[tokenOwner];
    }
    

    //TRANSACTION FUNCTIONS
    function approve(address spender, uint tokens) public returns (bool success) {

        require (balances[msg.sender] >= tokens);
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);

        return true;
    }
     
    function transfer(address to, uint tokens) public returns (bool success) {
        require(balances[msg.sender]>=tokens);
        balances[msg.sender] = safeSub(balances[msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Sent(msg.sender, to, tokens);
        return true;
    }
    
    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        require(allowed[from][msg.sender]>=tokens);
        require(balances[from]>=tokens);

        balances[from] = safeSub(balances[from], tokens);
        allowed[from][msg.sender] = safeSub(allowed[from][msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Sent(from, to, tokens);
        return true;
    }

    function allowance(address tokenOwner, address spender) virtual public view returns (uint remaining){
        return allowed[tokenOwner][spender];
    }


}
