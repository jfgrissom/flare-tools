import { ethers } from 'ethers'

export const getProvider = (): ethers.providers.JsonRpcProvider => {
  return new ethers.providers.JsonRpcProvider(
    'https://songbird.towolabs.com/rpc'
  )
}
