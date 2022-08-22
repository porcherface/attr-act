# Butterfly
==========

The butterfly project: A series of NFT based on the famous butterfly effect. each nft is the tokenization of a chaotic attractor.
Every attractor is different from each other, every attractor is different from itself at different times, and its pattern never repeats.

BUTTERFLIES (the name we are giving to these systems) are completely #on chain# and they can be reproduced by simple third party hardware or software. the house will also provide to butterfly acquirers a free-from-charge software to reproduce the token at any given moment in time. 

# How it works: 

How to get Caos: request 1 Caos from the faucet address, simply calling the 
    
    faucet.getCaosFromFaucet()

please notice that you can call this function only once


how to get a Butterfly: approve the factory address to transfer 1 CAOS and claim your butterfly using
	
	factory.requestButterfly(address)

you can call this function to gift a butterfly to another address or to yourself, please insert the addr accordingly

the butterfly will be transferred to your address, if you don't see your butterfly address on mint phase you
can use the 

	factory.players

mapping to check your butterfly address




-- ADDRESSES ON ROPSTEN NETWORK --

deployer address: 0x0184c1E2604C59eB49EDBaD5848905b2A70b1Dfb

CAOS      > contract address:    0x679809CB55871173aD52664959e4ad37c89e3e89
FACTORY   > contract address:    0x958dc8d320C7f7124829d35B249eE57bF0FB230c
FAUCET    > contract address:    0xEeffee04B43eec7e7cb79DA4C9602725b716DB23

