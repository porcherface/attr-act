
PATH_TRUFFLE_WK = '/Users/saramilone/ricciobbello/attr-act'

def getPrivate():
	f = open(PATH_TRUFFLE_WK + '/ropsten.private','r')
	key = f.readline()
	return key



if __name__ == "__main__":
	print(getPrivate())