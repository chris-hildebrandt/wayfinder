import { ProxyState } from "../AppState.js";
import { Reservation } from "../Models/Reservation.js";
import { Trip } from "../Models/Trip.js";

export function save(){
  let data = {
    trips : ProxyState.trips,
    reservations : ProxyState.reservations
  }
  localStorage.setItem('wayfinder', JSON.stringify(data))
}

export function load(){
  let rawData = localStorage.getItem("wayfinder")
  if(rawData){
    let data = JSON.parse(rawData)
    ProxyState.trips = data.trips.map(t => new Trip(t))
    ProxyState.reservations = data.reservations.map(r => new Reservation(r))
  }
}