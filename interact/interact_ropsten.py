# interact_ganache.py
import web3
import json
from utils.abi import getAbi
from utils.private import getPrivate

try:
	import utils.account
except:
	print("accounts.py not found, skipping")

# this script makes python interact with the ropsten public blockchain
# using infura provider
w3 = web3.Web3(web3.HTTPProvider('https://ropsten.infura.io/v3/9b60a47c62674390b98e45168938a5fc'))


print(w3.clientVersion)


token_address		 = "0x679809CB55871173aD52664959e4ad37c89e3e89"
factory_address      = "0x958dc8d320C7f7124829d35B249eE57bF0FB230c"
faucet_address       = "0xEeffee04B43eec7e7cb79DA4C9602725b716DB23"

w3.eth.default_account = w3.eth.account.privateKeyToAccount(getPrivate())
default_address = str(w3.eth.default_account.address)

print(w3.eth.default_account)
print(default_address)

if __name__ == "__main__":
	
	token = w3.eth.contract(address = token_address, abi = getAbi("Caos"))
	
	
	factory = w3.eth.contract(address = factory_address, abi = getAbi("Factory"))
	faucet = w3.eth.contract(address = faucet_address, abi = getAbi("Faucet"))
	decimals = token.functions.decimals().call({'from': default_address})
	balance = token.functions.balanceOf(default_address).call({'from': default_address}) / 10**decimals

	print("CAOS token balance")
	print(balance)


	ans = "x"
	butterfly_address = None

	while ans != "q" and ans != None:

		if ans == "a":
			print("Adding self to player list (onlyowner)")
			factory.functions.ownerAdd(wallet_address).call({'from': default_address})

		'''
		if ans == "m":
			print("Minting a butterfly for self")
			butterfly_address = factory.functions.requestButterfly(wallet_address).call({'from': w3.eth.accounts[0]})
			print("minted at: "+str(butterfly_address))
		'''

		if ans == "f":
			print("Factory state: ")
			counter = factory.functions.getCounter().call({'from': default_address})
			players = factory.functions.viewPlayers().call({'from': default_address})
			print("-flies minted: "+str(counter))
			print("-players in list: "+str(players))

		'''	
		if ans == "g":
			print("Getting butterfly tokendata")
			butterfly = w3.eth.contract(address = butterfly_address, abi = getAbi("Butterfly"))
			tokendata = butterfly.functions.getTokenData().call({'from': w3.eth.accounts[0]})
		'''


		if ans == "b":
			print("faucet Balance: ")
			faucetBalance = faucet.functions.getCaosBalance().call({'from': default_address})
			print(faucetBalance/ 10**decimals)
			print("faucet Balance from tokenRegistry: ")
			faucetBalance = token.functions.balanceOf(faucet_address).call({'from': default_address})
			print(faucetBalance/ 10**decimals)

		'''
		if ans == "d":	
			faucetaddr = faucet.functions.myAddress().call()
			print("faucet aDdress:"+ str(faucetaddr))
		'''


		ans = input("what u want to do?")
		
