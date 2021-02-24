import { useState } from "react"
import "./building.css"
import { Room } from "./Room"
import { InventoryInt, PlaceInt } from "../Interfaces/interfaces"

interface Props {
  setId: React.Dispatch<React.SetStateAction<string[]>>
  setActiv: React.Dispatch<React.SetStateAction<string>>
  activElement: string
  inventory: InventoryInt[]
  construction: PlaceInt
  places: PlaceInt[]
}

export const PartOfBuilding: React.FC<Props> = ({
  construction,
  places,
  setId,
  setActiv,
  activElement,
  inventory,
}) => {
  let rooms =
    construction.parts &&
    places.filter((i) => construction.parts.includes(i.id))

  const [openChildParts, setOpen] = useState<boolean>(false)
  const togle = () => setOpen(!openChildParts)

  const addId = () => {
    if (construction.parts && construction.parts.length) {
      setId([construction.id, ...construction.parts])
      setActiv(construction.id)
    } else if (construction.parts) {
      setId([construction.id, construction.parts])
      setActiv(construction.id)
    } else {
      setId([construction.id])
      setActiv(construction.id)
    }
  }

  let inventoryAvailability: InventoryInt[] = inventory.filter(
    (i: InventoryInt) =>
      i.placeId === construction.id ||
      (construction.parts && construction.parts.includes(i.placeId))
  )

  return (
    <div>
      {construction.parts && (
        <span className="icon" onClick={togle}>
          <svg
            stroke-width="10"
            stroke="#2F3435"
            height="17px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 128 128"
            width="22px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="111" x2="64" y1="40.5" y2="87.499" />
            <line x1="64" x2="17" y1="87.499" y2="40.5" />
          </svg>
        </span>
      )}
      <span
        className={construction.id === activElement ? "activ" : "name"}
        onClick={() => addId()}
      >
        <span>{construction.data.name}</span>
      </span>
      {inventoryAvailability.length > 0 && (
        <span className="iconInv">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              fill="#444444"
              d="M12 7v-2l-1.2-0.4c-0.1-0.3-0.2-0.7-0.4-1l0.6-1.2-1.5-1.3-1.1 0.5c-0.3-0.2-0.6-0.3-1-0.4l-0.4-1.2h-2l-0.4 1.2c-0.3 0.1-0.7 0.2-1 0.4l-1.1-0.5-1.4 1.4 0.6 1.2c-0.2 0.3-0.3 0.6-0.4 1l-1.3 0.3v2l1.2 0.4c0.1 0.3 0.2 0.7 0.4 1l-0.5 1.1 1.4 1.4 1.2-0.6c0.3 0.2 0.6 0.3 1 0.4l0.3 1.3h2l0.4-1.2c0.3-0.1 0.7-0.2 1-0.4l1.2 0.6 1.4-1.4-0.6-1.2c0.2-0.3 0.3-0.6 0.4-1l1.2-0.4zM3 6c0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.7-1.3 3-3 3s-3-1.3-3-3z"
            ></path>
            <path
              fill="#444444"
              d="M7.5 6c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"
            ></path>
            <path
              fill="#444444"
              d="M16 3v-1h-0.6c0-0.2-0.1-0.4-0.2-0.5l0.4-0.4-0.7-0.7-0.4 0.4c-0.2-0.1-0.3-0.2-0.5-0.2v-0.6h-1v0.6c-0.2 0-0.4 0.1-0.5 0.2l-0.4-0.4-0.7 0.7 0.4 0.4c-0.1 0.2-0.2 0.3-0.2 0.5h-0.6v1h0.6c0 0.2 0.1 0.4 0.2 0.5l-0.4 0.4 0.7 0.7 0.4-0.4c0.2 0.1 0.3 0.2 0.5 0.2v0.6h1v-0.6c0.2 0 0.4-0.1 0.5-0.2l0.4 0.4 0.7-0.7-0.4-0.4c0.1-0.2 0.2-0.3 0.2-0.5h0.6zM13.5 3.5c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1c0 0.6-0.4 1-1 1z"
            ></path>
            <path
              fill="#444444"
              d="M15.4 11.8c-0.1-0.3-0.2-0.6-0.4-0.9l0.3-0.6-0.7-0.7-0.5 0.4c-0.3-0.2-0.6-0.3-0.9-0.4l-0.2-0.6h-1l-0.2 0.6c-0.3 0.1-0.6 0.2-0.9 0.4l-0.6-0.3-0.7 0.7 0.3 0.6c-0.2 0.3-0.3 0.6-0.4 0.9l-0.5 0.1v1l0.6 0.2c0.1 0.3 0.2 0.6 0.4 0.9l-0.3 0.6 0.7 0.7 0.6-0.3c0.3 0.2 0.6 0.3 0.9 0.4l0.1 0.5h1l0.2-0.6c0.3-0.1 0.6-0.2 0.9-0.4l0.6 0.3 0.7-0.7-0.4-0.5c0.2-0.3 0.3-0.6 0.4-0.9l0.6-0.2v-1l-0.6-0.2zM12.5 14c-0.8 0-1.5-0.7-1.5-1.5s0.7-1.5 1.5-1.5 1.5 0.7 1.5 1.5-0.7 1.5-1.5 1.5z"
            ></path>
          </svg>
        </span>
      )}
      {openChildParts && (
        <div>
          {rooms &&
            rooms.map((room: PlaceInt) => (
              <div key={room.id}>
                <Room
                  room={room}
                  setId={setId}
                  setActiv={setActiv}
                  activElement={activElement}
                  inventory={inventory}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
