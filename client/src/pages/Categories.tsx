import { FC, useState } from "react"
import {AiFillCloseCircle, AiFillEdit} from "react-icons/ai"
import {FaPlus} from 'react-icons/fa'
import { Form, useLoaderData } from "react-router-dom"
import CategoryModal from "../components/CategoryModal"
import { instance } from "../api/axios.api"
import { ICategory } from "../types/types"

export const categoriesAction = async ({request}: any) => {
  switch(request.method) {
    case "POST":{
      const formData = await request.formData()
      const category = {
        title: formData.get('title'),
      }
      await instance.post('/categories', category)
      return null
    }
    case "PATCH": {
      const formData = await request.formData()
      const category = {
        id: formData.get('id'),
        title: formData.get('title')
      }
      await instance.patch(`/categories/category/${category.id}`, category)
      return null
    }
    case "DELETE": {
      const formData = await request.formData()
      const categoryId = formData.get('id')
      await instance.delete(`/categories/category/${categoryId}`)
      return null
    }
  }
}

export const categoryLoader = async () => {
  const {data} = await instance.get<ICategory[]>('/categories')
  return data
}

const Categories: FC = () => {
  const categories = useLoaderData() as ICategory[]
  const [categoryId, setCategoryId] = useState<number>(0)

  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  return (
    <>
    <div className="mt-10 p-4 rounded-md bg-slate-800">
      <h1>Категории</h1>
      <div className="flex mt-2 items-center gap-2 flex-wrap">
        {categories.map((categori, index) => (
          <div key={index} className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2">
            {categori.title}
              <div className="absolute hidden px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex">
                <button onClick={() => {
                  setCategoryId(categori.id)
                  setVisibleModal(true)
                  setIsEdit(true)
                }}>
                  <AiFillEdit/>
                </button>
                
                <Form className="flex" method="DELETE" action="/categories">
                  <input name="id" type="hidden" value={categori.id} />
                  <button type="submit">
                    <AiFillCloseCircle/>
                  </button>
                </Form>
              </div>
        </div>
        ))}
      </div>



      <button onClick={() => setVisibleModal(true)} className="max-w-fit flex items-center gap-2 text-white/50 mt-5 hover:text-white">
        <FaPlus/>
        <span>Создать категорию</span>
      </button>
    </div>

    
    {visibleModal && (
          <CategoryModal type='post' setVisibleModal={setVisibleModal}/>
    )}


    {visibleModal && isEdit && (
          <CategoryModal type='patch' id={categoryId} setVisibleModal={setVisibleModal}/>
    )}

    </>
  )
}

export default Categories
