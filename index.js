const Eth = require('ethjs')
const registryMap = require('./registry-map.json')
const abi = require('./abi')

class MethodRegistry {

  constructor (opts = {}) {
    this.provider = opts.provider ||
      new Eth.HttpProvider('https://mainnet.infura.io/eth-contract-registry')
    this.eth = new Eth(this.provider)
    const address = registryMap[opts.network || '1']

    if (!address) {
      throw new Error('No method registry found on the requested network.')
    }

    this.registry = this.eth.contract(abi).at(address)
  }

  async lookup (bytes) {
    const result = await this.registry.entries(bytes)
    return result[0]
  }

  parse (signature) {
    let name = signature.match(/^.+(?=\()/)
    
    if (name) {
      name = name[0].charAt(0).toUpperCase() + name[0].slice(1).split(/(?=[A-Z])/).join(' ')
    } else {
      name = ''
    }

    const match = signature.match(/\(.+\)/)
    let args = [];
    if (match) {
      args = match[0].slice(1, -1).split(',').map((arg) => { return {type: arg}})
    }
  
    return {
      name,
      args
    }
  }

}

module.exports = MethodRegistry
