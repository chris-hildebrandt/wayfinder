import { Pop } from "../Utils/Pop.js";


export class ReservationsController{
  constructor(){
    console.log("reserve controller up");
  }

  createReservation(){
    window.event.preventDefault()
    let form = window.event.target
    let newReservation = {
      type: form.type.value,
      name: form.name.value,
      confirmationNumber: form.confirmationNumber.value,
      address: form.address.value,
      date: form.date.value,
      cost: parseInt(form.cost.value)
    }
    reservationsService.createReservation(newReservation)
    Pop.toast('Reservation Created!', 'success')
  }
}