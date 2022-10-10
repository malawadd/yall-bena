import { ethers } from 'ethers';
import { TokenSymbol } from '../enums/TokenSymbol';
import { rawArrayToExpenses } from './expenseTransformator';
import { parseUnits } from '../utils/token-helper';
import { Token } from '@uniswap/sdk-core';
import { erc20ABI } from 'wagmi';

export interface DebtorModel {
  address: string;
  amount: number;
  amountOut: number;
  paidAt: Date;
  hasPaid: boolean;
}

export interface ExpenseModel {
  name: string;
  description: string;
  category: string;
  token: string;
  amount: number;
  amountPaid: number;
  paymentDue: Date;
  createdAt: Date;
  status: string;
  creator: string;
  recipient: string;
  debtors: DebtorModel[];
}

const tokenAddress: { [key: string]: string } =
  process.env.NODE_ENV !== 'production'
    ? {
        [TokenSymbol.USDT]: '0xFC4F6E92143621D1ff144C1ff5b7f14ec53535A1',
        [TokenSymbol.DAI]: '0xbf0A736F6107D10fCE53d056C95fD73d266283Bb',
      }
    : {
        [TokenSymbol.USDT]: '0xFC4F6E92143621D1ff144C1ff5b7f14ec53535A1',
        [TokenSymbol.DAI]: '0xbf0A736F6107D10fCE53d056C95fD73d266283Bb',

      };

class ExpenseService {
  async fetchCreatedExpenses(
    contract: ethers.Contract,
    wallet: string
  ): Promise<any[]> {
    try {
      if (wallet != null) {
        const res = await contract.getNumberOfCreatedExpenses(wallet);
        const numberOfCreatedExpenses = Number(res._hex);
        const promises = [];
        for (let i = 0; i < numberOfCreatedExpenses; i++) {
          promises.push(contract.getCreatedExpense(wallet, i));
        }

        return await Promise.all(promises);
      }
      return [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async fetchOwedExpense(
    contract: ethers.Contract,
    wallet: string,
    expenseIndex: number
  ): Promise<any[]> {
    const owedExpense = await contract.getOwedExpense(wallet, expenseIndex);
    return owedExpense;
  }

  async fetchOwedExpenses(
    contract: ethers.Contract,
    wallet: string
  ): Promise<any[]> {
    try {
      if (wallet != null) {
        const res = await contract.getNumberOfOwedExpenses(wallet);
        const numberOfCreatedExpenses = Number(res._hex);
        const promises = [];
        for (let i = 0; i < numberOfCreatedExpenses; i++) {
          promises.push(contract.getOwedExpense(wallet, i));
        }
        return await Promise.all(promises);
      }
      return [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async loadExpense(
    contract: ethers.Contract,
    wallet: string,
    expenseIndex: number
  ): Promise<ExpenseModel> {
    try {
      const owedExpense = await this.fetchOwedExpense(
        contract,
        wallet,
        expenseIndex
      );
      return rawArrayToExpenses([owedExpense])[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async loadExpenses(
    contract: ethers.Contract,
    wallet: string
  ): Promise<ExpenseModel[]> {
    try {
      if (wallet != null) {
        const owedExpenses = await this.fetchOwedExpenses(contract, wallet);
        return rawArrayToExpenses(owedExpenses);
      }
      return [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }


  async getLatestExpenseIndex(contract: ethers.Contract, address: string) {
    const owedExpensesCount = await contract.getNumberOfOwedExpenses(address);
    return owedExpensesCount - 1;
  }

  async payExpense(
    fromToken: Token,
    poolFee: number,
    amount: number,
    splitContract: ethers.Contract,
    signer: ethers.Signer,
    expenseIndex: number
  ): Promise<number> {
    try {
      const tokenContract = new ethers.Contract(
        fromToken.address,
        erc20ABI,
        signer
      );
      const parsedAmount = parseUnits(amount, fromToken.decimals);
      if (!process.env.NEXT_PUBLIC_SWAP_CONTRACT_ADDRESS)
        throw new Error('NEXT_PUBLIC_SWAP_CONTRACT_ADDRESS is undefined');
      await tokenContract.approve(
        process.env.NEXT_PUBLIC_SWAP_CONTRACT_ADDRESS,
        parsedAmount
      );
      const txn = await splitContract.payDebt(
        fromToken.address,
        poolFee,
        parsedAmount,
        expenseIndex
      );
      console.log('Transaction pending...');
      await txn.wait();
      console.log('Paid expense');
      return 0;
    } catch (err) {
      console.error('An error occurred trying to pay an expense', err);
      return -1;
    }
  }
}

const expenseService = new ExpenseService();
export default expenseService;
