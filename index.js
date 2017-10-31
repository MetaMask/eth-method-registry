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
    let name = signature.match(/^.+(?=\()/)[0]
    name = name.charAt(0).toUpperCase() + name.slice(1)
    const args = signature.match(/\(.+\)/)[0].slice(1, -1).split(',')

    return {
      name,
      args: args.map((arg) => { return {type: arg}})
    }
  }

}

module.exports = MethodRegistry
