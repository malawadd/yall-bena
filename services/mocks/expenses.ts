import mockFetch from "./mock";


const EXPENSE_DELAY = 3000; //in ms

export interface DebtorModel {
  name: string;
  share: string;
  payed: string;
  payedAt: string;
  status: string;
  address: string;
}

export interface ExpenseModel {
  user: string;
  name: string;
  created: string;
  recipientAddress: string;
  total: string;
  remaining: string;
  timeRemaining: string;
  status: string;
  description: string;
  debtors: DebtorModel[];
  category: string;
  token: string;
}

export function getExpenseData(): ExpenseModel {
  const debtor = {
    name: "Bonnie.eth",
    share: "1000 USDT",
    payed: "1 CET",
    payedAt: "2022-10-15",
    status: "paid",
    address: "0x123151231241123123",
  };
  const expense = {
    user: "Haibo.eth",
    status: "Pending",
    category: "Transportation",
    token: "usdt",
    name: "Apartment Rent",
    created: "2022-10-03",
    recipientAddress: "Zuowei-Liu.eth",
    total: "2000 USDT",
    remaining: "1000 USDT",
    timeRemaining: "3 days",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at tortor non imperdiet turpis volutpat neque, mattis...",
    debtors: [debtor, debtor],
  };

  return expense;
}

const expenses: ExpenseModel[] = new Array(8).fill(getExpenseData());

class ExpenseService {
  async loadExpensesPreviews(): Promise<ExpenseModel[]> {
    return mockFetch<ExpenseModel[]>(EXPENSE_DELAY, expenses);
  }

  async loadExpense(id: number): Promise<ExpenseModel> {
    return mockFetch<ExpenseModel>(EXPENSE_DELAY, expenses[id]);
  }


}

const expenseService = new ExpenseService();
export default expenseService;
