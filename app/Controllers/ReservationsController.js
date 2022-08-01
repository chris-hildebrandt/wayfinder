import { reservationsService } from "../Services/ReservationsService.js";
import { Pop } from "../Utils/Pop.js";


export class ReservationsController{
  constructor(){
  }

  createReservation(tripId){
    window.event.preventDefault()
    let form = window.event.target
    let newReservation = {
      type: form.type.value,
      name: form.name.value,
      confirmation: form.confirmation.value,
      address: form.address.value,
      date: Date(form.date.value.replace(/-/g, "/")),
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