import { useEffect, useState } from 'react'
import firebase from 'firebase';
import   "./building.css"
import {MainBuilding} from "./MainBuilding"
import {Inventory} from "./Inventory"



export function Building () {


  var firebaseConfig = {
    apiKey: "AIzaSyD6DnGbVfdJlDJ_pEOUfDfTDJrA8j3lIs8",
    authDomain:"dv-inventory.firebaseapp.com",
    databaseURL:"https://dv-inventory.firebaseio.com",
    projectId: "dv-inventory",
    storageBucket: "dv-inventory.appspot.com",
    messagingSenderId: "130062240176",
    appId: "1:130062240176:web:ecbca5d29b37d25c6cee75"
    };
    
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }


const [places, setplaces] = useState([])

   useEffect(()=>
    {firebase.firestore().collection("places").get().then(response => {
      let docs = response.docs.map(x => ({
      id: x.id,
      data: x.data(),
      parts: x.data().parts && x.data().parts.map(part => part.id)
      }));
      console.log(docs);
      setplaces(docs);
      });}, [])


      const [inventory, setinventory] = useState([])

      useEffect(()=> {
      firebase.firestore().collection("inventory").get().then(response => {
        let docs = response.docs.map(x => ({
        id: x.id,
        data: x.data(),
        placeId: x.data().place && x.data().place.id ///place.id
        }));
        console.info(docs);
        setinventory(docs)
        })
      }, [])

      const [activElement, setActiv] = useState()



      const [idInventory, setId] = useState([])

let sortPlacesByParts = places.filter(i => i.parts ).flatMap(p=>p.parts)
let mainBuildings = places.filter(i=>!sortPlacesByParts.includes(i.id))


  return (
    <div className={"wrapper"}>
        <div className={"block"}>
        <h2>Здание</h2>
           {mainBuildings.map(build => 
           <MainBuilding key={build.id} build={build} places={places} activElement={activElement} inventory={inventory}  setActiv={setActiv} setId={setId} />
           )}
        </div>
        <div className={"block"}>
           <Inventory idInventory={idInventory} places={places} activElement={activElement} inventory={inventory} setinventory={setinventory} />
        </div>
    </div>
  );
}
