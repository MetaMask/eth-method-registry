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

test('parse signature without arguments', function (t) {
  const sig = 'drain()'
  const parsed = registry.parse(sig)

  t.equal(parsed.name, 'Drain')
  t.equal(parsed.args.length, 0)
  t.end()
})

test('parse $() dollar-sign signature', function (t) {
  const sig = '$()'
  const parsed = registry.parse(sig)

  t.equal(parsed.name, '$')
  t.equal(parsed.args.length, 0)
  t.end()
})

test('parse _() underscore signature', function (t) {
  const sig = '_()'
  const parsed = registry.parse(sig)

  t.equal(parsed.name, '_')
  t.equal(parsed.args.length, 0)
  t.end()
})

test('parse () fallback signature', function (t) {
  const sig = '()'
  const parsed = registry.parse(sig)

  t.equal(parsed.name, '')
  t.equal(parsed.args.length, 0)
  t.end()
})

test('parsing adds spaces to multi words', function (t) {
  const sig = 'transferFrom(address,uint256)'
  const parsed = registry.parse(sig)

  t.equal(parsed.name, 'Transfer From')
  t.equal(parsed.args.length, 2)
  t.equal(parsed.args[0].type, 'address')
  t.equal(parsed.args[1].type, 'uint256')
  t.end()
})

