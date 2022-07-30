import { ProxyState } from "../AppState.js"
import { Trip } from "../Models/Trip.js"



class TripsService{

  createTrip(newTrip){
    console.log("creating party in service");
    ProxyState.trips = [...ProxyState.trips, new Trip(newTrip)]
  }

  deleteTrip(id){
  ProxyState.trips = ProxyState.trips.filter(t => t.id != id)
  ProxyState.reservations = ProxyState.reservations.filter(r => r.tripId != id)
  }
}

export const tripsService = new TripsService()