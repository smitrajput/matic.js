const Matic = require('maticjs').default
const config = require('./config')
const chalk = require("chalk");
const figlet = require("figlet")


// Create object of Matic
const matic = new Matic({
    maticProvider: config.MATIC_PROVIDER,
    parentProvider: config.PARENT_PROVIDER,
    rootChainAddress: config.ROOTCHAIN_ADDRESS,
    syncerUrl: config.SYNCER_URL,
    watcherUrl: config.WATCHER_URL,
    maticWethAddress: config.MATICWETH_ADDRESS,
})
matic.wallet = config.PRIVATE_KEY // prefix with `0x`

const ropstenTokenAddress = config.ROPSTEN_TEST_TOKEN // token address on mainchain
const maticTokenAddress = config.MATIC_TEST_TOKEN
const from = config.FROM_ADDRESS // from address

console.log("-----------------------------------------------------------------------------------")
console.log(chalk.bold.cyanBright("SATELLITE NODE MAIN-CHAIN AND MATIC-CHAIN BALANCES"))
console.log("-----------------------------------------------------------------------------------")
matic.balanceOfERC20(from, ropstenTokenAddress, {
    parent: true, // For token balance on Main network (false for Matic Network)
    from: from
}).then((balance) => {
    // action on Transaction success
    console.log(chalk.bold.white("Main-Chain balance of " + from + ":\t" + (balance / Math.pow(10, 18)).toFixed(3))) // eslint-disable-line
})


matic.balanceOfERC20(from, maticTokenAddress, {
    parent: false, // For token balance on Main network (false for Matic Network)
    from: from
}).then((balance) => {
    // action on Transaction success
    console.log(chalk.bold.white("Matic-Chain balance of " + from + ":\t" + (balance / Math.pow(10, 18)).toFixed(3))) // eslint-disable-line
})


// matic.balanceOfERC20(from, tokenAddress, {
//   // parent: true, // For token balance on Main network (false for Matic Network)
// }).then((hash) => {
//   // action on Transaction success
//   console.log(hash) // eslint-disable-line
// })