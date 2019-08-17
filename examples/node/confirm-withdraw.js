const Matic = require('maticjs').default
const config = require('./config')

const from = '0xbAe664A51Bf25898bC587F8A1C650bebC2EF4CF3' // from address

// Create object of Matic
const matic = new Matic({
   maticProvider: config.MATIC_PROVIDER,
   parentProvider: config.PARENT_PROVIDER,
   rootChainAddress: config.ROOTCHAIN_ADDRESS,
   syncerUrl: config.SYNCER_URL,
   watcherUrl: config.WATCHER_URL,
   withdrawManagerAddress: config.WITHDRAWMANAGER_ADDRESS,
})

matic.wallet = '0x32171443ED60EC782E2C54F68C1003FBB09A502A78F5DEC2173E0C6FECE0EF65' // prefix with `0x`

var transactionHash = '0xb7f43f1d666907c7e73dae5503f59c7d84aebd834feddd7e1688b429b01d2689' // Insert txHash generated from initiate-withdraw.js 

//Wait for 5 mins till the checkpoint is submitted, then run the confirm withdraw
matic.withdraw(transactionHash, {
   from,
   onTransactionHash: (hash) => {
      // action on Transaction success
      console.log(hash) // eslint-disable-line
      // Withdraw process is completed, funds will be transfer to your account after challege period is over.
   },
})