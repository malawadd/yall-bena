import { useState } from 'react';
import type { NextPage } from 'next';
import Preview from '../components/preview';
import Loader from '../components/loader';
import expenseService, { ExpenseModel } from '../services/expenses';
import AsyncState from '../models/async-state';
import { toast } from 'react-toastify';
import { useEffectOnce } from '../hooks/use-effect-once';
import { useAccount, useContract, useProvider } from 'wagmi';
import splitContractArtifact from '../utils/abis/Split.json';
import Link from 'next/link';
import RequireAuth from '../components/require-auth';

const Home: NextPage = () => {
  const { address } = useAccount();
  const [state, setState] = useState<AsyncState<ExpenseModel[]>>({
    data: undefined,
    loading: true,
    error: undefined,
  });
  const provider = useProvider();
  const contract = useContract({
    addressOrName: '0xa09861C51676CF0fB34b22F8e0199A507D8a26EA',
    contractInterface: splitContractArtifact.abi,
    signerOrProvider: provider,
  });

  useEffectOnce(() => {
    if (!address) return;
    setState({ data: undefined, loading: true, error: undefined });
    const fetchData = async () => {
      try {
        const res = await expenseService.loadExpenses(contract, address);
        if (loading == true) {
          setState({ data: res, loading: false, error: false });
        }
      } catch (error) {
        setState({ data: undefined, loading: false, error });
        toast.error('Error while loading expenses');
      }
    };
    fetchData();
  });

  const { data, loading } = state;
  return (
    <RequireAuth>
      <div className="h-full min-h-screen bg-body-gradient pb-20">
        <div className="container mx-auto">
          <p className="pt-16 pb-8 text-primary text-3xl font-sans font-bold">
            Your Expenses
          </p>
          <div className="grid grid-cols-4 gap-4 min-h-[400px] relative">
            {loading ? (
              <Loader />
            ) : (
              data?.map((expense, index) => (
                <Link key={index} href={`/expenses/${index}`}>
                  <a>
                   
                  </a>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </RequireAuth>
  );
};

export default Home;
