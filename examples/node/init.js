const Matic = require('maticjs').default
const config = require('./config')
const chalk = require("chalk");
const figlet = require("figlet")
const util = require('util')


console.log(chalk.blue(
    figlet.textSync('storj@matic', {
        horizontalLayout: 'default',
        font: 'Fraktur'
    })
))
// Create object of Matic
// 

