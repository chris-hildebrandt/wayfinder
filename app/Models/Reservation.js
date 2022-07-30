import { generateId } from "../Utils/generateId.js";

export class Reservation {
  constructor(data) {
    this.id = data.id || generateId(),
      this.type = data.type,
      this.name = data.name,
      this.confirmationNumber = data.confirmationNumber,
      this.address = data.address,
      this.date = data.date,
      this.cost = data.cost
      this.tripId = data.tripId
  }

  get Template() {
    return `
      <div class="row text-center">
        <p class="col-1">${this.type}</p>
        <p class="col-2">${this.name}</p>
        <p class="col-3">${this.confirmationNumber}</p>
        <p class="col-3">${this.address}</p>
        <p class="col-2">${this.date}</p>
        <p class="col-1">${this.cost}</p>
      </div>
    `
  }

}