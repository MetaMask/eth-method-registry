# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.0.0]
### Changed
- **BREAKING**: Support for Node.js v12 and v14 have been removed. Minimum Node.js version is now `16.20` ([#57](https://github.com/MetaMask/eth-method-registry/pull/57))
- **BREAKING**: `@babel/runtime@^7.0.0` is now a peerDependency ([#62](https://github.com/MetaMask/eth-method-registry/pull/62))
- These private `MethodRegistry` properties are now removes: `eth`, `provider`, `registry` ([#60](https://github.com/MetaMask/eth-method-registry/pull/60))
- Replace dependency `@metamask/ethjs` with used subdependencies `@metamask/ethjs-query` and `@metamask/ethjs-contract` ([#61](https://github.com/MetaMask/eth-method-registry/pull/61))

### Fixed
- Remove undocumented peerDependency on `babel-runtime` ([#62](https://github.com/MetaMask/eth-method-registry/pull/62))

## [3.0.0]
### Changed
- **BREAKING**: These `MethodRegistry` properties are now parked as private: `eth`, `provider`, `registry` ([#31](https://github.com/MetaMask/eth-method-registry/pull/31))
- Update from `ethjs@^0.4.0` to `@metamask/ethjs@^0.5.0` ([#50](https://github.com/MetaMask/eth-method-registry/pull/50))

### Fixed
- Fix constructor options interface name ([#25](https://github.com/MetaMask/eth-method-registry/pull/25))

## [2.0.0] - 2021-01-10
### Added
- Support method signatures with array arguments ([#22](https://github.com/MetaMask/eth-method-registry/pull/22))

### Changed
- **(SEMVER-MAJOR)** Require `provider` argument ([#15](https://github.com/MetaMask/eth-method-registry/pull/15))
- **(SEMVER-MAJOR)** Move from default to named `MethodRegistry` export ([#21](https://github.com/MetaMask/eth-method-registry/pull/21))
- Migrate to TypeScript ([#21](https://github.com/MetaMask/eth-method-registry/pull/21))

## [1.2.0] - 2019-04-15
### Added
- Support method signatures with tuple arguments ([#6](https://github.com/MetaMask/eth-method-registry/pull/6))

[Unreleased]: https://github.com/MetaMask/eth-method-registry/compare/v4.0.0...HEAD
[4.0.0]: https://github.com/MetaMask/eth-method-registry/compare/v3.0.0...v4.0.0
[3.0.0]: https://github.com/MetaMask/eth-method-registry/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/MetaMask/eth-method-registry/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/MetaMask/eth-method-registry/releases/tag/v1.2.0
