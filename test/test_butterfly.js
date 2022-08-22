const Factory = artifacts.require("Factory");
const Token = artifacts.require("Caos");
const truffleAssert = require('truffle-assertions');
const Butterfly = artifacts.require("Butterfly");
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

module.exports = function(deployer) {
  deployer.deploy(Butterfly, 0);
};

contract("Butterfly", 

	function ( accounts ) {


  describe('Basic Functions', function () {
		/* ********************************** */
  		it("should assert true", async function () {
    	return assert.isTrue(true);
		/* ********************************** */
  		}
		);


		/* ********************************** */
  		it("should be unique", async function () {
    	const token = await Token.deployed();
    	const factory = await Factory.deployed();

      let one_eth = web3.utils.toWei(String(1), "ether");
      await web3.eth.sendTransaction({from: accounts[2], to: factory.address, value: one_eth})
      await web3.eth.sendTransaction({from: accounts[1], to: factory.address, value: one_eth})
      
      const zero = await factory.requestButterfly(accounts[1],{from: accounts[1]});
      const one = await factory.requestButterfly(accounts[2],{from: accounts[2]});
  
    	const butterfly1 = await Butterfly.at(zero);
    	const butterfly2 = await Butterfly.at(zero);


      return zero;

		/* ********************************** */
  		}
		);

  }
  );

  		/* MORE TESTS HERE */


});
