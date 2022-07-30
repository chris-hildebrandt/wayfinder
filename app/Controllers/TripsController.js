import { ProxyState } from "../AppState.js";
import { Pop } from "../Utils/Pop.js"


function _draw(){
  let template = ''
  ProxyState.trips.forEach(t => template += t.Template)
  document.getElementById("trips").innerHTML = template
}

export class TripsController{
  constructor(){
    console.log("Trips Ctor up");
    _draw()
  }

  createTrip(){
    window.event.preventDefault()
    let form = window.event.target
    let newTrip = {
      title: form.title.value
    }
    tripsService.createTrip(newTrip)
    Pop.toast('Trip Created!', 'success')
  }
}