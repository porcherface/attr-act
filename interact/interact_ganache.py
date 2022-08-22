# interact_ganache.py
import web3
import json
from utils.abi import getAbi

# this script makes python interact with the ganache local blockchain

w3 = web3.Web3(web3.HTTPProvider('http://127.0.0.1:7545'))


print(w3.clientVersion)


token_address		 = "0xaB1310F54bA225b5b0124CC702df8943f22e6ef0"
factory_address      = "0x4a519d1f36556B53742ebc06eed6E8f0E6A95920"
wallet_address       = "0x9eeeB99b306926C947182F80bE81730bC4d22F81"
second_wallet		 = "0x295f5E1763AA97b611cE0C47a39E4e6dd170D9a5"
wallet_private_key   = "56c039041b352428b34293b668ce402011703e286b92d3ae0a886ad86cf97833"
faucet_address       = "0x6755e51e869753de6976a1611a51C6464Ccb2440"
wallet_address_int   = 0x9eeeB99b306926C947182F80bE81730bC4d22F81

w3.eth.default_account = wallet_address
print(w3.eth.default_account)

if __name__ == "__main__":
	
	token = w3.eth.contract(address = token_address, abi = getAbi("Caos"))
	factory = w3.eth.contract(address = factory_address, abi = getAbi("Factory"))
	faucet = w3.eth.contract(address = faucet_address, abi = getAbi("Faucet"))
	decimals = token.functions.decimals().call()
	balance = token.functions.balanceOf(wallet_address).call() / 10**decimals

	print("CAOS token balance")
	print(balance)


	ans = "x"
	butterfly_address = None

	while ans != "q" and ans != None:

		if ans == "a":
			print("Adding self to player list (onlyowner)")
			factory.functions.ownerAdd(wallet_address).call({'from': w3.eth.accounts[0]})

		if ans == "m":
			print("Minting a butterfly for self")
			butterfly_address = factory.functions.requestButterfly(wallet_address).call({'from': w3.eth.accounts[0]})
			print("minted at: "+str(butterfly_address))

		if ans == "f":
			print("Factory state: ")
			counter = factory.functions.getCounter().call({'from': w3.eth.accounts[0]})
			players = factory.functions.viewPlayers().call()
			print("-flies minted: "+str(counter))
			print("-players in list: "+str(players))

		if ans == "g":
			print("Getting butterfly tokendata")
			butterfly = w3.eth.contract(address = butterfly_address, abi = getAbi("Butterfly"))
			tokendata = butterfly.functions.getTokenData().call({'from': w3.eth.accounts[0]})

		if ans == "b":
			print("faucet Balance: ")
			faucetBalance = faucet.functions.getCaosBalance().call()
			print(faucetBalance/ 10**decimals)
			print("faucet Balance from tokenRegistry: ")
			faucetBalance = token.functions.balanceOf(faucet_address).call()
			print(faucetBalance/ 10**decimals)

		if ans == "d":	
			faucetaddr = faucet.functions.myAddress().call()
			print("faucet aDdress:"+ str(faucetaddr))




		ans = input("what u want to do?")


