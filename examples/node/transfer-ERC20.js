const Matic = require('maticjs').default
const config = require('./config')
const chalk = require("chalk");
const ora = require('ora');

console.log("-----------------------------------------------------------------------------------")
console.log(chalk.bold.cyanBright('TRANSFERRING 4 STORJ-MATIC TOKENS EACH TO 10 STORAGE NODES ON MATIC-CHAIN'));
console.log("-----------------------------------------------------------------------------------")

const from = config.FROM_ADDRESS // from address
const recipientArray = [
  '0x16b79A3A5f4f5AaB3645EFdBf05fe16427826B8B',
  '0xF1889b038a43C34940bC5e39C1c14dA4F3ddAF31',
  '0x158a02C80142c9c9EB401825705AD2d7b43D4dd4',
  '0xeD6eE51F98389B2dEC1fe235dc839eA5ca3454bA',
  '0xBCD355d31969De61c08920c47433f7b36B59De3C',
  '0xd7ee6e731a830D973a4B93eA03080Bab74E2600c',
  '0x0481bDA39e00bCC24ac276903BcDF3893D8A97ca',
  '0x731dE857EaF204DC4AEB81760B170a14bFF2f696',
  '0xdae8b45F8652a117b9fDe42cEB2F5FAbCf763775',
  '0x94769Db0F7a1baeC132Fbb1D3494D04B5D1831af'
] // Storage node addresses

const token = config.MATIC_TEST_TOKEN // test token address
const tokenMain = config.ROPSTEN_TEST_TOKEN
const amount = '200000000000000000' // amount in wei

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
})

matic.wallet = config.PRIVATE_KEY // prefix with `0x`

// Send Tokens
for (const recipient of recipientArray) {
  matic.transferTokens(token, recipient, amount, {
    from,
    // parent: true, // For token transfer on Main network (false for Matic Network)
    onTransactionHash: (hash) => {
      // action on Transaction success
      console.log(chalk.bold.white("Recipient:\t\t", recipient))
      console.log(chalk.bold.white("Transaction hash:\t", hash)) // eslint-disable-line
      console.log("-----------------------------------------------------------------------------------------------")
    },
  })
}
