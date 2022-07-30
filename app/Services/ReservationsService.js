import { ProxyState } from "../AppState.js";
import { Reservation } from "../Models/Reservation.js";


class ReservationsService{

  createReservation(newReservation){
    ProxyState.reservations = [...ProxyState.reservations, new Reservation(newReservation)]
  }
}

export const reservationsService = new ReservationsService()