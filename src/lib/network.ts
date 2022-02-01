import { ethers } from 'ethers'

export const getProvider = (): ethers.providers.JsonRpcProvider => {
  return new ethers.providers.JsonRpcProvider(
    // 'https://songbird.towolabs.com/rpc'
    'http://validator01.sgb.ftsobox.com:9650/ext/bc/C/rpc'
  )
}
