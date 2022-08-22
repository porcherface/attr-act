const Caos = artifacts.require("Caos");
const truffleAssert = require('truffle-assertions');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Caos", 	function ( accounts ) {


  	describe('Basic Functions', function () {

  		it("should assert true", async function () {
    	await Caos.deployed();
    	return assert.isTrue(true);
  	}
	);
  		
  		it("should return expected gets", async function () {
    	const caos = await Caos.deployed({ from: accounts[0] });
    	const dec = await caos.decimals({ from: accounts[0] });
    	const name = await caos.name({ from: accounts[0] });
    	const symbol = await caos.symbol({ from: accounts[0] });
    	const supply = await caos.totalSupply( { from: accounts[0] });
    	assert.equal("Caos", name);
    	assert.equal(Number(dec), Number(18) );
    	assert.equal("CAOS", symbol);
    	assert.equal(Number(supply), BigInt(10**8 * 10**18));

  	}
	);

		it("checks minter balance", async function () {
		let caos;
		caos = await Caos.deployed();
		const balance = await caos.balanceOf(accounts[0], { from: accounts[0] });
		const supply = await caos.totalSupply( { from: accounts[0] });
    	return assert.equal(Number(balance), Number(supply));
  	}
	);
  	
		it("test transfer", async function () {
		let caos;
		caos = await Caos.deployed();
		await caos.transfer(accounts[1],100, { from: accounts[0] });
		const balance = await caos.balanceOf(accounts[1], { from: accounts[0] });
		return assert.equal(Number(balance), Number(100));	
  	}
	);
  	
		it("test approve", async function () {
		let caos;
		caos = await Caos.deployed();
		await caos.approve(accounts[1],100, { from: accounts[0] });
		const approved = await caos.allowance(accounts[0], accounts[1], { from: accounts[0] });
		return assert.equal(Number(approved), Number(100));	
  	}
	);
  	
		it("test approved transfer", async function () {
		let caos;
		caos = await Caos.deployed();
		await caos.approve(accounts[1],100, { from: accounts[0] });
		const approved = await caos.allowance(accounts[0], accounts[1], { from: accounts[0] });
		await caos.transferFrom(accounts[0], accounts[2], 100, { from: accounts[1] });
		const balance = await caos.balanceOf(accounts[2], { from: accounts[0] });
		return assert.equal(Number(balance), Number(100));	
  	}
	);


	}
	);

  	describe('Reverts', function () {

		it("test illecittransfer", async function () {
		let caos;
		caos = await Caos.deployed();
		const supply = await caos.totalSupply( { from: accounts[0] });
		await truffleAssert.reverts(caos.transferFrom(accounts[0], accounts[3], 100, { from: accounts[3] }));
		const balance = await caos.balanceOf(accounts[0], { from: accounts[0] });
		const thief = await caos.balanceOf(accounts[3], { from: accounts[0] });

		assert.equal(Number(balance), Number(supply));
		return assert.equal(Number(thief), Number(0));
		
  	}
	);
	
	
		it("test not enough funds", async function () {
		let caos;
		caos = await Caos.deployed();
		await truffleAssert.reverts(caos.transfer(accounts[2], 150, { from: accounts[3] }));
		const balance = await caos.balanceOf(accounts[2], { from: accounts[0] });
		assert.equal(Number(balance), Number(100));
		
		await caos.transfer(accounts[0],100, { from: accounts[2] });
		const newbalance = await caos.balanceOf(accounts[2], { from: accounts[0] });
		return assert.equal(Number(newbalance), Number(0));


  	}
	);

	}
	);
});
