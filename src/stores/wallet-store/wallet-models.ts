import { Instance, types } from 'mobx-state-tree'

export const BalanceModel = types.model('Balance').props({
  balance: types.optional(types.number, 0),
  price: types.optional(types.number, 0),
  fetched: types.optional(types.boolean, false),
  symbol: types.optional(types.string, ''),
})

export const BalancesModel = types.model('Balances').props({
  ARCD: types.optional(BalanceModel, {}),
  BTC: types.optional(BalanceModel, {}),
  USDC: types.optional(BalanceModel, {}),
})

export const TransactionModel = types.model('Transaction').props({
  id: types.identifierNumber,
  amount: types.number,
  description: types.string,
  timestamp: types.Date,
  type: types.string,
})

export interface Balance extends Instance<typeof BalanceModel> {}
export interface Balances extends Instance<typeof BalancesModel> {}
export interface Transaction extends Instance<typeof TransactionModel> {}
