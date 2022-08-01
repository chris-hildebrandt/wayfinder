import { reservationsService } from "../Services/ReservationsService.js";
import { Pop } from "../Utils/Pop.js";


export class ReservationsController{
  constructor(){
  }

  // let dateFormat = form.date.value.replace(/-/g, "/")

  createReservation(tripId){
    window.event.preventDefault()
    let form = window.event.target
    let newReservation = {
      type: form.type.value,
      name: form.name.value,
      confirmation: form.confirmation.value,
      address: form.address.value,
      date: Date.parse(form.date.value),
      cost: parseInt(form.cost.value),
      tripId: tripId
    }
    reservationsService.createReservation(newReservation)
    Pop.toast('Reservation Created!', 'success')
  }

  async deleteReservation(id){
    if(await Pop.confirm("Remove Reservation?")){
      reservationsService.deleteReservation(id)
    }
  }
}