import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"

export class Trip {
  constructor(data) {
    this.id = data.id || generateId(),
      this.title = data.title,
      this.notes = data.notes
      this.color = data.color
  }

  get Template() {
    return `
      <div class="container bg-light bg-glass rounded m-2">
        <div class="row fluid text-center font-custom2 rounded p-1 trip-bar">
            <h4 class="col-1 d-none d-md-inline">Type</h4>
            <h4 class="col-2 d-none d-md-inline">Name</h4>
            <h4 class="col-3 d-none d-md-inline">Confirmation Number</h4>
            <h4 class="col-2 d-none d-md-inline">Address</h4>
            <h4 class="col-2 d-none d-md-inline">Date</h4>
            <h4 class="col-1 d-none d-md-inline">Cost</h4>
            <input type="color" class="col-1 form-control form-control-color" id="color" value="#563d7c" title="Choose your color">
        </div>
        <section id="reservations" name="reservations">
          ${this.ReservationsTemplate}
        </section>
        <form class="row" onsubmit="app.reservationsController.createReservation('${this.id}')">
          <select class=" ms-4 form-select-inline col-6 col-md-1 rounded m-1" id="type" name="type" required>
            <option selected>Type...</option>
            <option value="✈️">✈️ Flight</option>
            <option value="🚗">🚗 Vehicle</option>
            <option value="🏨">🏨 Hotel</option>
          </select>
          <div class="col-6 col-md-2 m-1">
            <input type="text" class="form-control" id="name" name="name" required placeholder="Name..."
              aria-label="name">
          </div>
          <div class="col-6 col-md-2 m-1">
            <input type="text" class="form-control" id="confirmation" name="confirmation" required
              placeholder="Confirmation...">
          </div>
          <div class="col-6 col-md-2 m-1">
            <input type="address" class="form-control" id="address" name="address" required placeholder="Address..."
              aria-label="address">
          </div>
          <div class="col-6 col-md-2 m-1">
            <input type="date" class="form-control" id="date" name="date" required>
          </div>
          <div class="col-6 col-md-1 m-1">
            <input type="cost" class="form-control" id="cost" name="cost" required placeholder="$0.00"
              aria-label="cost">
          </div>
          <div class="col-md-1">
          <button class="btn mdi mdi-md mdi-plus-box mx-4 text-blue"></button>
          </div>
      </form>
        <div class="col-6">Notes</div>
        <textarea class="col-10 col-md-6" name="notes" id="notes" cols="30" rows="4" placeholder="Write notes here" onblur="app.tripsController.editTrip('${this.id}')">${this.notes}</textarea>
        <div class="p-2 d-flex">
          <button class="btn btn-danger p-2" onclick="app.tripsController.deleteTrip('${this.id}')">Delete Trip</button>
          <section class="p-2 ms-auto"> Total Cost: $${this.TripTotal.toFixed(2)}</section>
        </div>
      </div>
    `
  }

  // get TabTemplate() {
  //   return `
  //   <li class="nav-item">
  //     <a class="nav-link active" href="#">Trip 22</a>
  //   </li>
  //   `
  // }

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