const Factory = artifacts.require("Factory");
const Token = artifacts.require("Caos");
const truffleAssert = require('truffle-assertions');
const Butterfly = artifacts.require("Butterfly");
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Butterfly", 

	function ( accounts ) {


  describe('Basic Functions', function () {
		/* ********************************** */
  		it("should assert true", async function () {
    	const token = await Token.deployed();
    	const factory = await Factory.deployed();
    	const butterfly = await Butterfly.deployed();

    	return assert.isTrue(true);
		/* ********************************** */
  		}
		);


		/* ********************************** */
  		it("should be unique", async function () {
    	const token = await Token.deployed();
    	const factory = await Factory.deployed();
    	const butterfly1 = await Butterfly.deployed();
    	const butterfly2 = await Butterfly.deployed();
		/* ********************************** */
  		}
		);

  }
  );

  		/* MORE TESTS HERE */


});
