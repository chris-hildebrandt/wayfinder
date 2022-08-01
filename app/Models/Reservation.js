import { generateId } from "../Utils/generateId.js";

export class Reservation {
  constructor(data) {
    this.id = data.id || generateId(),
      this.type = data.type,
      this.name = data.name,
      this.confirmation = data.confirmation,
      this.address = data.address,
      this.date = new Date(data.date),
      this.cost = data.cost || 0
      this.tripId = data.tripId
  }

  get Template() {
    return `
      <div class="row text-center d-flex reservation border border-primary rounded p-0 shadow my-3 mx-1">
        <p class="col-1 col-md-1 pt-3 mdi-md">${this.type}</p>
        <p class="col-6 col-md-2 pt-3">${this.name}</p>
        <p class="col-4 col-md-2 pt-3">${this.confirmation}</p>
        <p class="col-12 col-md-3 pt-3 text-md-end">${this.address}</p>
        <p class="col-6 col-md-2 pt-3">${this.date.toLocaleDateString('en-US')}</p>
        <p class="col-6 col-md-1 pt-3">$${this.cost.toFixed(2)}</p>
        <button class="col-1 order-7 btn mdi mdi-trash-can-outline" onclick="app.reservationsController.deleteReservation('${this.id}')"></button>
      </div>
    `
  }

}