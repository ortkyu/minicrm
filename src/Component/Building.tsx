import React, { useEffect, useState } from "react"
import firebase from "firebase"
import "./building.css"
import { MainBuilding } from "./MainBuilding"
import { InventoryList } from "./InventoryList"
import { PlaceInt, InventoryInt } from "../Interfaces/interfaces"

export const Building: React.FC = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyD6DnGbVfdJlDJ_pEOUfDfTDJrA8j3lIs8",
    authDomain: "dv-inventory.firebaseapp.com",
    databaseURL: "https://dv-inventory.firebaseio.com",
    projectId: "dv-inventory",
    storageBucket: "dv-inventory.appspot.com",
    messagingSenderId: "130062240176",
    appId: "1:130062240176:web:ecbca5d29b37d25c6cee75",
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }





  let loadPlaces =  (): any =>  {
    firebase
    .firestore()
    .collection("places")
    .get()
    .then((response) => {
      let docs = response.docs.map((x) => ({
        id: x.id,
        data: x.data(),
        parts: x.data().parts && x.data().parts.map((part: any) => part.id),
      }))
      console.log(docs)
      setplaces(docs)
    })
  }

  let loadInventory = (): void => {
    firebase
    .firestore()
    .collection("inventory")
    .get()
    .then((response) => {
      let docs = response.docs.map((x) => ({
        id: x.id,
        data: x.data(),
        placeId: x.data().place && x.data().place.id, ///place.id
      }))
      console.info(docs)
      setinventory(docs)
    })
  }

  const [places, setplaces] = useState<PlaceInt[]>([])

  const [inventory, setinventory] = useState<InventoryInt[]>([])


  useEffect(() => {
    loadPlaces()
    loadInventory()
  }, [])


  const [activElement, setActiv] = useState<string>("")

  const [idInventory, setId] = useState<string[]>([])

  let sortPlacesByParts: string[] = places
    .filter((i: PlaceInt) => i.parts)
    .flatMap((p) => p.parts)
  let mainBuildings: PlaceInt[] = places.filter(
    (i: PlaceInt) => !sortPlacesByParts.includes(i.id)
  )

  return (
    <div className={"wrapper"}>
      <div className={"block"}>
        <h2>Здание</h2>
        {mainBuildings.map((build) => (
          <MainBuilding
            key={build.id}
            build={build}
            places={places}
            activElement={activElement}
            inventory={inventory}
            setActiv={setActiv}
            setId={setId}
          />
        ))}
      </div>
      <div className={"block"}>
        <InventoryList  
          loadInventory={loadInventory} 
          idInventory={idInventory}
          places={places}
          activElement={activElement}
          inventory={inventory}
        />
      </div>
    </div>
  )
}
