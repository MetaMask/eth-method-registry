declare module '@metamask/ethjs-types' {
  export interface RegistryContract {
    at (address: string): DeployedRegistryContract;
  }
  export interface DeployedRegistryContract {
    entries (bytes: string): Promise<string[]>;
  }
}
declare module '@metamask/ethjs-query' {
  class Eth {
    constructor(provider: any);
  }
  export=Eth;
}
declare module '@metamask/ethjs-contract' {
  import Eth from '@metamask/ethjs-query';
  import { RegistryContract } from '@metamask/ethjs-types';

  function EthContract(query: Eth): (abi: Record<string, unknown>) => RegistryContract;
  export=EthContract;
}
