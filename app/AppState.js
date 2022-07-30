import { Trip } from "./Models/Trip.js"
import { Reservation } from "./Models/Reservation.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = []

  /** @type {import('./Models/Trip').Trip[]} */
  trips = [
    new Trip({
      id: 15,
      title: "Redwoods '23",
      notes: "It's going to be fun!"
    }),

    new Trip({
      id: 22,
      title: "Disneyland",
      notes:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod deleniti quam commodi temporibus. Eum distinctio maxime autem neque perferendis tempore cupiditate libero modi, similique ut aperiam nostrum amet sit!"
    }),

  ]

  /** @type {import('./Models/Reservation').Reservation[]} */

  reservations = [
    new Reservation({
      type: "Flight", 
      name: "UA-1234", 
      confirmationNumber: "JKEVDA", 
      address: "3201 W Airport Way, Boise, ID", 
      date: 4/22/22, 
      cost: 587,
      tripId: 22
    }),

    new Reservation({
      type: "Hotel",
      name: "Disneyland Hotel",
      confirmationNumber: "95331559",
      address: "1150 Magic Way, Anaheim, CA",
      date: 4/23/22,
      cost: 782,
      tripId: 22
    }),

    new Reservation({
      type: "Rental", 
      name: "canoo Rental", 
      confirmationNumber: "LA395MS", 
      address: "451 s 100 e Hyrum, UT", 
      date: 4/22/22, 
      cost: 2546,
      tripId: 15
    }),
  ]
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
