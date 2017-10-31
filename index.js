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

}

module.exports = MethodRegistry
