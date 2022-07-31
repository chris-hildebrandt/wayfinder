import { ProxyState } from "../AppState.js";
import { tripsService } from "../Services/TripsService.js";
import { load, save } from "../Utils/LocalStorage.js";
import { Pop } from "../Utils/Pop.js"


function _draw(){
  let template = ''
  ProxyState.trips.forEach(t => template += t.Template)
  document.getElementById("trips").innerHTML = template
}

export class TripsController{
  constructor(){
    ProxyState.on("trips", _draw)
    ProxyState.on("reservations", _draw)
    ProxyState.on("trips", save)
    ProxyState.on("reservations", save)
    load()
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

  async deleteTrip(id){
      if(await Pop.confirm("Delete Trip?")){
        tripsService.deleteTrip(id)
    }
  }

  editTrip(id){
    let newNotes = window.event.target.value
    tripsService.editTrip(id, newNotes)
  }
}