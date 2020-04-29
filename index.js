const Eth = require('ethjs')
const registryMap = require('./registry-map.json')
const abi = require('./abi')

class MethodRegistry {

  constructor (opts = {}) {
    if (!opts.provider) {
      throw new Error("Missing required 'provider' option")
    }
    this.provider = opts.provider
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
    const rawName = signature.match(new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$"))
    let parsedName

    if (rawName) {
      parsedName = rawName[1].charAt(0).toUpperCase() + rawName[1].slice(1).split(/(?=[A-Z])/).join(' ')
    } else {
      parsedName = ''
    }

    const match = signature.match(new RegExp(rawName[1] + '\\(+([a-z1-9,()]+)\\)'))

    let args = [];
    if (match) {
      args = match[1].match(/[A-z1-9]+/g).map((arg) => { return {type: arg}})
    }
  
    return {
      name: parsedName,
      args
    }
  }

}

module.exports = MethodRegistry
