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
      <div class="container bg-light bg-glass rounded m-2 pt-4">
        <ul class="nav nav-tabs">
        </ul>
        <div class="row text-center font-custom2">
            <h4 class="col-1 d-none d-md-inline">Type</h4>
            <h4 class="col-2 d-none d-md-inline">Name</h4>
            <h4 class="col-3 d-none d-md-inline">Confirmation Number</h4>
            <h4 class="col-3 d-none d-md-inline">Address</h4>
            <h4 class="col-2 d-none d-md-inline">Date</h4>
            <h4 class="col-1 d-none d-md-inline">Cost</h4>
        </div>
        <section id="reservations" name="reservations">
          ${this.ReservationsTemplate}
        </section>
        <form class="">
          <div class="d-flex justify-content-end">
            <button class="btn mdi mdi-md mdi-plus-box mx-4" onsubmit="app.reservationsController.createReservation('${this.id}')"></button>
          </div>
        </form>
        <div class="col-6">Notes</div>
        <textarea class="col-10 col-md-6" name="notes" id="notes" cols="30" rows="4"onblur="app.tripsController.editTrip('${this.id}')"></textarea>
        <div class="p-2 d-flex">
          <button class="btn btn-danger p-2" onclick="app.tripsController.deleteTrip('${this.id}')">Delete Trip</button>
          <section class="p-2 ms-auto"> Total Cost: $${this.TripTotal}</section>
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
    let reservations = ProxyState.reservations.filter(r => r.tripId == this.id).sort((a, b) => a.date -b.date)
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