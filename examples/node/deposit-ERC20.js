const Matic = require('maticjs').default
const config = require('./config')
const figlet = require("figlet")
// const moment = require("moment");
const chalk = require("chalk");
const ora = require('ora');


console.log("-----------------------------------------------------------------------------------")
console.log(chalk.bold.cyanBright('DEPOSITING STORJ TOKENS TO MATIC-CHAIN'));
console.log("-----------------------------------------------------------------------------------")

const token = config.ROPSTEN_TEST_TOKEN // test token address
const amount = '10000000000000000000' // amount in wei
const from = config.FROM_ADDRESS // from address

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
})

matic.wallet = config.PRIVATE_KEY // prefix with `0x`

// Approve token
matic
  .approveERC20TokensForDeposit(token, amount, {
    from,
    onTransactionHash: (hash) => {
      // action on Transaction success
      console.log(chalk.bold.greenBright("STORJ tokens approved for deposit"))
      console.log(chalk.bold.white("Transaction hash:", hash)) // eslint-disable-line
    },
  })
  .then(() => {
    // Deposit tokens
    matic.depositERC20Tokens(token, from, amount, {
      from,
      onTransactionHash: (hash) => {
        // action on Transaction success
        console.log(chalk.bold.greenBright("STORJ tokens deposited to Matic-Chain"))
        console.log(chalk.bold.white("Transaction hash:", hash)) // eslint-disable-line
      },
    })
  })
