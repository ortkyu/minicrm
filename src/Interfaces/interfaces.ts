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
