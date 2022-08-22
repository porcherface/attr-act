const Factory = artifacts.require("Factory");
const Token = artifacts.require("Caos");
const truffleAssert = require('truffle-assertions');
const Butterfly = artifacts.require("Butterfly")
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Factory", 

	function ( accounts ) {

  	describe('Receive Functions', function () {
		/* ********************************** */
		it("checks viewPlayers", async function () {
		let factory;
		factory = await Factory.deployed();
		const zero = await factory.viewPlayers( { from: accounts[0] });
    	return assert.equal(Number(zero), Number(0));
		/* ********************************** */
  	}
	);
  	

		/* ********************************** */
		it("test ownerAdd reverts", async function () {
		let factory;
		factory = await Factory.deployed();
		await truffleAssert.reverts(factory.ownerAdd(accounts[2],{ from: accounts[1] }));
		const zero = await factory.viewPlayers( { from: accounts[0] });
		return assert.equal(Number(zero), Number(0));
		/* ********************************** */
	}
	);

		/* ********************************** */
		it("test ownerAdd", async function () {
		let factory;
		factory = await Factory.deployed();
		await factory.ownerAdd(accounts[1],{ from: accounts[0] });
		
		const one = await factory.viewPlayers( { from: accounts[0] });
    	return assert.equal(Number(one), Number(1));
		/* ********************************** */
  	}
	);


		/* ********************************** */
		it("test enterWithEther", async function () {
		let factory;
		factory = await Factory.deployed();

		const one = await factory.viewPlayers( { from: accounts[0] });
    	assert.equal(Number(one), Number(1));

		let one_eth = web3.utils.toWei(String(1), "ether");
		await web3.eth.sendTransaction({from: accounts[2], to: factory.address, value: one_eth})
		
		const two = await factory.viewPlayers( { from: accounts[0] });
    	return assert.equal(Number(two), Number(2));
		/* ********************************** */
  	}
	);


		/* ********************************** */
		it("test enterWithEther revert", async function () {
		let factory;
		factory = await Factory.deployed();
		
		let small_eth = web3.utils.toWei(String(0.09), "ether");
		await truffleAssert.reverts(web3.eth.sendTransaction({from: accounts[2], to: factory.address, value: small_eth}));
		
		const two = await factory.viewPlayers( { from: accounts[0] });
    	return assert.equal(Number(two), Number(2));
		/* ********************************** */
  	}
	);


		/* ********************************** */
		it("test enterWithCaos", async function () {
		let factory;
		let token;
		factory = await Factory.deployed();
		token = await Token.deployed();
		
		const tokenaddress = await token.myAddress({from: accounts[0]});
		await factory.setToken(tokenaddress, {from:accounts[0]});

		const balance = await token.balanceOf(accounts[0], { from: accounts[0] });
		const supply = await token.totalSupply( { from: accounts[0] });

    	assert.equal(Number(balance), BigInt(10**8 * 10**18));

		//player allows factory
		const approval = await token.approve(factory.address, BigInt(10 * 10**18), { from: accounts[0] });
		await factory.enterWithCaos({from: accounts[0]});
		
		//player calls enter
		const three = await factory.viewPlayers( { from: accounts[0] });
    	return assert.equal(Number(three), Number(3));

		/* ********************************** */
  	
  	}
	);
  	}
	);

  	describe('Request Functions', function () {

		/* ********************************** */
		it("requests a Butterfly", async function () {
		let factory;
		
		factory = await Factory.deployed();

		const preplay = await factory.viewPlayers({from: accounts[0]});
		const premint = await factory.getCounter({from: accounts[0]});

		const zero = await factory.requestButterfly(accounts[0],{from: accounts[0]});
		const btfladdr = await factory.butterflyOf(accounts[0], {from: accounts[0]});
		const owneraddr = await factory.ownerOf(btfladdr, {from: accounts[0]});


		const minted = await factory.getCounter(  {from: accounts[0]});
		const players = await factory.viewPlayers({from: accounts[0]});

		assert.equal(Number(preplay-players), Number(1));
		assert.equal(Number(minted-premint), Number(1));


		return assert.equal(owneraddr,accounts[0]);

		/* ********************************** */
  	
  	}
	);

		/* ********************************** */
		it("gets tokendata", async function () {
		let factory;
		
		factory = await Factory.deployed();

		const btfladdr = await factory.butterflyOf(accounts[0], {from: accounts[0]});
		butterfly = await Butterfly.at(btfladdr);
		const tokendata = await butterfly.getTokenData();

		return assert.equal(Number(tokendata), Number(2666800000133300));
  	}
	);	/* ********************************** */
  	


  	}
	);

});
