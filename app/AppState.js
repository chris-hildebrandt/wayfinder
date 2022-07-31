import { Trip } from "./Models/Trip.js"
import { Reservation } from "./Models/Reservation.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = []

  navTabs = ""

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
      type: "✈️", 
      name: "UA-1234", 
      confirmation: "JKEVDA", 
      address: "3201 W Airport Way, Boise, ID", 
      date: "04/25/2022", 
      cost: 587,
      tripId: 22
    }),

    new Reservation({
      type: "🏨",
      name: "Disneyland Hotel",
      confirmation: "95331559",
      address: "1150 Magic Way, Anaheim, CA",
      date: "04/23/2022",
      cost: 782,
      tripId: 22
    }),

    new Reservation({
      type: "🚗", 
      name: "canoo Rental", 
      confirmation: "LA395MS", 
      address: "451 s 100 e Hyrum, UT", 
      date: "04/22/2022", 
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