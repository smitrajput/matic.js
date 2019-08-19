const Matic = require('maticjs').default
const config = require('./config')
const chalk = require("chalk");

const token = config.MATIC_TEST_TOKEN // test token address
const amount = '1000000000000000000' // amount in wei
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

// NOTE: Initiate the withdraw on the Matic chain, and wait for ~5 minutes for 
// the checkpoint (refer https://whitepaper.matic.network/#checklayer for technical details) 
// before confirming the withdraw by executing `confirm-withdraw.js`.
// The txHash from the output needs to be copied to the `confirm-withdraw.js` file before executing
console.log("-----------------------------------------------------------------------------------")
console.log(chalk.bold.cyanBright("WITHDRAWING 4 STORJ-MATIC TOKENS FROM MATIC-CHAIN"))
console.log("-----------------------------------------------------------------------------------")
matic
  .startWithdraw(token, amount, {
    from,
    onTransactionHash: (hash) => {
      console.log(chalk.bold.blue("Withdraw Initiated"))
      console.log(chalk.bold.white("Storage Node Address:\t", from))
      console.log(chalk.bold.white("Transaction Hash:\t", hash))
    },
  })
