const Matic = require('maticjs').default
const config = require('./config')

const from = '0x731dE857EaF204DC4AEB81760B170a14bFF2f696' // from address

// Create object of Matic
const matic = new Matic({
   maticProvider: config.MATIC_PROVIDER,
   parentProvider: config.PARENT_PROVIDER,
   rootChainAddress: config.ROOTCHAIN_ADDRESS,
   syncerUrl: config.SYNCER_URL,
   watcherUrl: config.WATCHER_URL,
   withdrawManagerAddress: config.WITHDRAWMANAGER_ADDRESS,
})

matic.wallet = '0x651F5C24E56FE911A9E181D1AA3567D8B9186DBE863540EB90CAEC2F18EF9BD9' // prefix with `0x`

var transactionHash = '0xa165617d9b964a4c90f19a43a0245e5e4f0e5a1100cc27c31aafd37e5af9d03a' // Insert txHash generated from initiate-withdraw.js 

//Wait for 5 mins till the checkpoint is submitted, then run the confirm withdraw
matic.withdraw(transactionHash, {
   from,
   onTransactionHash: (hash) => {
      // action on Transaction success
      console.log(hash) // eslint-disable-line
      // Withdraw process is completed, funds will be transfer to your account after challege period is over.
   },
})