# abi.py
import json

PATH_TRUFFLE_WK = '/Users/saramilone/ricciobbello/attr-actor'


def getAbi(contract_name):
	
	return json.load(open(PATH_TRUFFLE_WK + '/build/contracts/'+contract_name+'.json'))['abi']
