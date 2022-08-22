const { reverting } = require('./helpers/shouldFail');
const chai = require('chai')
const assert = chai.assert;

const Token = artifacts.require('Caos')
const Faucet = artifacts.require('Faucet')

contract('Faucet', function (accounts) {
  
  const deployer = accounts[0];
  const randomAccount = accounts[1];

  beforeEach(async function () {
    // deploy mom, which deploys daughter and son
      token = await Token.deployed();
      faucet = await Faucet.deployed();
      const tokenaddress = await token.address;
      await faucet.setToken(tokenaddress, {from:deployer});
          
  });

  describe('Basic Functions', function () {
    it('it should assert true', async function () {
      return assert.isTrue(true);
    });
  
    it('it should get Caos balance', async function () {
      const res = await token.transfer(faucet.address, BigInt(10000*10**18), {from: deployer});
      const caosBalance = await faucet.getCaosBalance();
      return assert.equal(BigInt(10000*10**18), BigInt(caosBalance));    
    });
    it('must revert in case of setToken from random', async function () {
      await reverting(faucet.setToken({from: randomAccount}));    
      return;
     });
  });

  


  describe('Owner Functions', function () {
    it('should set faucet size', async function () {
      await faucet.setFaucetSize(1000);
      const newsize = await faucet.getFaucetSize();
      return assert.equal(newsize,2000);   
    });

  });




  describe('Faucet Functions', function () {
    it('should give 1 Caos once', async function () {
      res = await faucet.getCaosFromFaucet({from: randomAccount});
      const newsize = await faucet.getFaucetSize();

      one = await token.balanceOf(randomAccount);
      assert.equal(BigInt(10**18), one);   
      return assert.equal(newsize,2000 - 1);
    });
    it('should revert when asked twice', async function () {
      let small_eth = web3.utils.toWei(String(0.01), "ether");
      await reverting( faucet.getCaosFromFaucet({from: randomAccount, value: small_eth}) );
      const newsize = await faucet.getFaucetSize();

      one = await token.balanceOf(randomAccount);
      assert.equal(BigInt(10**18), one);   
      return assert.equal(newsize,2000 - 1);  
    });
  
  });  
});