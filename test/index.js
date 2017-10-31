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

test('parse signature', function (t) {
  const sig = 'transfer(address,uint256)'
  const parsed = registry.parse(sig)

  t.equal(parsed.name, 'Transfer')
  t.equal(parsed.args.length, 2)
  t.equal(parsed.args[0].type, 'address')
  t.equal(parsed.args[1].type, 'uint256')
  t.end()
})

