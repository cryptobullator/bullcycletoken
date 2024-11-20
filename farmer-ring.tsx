'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Droplet, Sprout, Home, Leaf, Tractor, Crown, User, Plus, Minus } from 'lucide-react'

const connectWallet = async () => {
  console.log("Connecting wallet...")
  return "0x1234...5678"
}

const deposit = async (pool: string, amount: string) => {
  console.log(`Depositing ${amount} to ${pool}`)
}

const withdraw = async (pool: string, amount: string) => {
  console.log(`Withdrawing ${amount} from ${pool}`)
}

const stake = async (amount: string) => {
  console.log(`Staking ${amount} FR tokens`)
}

const tiers = [
  { name: "Field Worker", icon: User, requirement: 5000, testnetPools: 2, mainnetPools: 2 },
  { name: "Barn Keeper", icon: Home, requirement: 10000, testnetPools: 3, mainnetPools: 3 },
  { name: "Garden Guardian", icon: Leaf, requirement: 20000, testnetPools: 4, mainnetPools: 4 },
  { name: "Farm Manager", icon: Tractor, requirement: 50000, testnetPools: 5, mainnetPools: 5 },
  { name: "Ring Master", icon: Crown, requirement: 100000, testnetPools: "Unlimited", mainnetPools: "Unlimited" },
]

const pools = [
  { name: "Airdrop 1", token: "USDT", balance: "5000", participants: "50", limit: 10000 },
  { name: "Airdrop 2", token: "ETH", balance: "3", participants: "30", limit: 10 },
  { name: "Airdrop 3", token: "USDT", balance: "7000", participants: "75", limit: 10000 },
  { name: "Airdrop 4", token: "ETH", balance: "5", participants: "45", limit: 10 },
]

export default function FarmerRing() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [stakedAmount, setStakedAmount] = useState<number>(0)
  const [stakeInput, setStakeInput] = useState<string>('')

  const handleConnectWallet = async () => {
    const address = await connectWallet()
    setWalletAddress(address)
  }

  const getTierLevel = (amount: number) => {
    for (let i = tiers.length - 1; i >= 0; i--) {
      if (amount >= tiers[i].requirement) {
        return tiers[i]
      }
    }
    return { name: "No Tier", icon: Sprout, requirement: 0, testnetPools: 0, mainnetPools: 0 }
  }

  const handleStake = async () => {
    if (!stakeInput) return
    await stake(stakeInput)
    setStakedAmount(prevAmount => prevAmount + parseInt(stakeInput))
    setStakeInput('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-800">The Farmer Ring</h1>
        {walletAddress ? (
          <span className="text-green-700">{walletAddress}</span>
        ) : (
          <Button onClick={handleConnectWallet} className="bg-green-600 hover:bg-green-700">
            <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
          </Button>
        )}
      </header>

      <Tabs defaultValue="pools" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pools">Liquidity Pools</TabsTrigger>
          <TabsTrigger value="staking">Staking</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="pools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pools.map((pool, index) => (
              <PoolCard key={index} {...pool} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="staking">
          <Card>
            <CardHeader>
              <CardTitle>Stake FR Tokens</CardTitle>
              <CardDescription>Stake your FR tokens to access platform features and define your tier level.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stake-amount">Amount to Stake</Label>
                  <Input 
                    id="stake-amount" 
                    placeholder="Enter FR amount" 
                    type="number" 
                    value={stakeInput}
                    onChange={(e) => setStakeInput(e.target.value)}
                  />
                </div>
                <Button onClick={handleStake} className="w-full bg-green-600 hover:bg-green-700">
                  <Sprout className="mr-2 h-4 w-4" /> Stake FR Tokens
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <div className="w-full text-center mb-4">
                <p className="font-bold">Currently Staked: {stakedAmount} FR</p>
                <p className="text-lg">Your Tier: {getTierLevel(stakedAmount).name}</p>
              </div>
              <div className="w-full space-y-2">
                <h3 className="font-semibold text-lg">Tier Requirements:</h3>
                {tiers.map((tier, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <tier.icon className="h-5 w-5" />
                    <span className="font-medium">{tier.name}:</span>
                    <span>{tier.requirement.toLocaleString()} FR</span>
                    <span className="text-sm text-gray-600">
                      (Access: {tier.testnetPools} testnet, {tier.mainnetPools} mainnet pools)
                    </span>
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Your Dashboard</CardTitle>
              <CardDescription>Overview of your activities on The Farmer Ring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Pool Contributions</h3>
                  <p>Airdrop 1: 100 USDT</p>
                  <p>Airdrop 2: 0.5 ETH</p>
                </div>
                <div>
                  <h3 className="font-semibold">Staking</h3>
                  <p>Staked Amount: {stakedAmount} FR</p>
                  <p>Tier Level: {getTierLevel(stakedAmount).name}</p>
                  <p>Pool Access: {getTierLevel(stakedAmount).testnetPools} testnet, {getTierLevel(stakedAmount).mainnetPools} mainnet pools</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PoolCard({ name, token, balance, participants, limit }: { name: string; token: string; balance: string; participants: string; limit: number }) {
  const [amount, setAmount] = useState<string>('')

  const handleDeposit = () => {
    if (!amount) return
    deposit(name, amount)
    setAmount('')
  }

  const handleWithdraw = () => {
    if (!amount) return
    withdraw(name, amount)
    setAmount('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Receives {token} only</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>Current Balance: {balance}/{limit} {token}</p>
          <p>Participants: {participants}</p>
          <div className="space-y-2">
            <Label htmlFor={`amount-${name}`}>Amount</Label>
            <Input 
              id={`amount-${name}`} 
              placeholder={`Enter ${token} amount`} 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleDeposit} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
        <Button onClick={handleWithdraw} className="bg-red-600 hover:bg-red-700">
          <Minus className="mr-2 h-4 w-4" /> Withdraw
        </Button>
      </CardFooter>
    </Card>
  )
}
