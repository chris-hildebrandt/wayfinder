import { generateId } from "../Utils/generateId.js";

export class Reservation {
  constructor(data) {
    this.id = data.id || generateId(),
      this.type = data.type,
      this.name = data.name,
      this.confirmation = data.confirmation,
      this.address = data.address,
      this.date = new Date(data.date),
      this.cost = data.cost
      this.tripId = data.tripId
  }

  get Template() {
    return `
      <div class="row text-center reservation rounded">
        <p class="col-1">${this.type}</p>
        <p class="col-2">${this.name}</p>
        <p class="col-3">${this.confirmation}</p>
        <p class="col-3">${this.address}</p>
        <p class="col-2">${this.date.toDateString()}</p>
        <p class="col-1">${this.cost}</p>
        <button class="btn mdi mdi-trash-can-outline" onclick="app.reservationsController.deleteReservation('${this.id}')"></button>
      </div>
    `
  }

}