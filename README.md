# Eth Method Registry [![CircleCI](https://circleci.com/gh/danfinlay/eth-method-registry.svg?style=svg)](https://circleci.com/gh/danfinlay/eth-method-registry)

A javascript library for getting Solidity method data from a four-byte method signature.

Currently uses [the parity on-chain method registry](https://www.bokconsulting.com.au/blog/a-quick-look-at-paritys-signature-registry-contract/), but eventually I am interested in adding various parallel methods, whatever works and returns a valid response!

## Installation

With Node.js Installed:

`npm install eth-method-registry -S`

## Usage

```javascript
const MethodRegistry = require('eth-method-registry')
const Eth = require('ethjs')
const provider = new Eth.HttpProvider('https://mainnet.infura.io')
const registry = new MethodRegistry({ provider })

// Uses promises, pass the 4byte prefix to the lookup method:
registry.lookup('0xa9059cbb')
.then((result) => {
  assert.equal(result, 'transfer(address,uint256)', 'finds correct signature')
})

// Also includes a method for parsing the resulting sig
// into something more useful for rendering:
const sig = 'transferFrom(address,uint256)'
const parsed = registry.parse(sig)
/* Parsed value:
   {
    name :'Transfer From',
    args: [
      { type: 'address' },
      { type: 'uint256' }
    ]
   }
*/
```

