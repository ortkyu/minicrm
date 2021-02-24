import { DocumentData } from "@firebase/firestore-types"

export interface PlaceInt {
  data: DocumentData
  id: string
  parts?: any
}

export interface InventoryInt {
  id: string
  data: DocumentData
  placeId: string
}

export interface ActiveEl {
  activElement: string
}

export interface IdInvent {
  idInventory: string
}

//   data: {name: "Двигатель", count: 2, place: e}
// id: "L9bp6vdBWNAiKhoMEz0O"
// placeId: "production-2"
// __proto__: Object

// data: {parts: Array(2), name: "Главный офис"}
// id: "main"
// parts: (2) ["main-left", "main-right"]
// __proto__: Object
// 1:
// data: {name: "Кабинет 101"}
// id: "main-101"
// parts: undefined
// __proto__: Object
