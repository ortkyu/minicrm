import "./building.css"
import firebase from "firebase"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { InventoryInt, PlaceInt } from "../Interfaces/interfaces"

interface Props {
  idInventory: string[]
  activElement: string
  inventory: InventoryInt[]
  invent: InventoryInt
  changePlace: PlaceInt
  childEl: PlaceInt[]
  loadInventory: any
}

export const Inventory: React.FC<Props> = ({
  idInventory,
  inventory,
  invent,
  changePlace,
  childEl,
  activElement,
  loadInventory
}) => {
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
    reset: reset2,
  } = useForm()
  const onSubmitEdit = (data: any) => {
    let { editInventory } = data
    console.log(data)
    editInvent(editInventory)
    reset2()
  }

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const togleEditWind = () => {
    setOpenEdit(!openEdit)
  }

  const deleteInvent = (id: string) => {
    firebase
      .firestore()
      .collection("inventory")
      .doc(id)
      .delete()
      loadInventory()
  }

  const editInvent = (editInventory: string) => {
    firebase
      .firestore()
      .doc(invent.id)
      .update({
        name: editInventory,
        count: 2,
      })
      .then(() => {
        togleEditWind()
        loadInventory()
      })
  }

  return (
    <>
      {openEdit ? (
        <div className="inputEdit">
          {errors2.editInventory && <p>минимум 3 символа</p>}
          <form onSubmit={handleSubmit2(onSubmitEdit)}>
            <input
              defaultValue={invent.data.name}
              name="editInventory"
              ref={register2({ required: true, minLength: 3 })}
            />
            <button type="submit">ok</button>
          </form>
        </div>
      ) : (
        <div className={"inventItem"}>
          <span>{invent.data.name}</span>
          <span>: &nbsp;{invent.data.count}</span>шт
          {childEl.includes(changePlace) && (
            <span>
              <span className="icon" onClick={() => deleteInvent(invent.id)}>
                <svg
                  id="Layer_1"
                  height="15px"
                  width="15px"
                  version="1.1"
                  viewBox="0 0 128 128"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle fill="#C93636" cx="64" cy="64" r="64" />
                  <path
                    fill="#FFFFFF"
                    d="M100.3,90.4L73.9,64l26.3-26.4c0.4-0.4,0.4-1,0-1.4l-8.5-8.5c-0.4-0.4-1-0.4-1.4,0L64,54.1L37.7,27.8  c-0.4-0.4-1-0.4-1.4,0l-8.5,8.5c-0.4,0.4-0.4,1,0,1.4L54,64L27.7,90.3c-0.4,0.4-0.4,1,0,1.4l8.5,8.5c0.4,0.4,1.1,0.4,1.4,0L64,73.9  l26.3,26.3c0.4,0.4,1.1,0.4,1.5,0.1l8.5-8.5C100.7,91.4,100.7,90.8,100.3,90.4z"
                  />
                </svg>
              </span>
              <span className="iconEdit" onClick={togleEditWind}>
                <svg
                  height="20px"
                  id="Layer_1"
                  version="1.1"
                  viewBox="0 0 64 64"
                  width="20px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M55.736,13.636l-4.368-4.362c-0.451-0.451-1.044-0.677-1.636-0.677c-0.592,0-1.184,0.225-1.635,0.676l-3.494,3.484   l7.639,7.626l3.494-3.483C56.639,15.998,56.639,14.535,55.736,13.636z" />
                  <polygon points="21.922,35.396 29.562,43.023 50.607,22.017 42.967,14.39  " />
                  <polygon points="20.273,37.028 18.642,46.28 27.913,44.654  " />
                  <path d="M41.393,50.403H12.587V21.597h20.329l5.01-5H10.82c-1.779,0-3.234,1.455-3.234,3.234v32.339   c0,1.779,1.455,3.234,3.234,3.234h32.339c1.779,0,3.234-1.455,3.234-3.234V29.049l-5,4.991V50.403z" />
                </svg>
              </span>
            </span>
          )}
        </div>
      )}
    </>
  )
}
