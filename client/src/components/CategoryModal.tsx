import { FC, useState } from "react"
import { Form } from "react-router-dom"

interface Props {
    type: 'post' | 'patch'
    id?: number
    setVisibleModal: (visible: boolean) => void
}

const CategoryModal : FC<Props> = ({type, id, setVisibleModal}) => {

    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event: any) => {
        console.log(type)
        setInputValue(event.target.value);
      }

    const isButtonActive = inputValue.trim() !== '';


  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center">
        <Form
        action="/categories"
        method={type}
        onSubmit={() => setVisibleModal(false)}
        className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900">
            <label htmlFor="title">
                <small>Название категории</small>
                <input className="input w-full" value={inputValue} onChange={handleInputChange} type="text" name="title" placeholder="Название"/>
                <input type="hidden" name="id" value={id} />
            </label>
            <div className="flex items-center gap-2">
            <button className="btn btn-green" disabled={!isButtonActive} type="submit">
                {type === 'patch' ? 'Сохранить' : 'Создать'}
            </button>
            <button onClick={() => setVisibleModal(false)} className="btn btn-red">
                Закрыть
            </button>
        </div>
        </Form>
    </div>
    
)}

export default CategoryModal
