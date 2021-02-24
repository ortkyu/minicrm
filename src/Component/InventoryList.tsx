import firebase from "firebase"
import { useForm } from "react-hook-form"
import { useState } from "react"
import "./building.css"
import { Inventory } from "./Inventory"
import { InventoryInt, PlaceInt } from "../Interfaces/interfaces"

interface Props {
  idInventory: any
  places: PlaceInt[]
  setinventory: any
  activElement: string | undefined
  inventory: InventoryInt[]
}

export const InventoryList: React.FC<Props> = ({
  idInventory,
  setinventory,
  inventory,
  activElement,
  places,
}) => {
  const { register, handleSubmit, errors, reset } = useForm()
  const onSubmit = (data: any) => {
    let { nameInventory } = data
    addInventory(nameInventory)
    reset()
  }

  let sortedInventory = inventory.filter((i) => idInventory.includes(i.placeId))

  const [openInputAddInvent, setOpen] = useState(false)
  const togle = () => setOpen(!openInputAddInvent)

  const addInventory = (nameInventory: string) => {
    let filestore = firebase.firestore()
    filestore
      .collection("inventory")
      .doc()
      .set({
        name: nameInventory,
        count: 1,
        place: filestore.collection("places").doc(idInventory), // main-101 – id места
      })
      .then(() => {
        setinventory([
          ...inventory,
          { data: { name: nameInventory, count: 1 }, placeId: idInventory },
        ])
        togle()
      })
  }

  let changePlace = places.filter((p: PlaceInt) => p.id === activElement)[0]
  let childEl = places.filter((p: PlaceInt) => !p.parts)

  return (
    <>
      <h2> Оборудование</h2>
      {activElement && (
        <div>
          <span>
            <b>Оборудование в:&nbsp; {changePlace && changePlace.data.name}</b>
          </span>
          {childEl.includes(changePlace) && (
            <span className="icon" onClick={togle}>
              &nbsp;
              <svg
                id="Layer_1"
                height="22px"
                width="22px"
                version="1.1"
                viewBox="0 0 128 128"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle fill="#31AF91" cx="64" cy="64" r="64" />
                <path
                  fill="#FFFFFF"
                  d="M103,57H71V25c0-0.6-0.4-1-1-1H58c-0.6,0-1,0.4-1,1v32H25c-0.6,0-1,0.4-1,1v12c0,0.6,0.4,1,1,1h32v32  c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1V71h32c0.6,0,1-0.4,1-1V58C104,57.4,103.6,57,103,57z"
                />
              </svg>
            </span>
          )}
          {sortedInventory.length < 1 ? (
            <div>
              <span>нет оборудования</span>
            </div>
          ) : (
            sortedInventory.map((invent) => (
              <div key={invent.id}>
                <Inventory
                  invent={invent}
                  activElement={activElement}
                  childEl={childEl}
                  changePlace={changePlace}
                  idInventory={idInventory}
                  setinventory={setinventory}
                  inventory={inventory}
                />
              </div>
            ))
          )}
          <div>
            {errors.nameInventory && <p>минимум 3 символа</p>}
            {openInputAddInvent && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  name="nameInventory"
                  placeholder="введите название оборудования"
                  ref={register({ required: true, minLength: 3 })}
                />
                <button type="submit">добавить</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
