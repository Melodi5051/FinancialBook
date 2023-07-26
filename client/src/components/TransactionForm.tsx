import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import CategoryModal from './CategoryModal'

const TransactionForm: FC = () => {
    const {categories} = useLoaderData() as IResponseTransactionLoader
    const [visibleModal, setVisibleModal] = useState(false)

  return (
    <div className='rounded-md bg-slate-800 p-4'>
      <Form 
        className='grid gap-2'
        method='post'
        action='/transaction'
        
      >
        <label className='grid' htmlFor="title">
            <span>Название</span>
            <input className='input border-slate-900' placeholder='Название' name='title' type="text" required/>
        </label>
        <label className='grid' htmlFor="amount">
            <span>Количество</span>
            <input className='input border-slate-900' placeholder='Количество' name='amount' type="number" required/>
        </label>
        
        {categories.length ? <label htmlFor="category" className='grid'>
            <span>Категории</span>
            <select required name="category" className='input border-slate-900'>
                {categories.map((ctg, idx) => (
                    <option key={idx} value={ctg.id}>{ctg.title}</option>
                ))}
            </select>
        </label> : <h1 className='mt-1 text-red-300'>Создайте категорию</h1> 
        }

        <button onClick={() => setVisibleModal(true)}  className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white">
            <FaPlus/>
            <span>Создать категорию</span>
        </button>
        <div className="flex gap-4 items-center">
            <label className='cursor-pointer flex items-center gap-2'>
                <input type="radio" name='type' value={'income'} className='form-radio text-blue-600' />
                <span>Заработок</span>
            </label>
            <label className='cursor-pointer flex items-center gap-2'>
                <input type="radio" name='type' value={'expense'} className='form-radio text-blue-600' />
                <span>Траты</span>
            </label>
        </div>


        <button className='btn btn-green max-w-fit'>
            Создать
        </button>
      </Form>

      {visibleModal && (
          <CategoryModal type='post' setVisibleModal={setVisibleModal}/>
        )}
    </div>
  )
}

export default TransactionForm
