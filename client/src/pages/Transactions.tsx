import { FC } from "react"
import TransactionForm from "../components/TransactionForm"
import { instance } from "../api/axios.api"
import { ICategory, IResponseTransactionLoader, ITransaction } from "../types/types"
import { useLoaderData } from "react-router-dom"
import { toast } from "react-toastify"
import TransactionTabel from "../components/TransactionTabel"
import { formatToUSD } from "../helper/currence.helper"
import Chart from "../components/Chart"

export const transactionLoader = async () => {
  const categories = await instance.get<ICategory[]>('/categories')
  const transactions = await instance.get<ITransaction[]>('/transaction')
  const totalIncome = await instance.get<number>('/transaction/income/find')
  const totalExpense = await instance.get<number>('/transaction/expense/find')


  const data = {
    categories: categories.data,
    transactions: transactions.data,
    totalIncome: totalIncome.data,
    totalExpense: totalExpense.data,
  }

  return data
}

export const transactionAction = async ({request} : any) => {
  switch(request.method) {
    case "POST": {
      const formData = await request.formData()
      const newTransaction = {
        title: formData.get('title'),
        amount: +formData.get('amount'),
        category: formData.get('category'),
        type: formData.get('type')
      }

      await instance.post('/transaction', newTransaction)
      toast.success('Добавлена')
      return null
    }
    case "DELETE": {
      const formData = await request.formData()
      const transactionId = formData.get('id')
      await instance.delete(`/transaction/transaction/${transactionId}`)
      toast.success('Успешно')
      return null
    }
  }
}

const Transactions: FC = () => {
  const {totalExpense, totalIncome} = useLoaderData() as IResponseTransactionLoader
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4 items-start">
        {/*Первый компонент */}
        <div className="col-span-2 grid"><TransactionForm/></div>
        {/*Второй компонент */}
        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="uppercase text-md font-bold text-center">
                Заработок
              </p>
              <p className="bg-green-600 p-1 rounded-sm text-center">
                {formatToUSD.format(totalIncome)}
              </p>
            </div>
            <div>
              <p className="uppercase text-md font-bold text-center">
                Затраты
              </p>
              <p className="bg-red-500 p-1 rounded-sm text-center">
                {formatToUSD.format(totalExpense)}
              </p>
            </div>
          </div>

          <Chart totalExpense={totalExpense} totalIncome={totalIncome}/>
        </div>
      </div>
        {/*Третий компонент */}
      <h1 className="my-5"><TransactionTabel limit={5}/></h1>
    </>
  )
}

export default Transactions
