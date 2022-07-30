import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"

export class Trip {
  constructor(data) {
    this.id = data.id || generateId(),
      this.title = data.title,
      this.notes = data.notes
  }

  get Template() {
    return `
      <div class="container bg-light">
        <ul class="nav nav-tabs">
        </ul>
        <div class="row text-center">
            <p class="col-1 d-none d-md-inline">Type</p>
            <p class="col-2 d-none d-md-inline">Name</p>
            <p class="col-3 d-none d-md-inline">Confirmation Number</p>
            <p class="col-3 d-none d-md-inline">Address</p>
            <p class="col-2 d-none d-md-inline">Date</p>
            <p class="col-1 d-none d-md-inline">Cost</p>
        </div>
        <section id="reservations" name="reservations">
          ${this.ReservationsTemplate}
        </section>
        <form class="row" onsubmit="app.reservationsController.createReservation('${this.id}')"></form>
        <section class="row"></section>
        <div class="col-6">Notes</div>
        <textarea class="col-10 col-md-6" name="notes" id="notes" cols="30" rows="4"></textarea>
        <div>
          <button class="btn col-1" onclick="app.tripsController.deleteTrip('${this.id}')">Delete Trip</button>
          <section class="col-1 offset-10"> Total Cost: $<span>0</span></section>
        </div>
      </div>
    `
  }

  get TabTemplate() {
    return `
    <li class="nav-item">
      <a class="nav-link active" href="#">Trip 22</a>
    </li>
    `
  }

  get ReservationsTemplate() {
    let template = ''
    let reservations = ProxyState.reservations.filter(r => r.tripId == this.id)
    reservations.forEach(r => template += r.Template)
    if (template) {
      return template
    } else {
      return '<p>No reservations yet!</p>'
    }
  }

  get TripTotal() {
    let total = 0
    let reservations = ProxyState.reservations.filter(r => r.tripId == this.id)
    reservations.forEach(r => total += r.cost)
    return total
  }
}