const test = require('tape');
const Eth = require('ethjs');
const { MethodRegistry } = require('../dist');

const { INFURA_PROJECT_ID } = require('rc')('infura', {
  INFURA_PROJECT_ID: null,
})

const provider = new Eth.HttpProvider(`https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`);
const registry = new MethodRegistry({ provider });

test('connecting to main net contract', function (t) {
  t.plan(1);

  registry.lookup('0xa9059cbb')
    .then((result) => {
      t.equal(result, 'transfer(address,uint256)', 'finds correct value');
    })
    .catch((reason) => {
      t.fail(reason.message);
    });
});

test('parse signature', function (t) {
  const sig = 'transfer(address,uint256)';
  const parsed = registry.parse(sig);

  t.equal(parsed.name, 'Transfer');
  t.equal(parsed.args.length, 2);
  t.equal(parsed.args[0].type, 'address');
  t.equal(parsed.args[1].type, 'uint256');
  t.end();
});

test('parse signature without arguments', function (t) {
  const sig = 'drain()';
  const parsed = registry.parse(sig);

  t.equal(parsed.name, 'Drain');
  t.equal(parsed.args.length, 0);
  t.end();
});

test('parse $() dollar-sign signature', function (t) {
  const sig = '$()';
  const parsed = registry.parse(sig);

  t.equal(parsed.name, '$');
  t.equal(parsed.args.length, 0);
  t.end();
});

test('parse _() underscore signature', function (t) {
  const sig = '_()';
  const parsed = registry.parse(sig);

  t.equal(parsed.name, '_');
  t.equal(parsed.args.length, 0);
  t.end();
});

test('parse () fallback signature', function (t) {
  const sig = '()';
  const parsed = registry.parse(sig);

  t.equal(parsed.name, '');
  t.equal(parsed.args.length, 0);
  t.end();
});

test('parsing adds spaces to multi words', function (t) {
  const sig = 'transferFrom(address,uint256)';
  const parsed = registry.parse(sig);

  t.equal(parsed.name, 'Transfer From');
  t.equal(parsed.args.length, 2);
  t.equal(parsed.args[0].type, 'address');
  t.equal(parsed.args[1].type, 'uint256');
  t.end();
});

test('parse signature that includes a tuple as the first param', function (t) {
  const sig = 'method((address,uint256,bytes),uint256,bytes)';
  const parsed = registry.parse(sig);

  t.equal(parsed.name, 'Method');
  t.equal(parsed.args.length, 5);
  t.equal(parsed.args[0].type, 'address');
  t.equal(parsed.args[1].type, 'uint256');
  t.equal(parsed.args[2].type, 'bytes');
  t.equal(parsed.args[3].type, 'uint256');
  t.equal(parsed.args[4].type, 'bytes');
  t.end();
});

test('parse signature that includes a tuple of tuples', function (t) {
  const sig = 'method(((address,uint256),(address,uint256)))';
  const parsed = registry.parse(sig);

  t.equal(parsed.name, 'Method');
  t.equal(parsed.args.length, 4);
  t.equal(parsed.args[0].type, 'address');
  t.equal(parsed.args[1].type, 'uint256');
  t.equal(parsed.args[2].type, 'address');
  t.equal(parsed.args[3].type, 'uint256');
  t.end();
});

test('parse signature that includes a tuple as a middle param', function (t) {
  const sig = 'method(uint256,(address,uint256,bytes),bytes)';
  const parsed = registry.parse(sig);

  t.equal(parsed.name, 'Method');
  t.equal(parsed.args.length, 5);
  t.equal(parsed.args[0].type, 'uint256');
  t.equal(parsed.args[1].type, 'address');
  t.equal(parsed.args[2].type, 'uint256');
  t.equal(parsed.args[3].type, 'bytes');
  t.equal(parsed.args[4].type, 'bytes');
  t.end();
});

test('parse signature that includes a tuple as the last param', function (t) {
  const sig = 'method(uint256,bytes,(address,uint256,bytes))';
  const parsed = registry.parse(sig);

  t.equal(parsed.name, 'Method');
  t.equal(parsed.args.length, 5);
  t.equal(parsed.args[0].type, 'uint256');
  t.equal(parsed.args[1].type, 'bytes');
  t.equal(parsed.args[2].type, 'address');
  t.equal(parsed.args[3].type, 'uint256');
  t.equal(parsed.args[4].type, 'bytes');
  t.end();
});

test('parse signature that includes an array param', function (t) {
  const sig = 'method(uint256[],string)';
  const parsed = registry.parse(sig);

  t.equal(parsed.name, 'Method');
  t.equal(parsed.args.length, 2);
  t.equal(parsed.args[0].type, 'uint256[]');
  t.equal(parsed.args[1].type, 'string');
  t.end();
});
