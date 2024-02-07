declare module '@metamask/ethjs-types' {
  export interface RegistryContract {
    at (address: string): DeployedRegistryContract;
  }
  export interface DeployedRegistryContract {
    entries (bytes: string): Promise<string[]>;
  }
}
declare module '@metamask/ethjs' {
  import type { RegistryContract } from '@metamask/ethjs-types';

  class Eth {
    constructor(provider: any);

    contract(abi: Record<string, unknown>): RegistryContract;
  }
  export=Eth;
}
