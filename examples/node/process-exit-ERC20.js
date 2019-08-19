
const Matic = require('maticjs').default
const config = require('./config')

const from = '0x731dE857EaF204DC4AEB81760B170a14bFF2f696' // from address
const rootTokenAddress = config.ROPSTEN_TEST_TOKEN // Root token address

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

// NOTE: Wait for NFT Challenge period tobe complete
matic.processExits(rootTokenAddress, {
   from,
   onTransactionHash: (hash) => {
      // action on Transaction success
      // DEVNOTE: on sucessfull processExits funds will be transfered to your mainchain account
      console.log(hash) // eslint-disable-line
   },
})