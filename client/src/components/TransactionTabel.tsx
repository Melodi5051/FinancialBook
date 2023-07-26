import React, { FC, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader, ITransaction } from '../types/types'
import { formatDate } from '../helper/data.helper'
import { formatToUSD } from '../helper/currence.helper'
import { instance } from '../api/axios.api'
import ReactPaginate from 'react-paginate'


interface ITransactionTable {
    limit: number
}

const TransactionTabel: FC<ITransactionTable> = ({limit = 3}) => {

    const {transactions} = useLoaderData() as IResponseTransactionLoader

    const [data, setData] = useState<ITransaction[]>([])
    const [currentPage, setcurrentPage] = useState<number>(1)
    const [totlePage, setTotalPage] = useState<number>(0)

    const fetchTransactions = async (page:number) => {
        const response = await instance.get(`/transaction/pagination?page=${page}&limit=${limit}`)
        setData(response.data)
        setTotalPage(Math.ceil(transactions.length / limit))
    }

    const handlePageChange = (selectedItem: {selected: number}) => {
        setcurrentPage(selectedItem.selected + 1)
    }

    useEffect(() => {fetchTransactions(currentPage)}, [currentPage, transactions])
  return (
    <>
    <ReactPaginate 
        className='flex gap-3 justify-end mt-4 items-center'
        activeClassName='bg-blue-600 rounded-md'
        pageLinkClassName='text-white text-xs py-1 px-2 rounded-sm'
        previousClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
        nextClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
        disabledClassName='text-white/50 cursor-not-allowed'
        disabledLinkClassName='text-slate-600 cursor-not-allowed'
        pageCount={totlePage}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
    />
    <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
        <table className='w-full'>
            <thead>
                <tr>
                    <td className='font-bold'>№</td>
                    <td className='font-bold'>Название</td>
                    <td className='font-bold'>Значение</td>
                    <td className='font-bold'>Категория</td>
                    <td className='font-bold'>Дата</td>
                    <td className='text-right'>Действие</td>
                </tr>
            </thead>
            <tbody>
                {data.map((transaction, idx) => (
                    <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{transaction.title}</td>
                        <td className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>{ transaction.type === 'income' ? `+ ${formatToUSD.format(transaction.amount)}` : `- ${formatToUSD.format(transaction.amount)}`}</td>
                        <td>{transaction.category?.title || 'Пусто'}</td>
                        <td>{formatDate(transaction.createdAt)}</td>
                        <td>
                            <Form method='delete' action='/transaction'>
                                <input type="hidden" name='id' value={transaction.id} />
                                <button className='btn hover:btn-red ml-auto'>
                                    <FaTrash/>
                                </button>
                            </Form>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </>
  )
}

export default TransactionTabel
