const test = require('tape')
const MethodRegistry = require('../')
const Eth = require('ethjs')
const provider = new Eth.HttpProvider('https://mainnet.infura.io')
const registry = new MethodRegistry({ provider })

test('connecting to main net contract', function (t) {
  t.plan(1)

  registry.lookup('0xa9059cbb')
  .then((result) => {
    t.equal(result, 'transfer(address,uint256)', 'finds correct value')
  })
  .catch((reason) => {
    t.fail(reason.message)
  })
})
