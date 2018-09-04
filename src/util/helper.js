import data from './dishes.json'

export function getData() {
  return data
}

export function getDishes(dishes, restaurant) {
  return dishes.filter((e) => e.restaurant === restaurant)
}

export function getAvailableMeal(dishes, meal) {
  return dishes.filter((e) => e.availableMeals.includes(meal))
}

export function getRestaurant(dishes) {
  return Array.from(new Set(dishes.map((e) => e.restaurant)))
}

export function validateNumber(value) {
  if (value > 0 && value <= 10) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    }
  } else {
    return {
      validateStatus: 'error',
      errorMsg: 'number of people(min - 1 & max - 10)',
    }
  }
}

export function validateDish(peopleNum, dishesNums, max = 10) {
  let sum = 0
  for (const num of dishesNums) {
    sum += parseInt(num, 10)
  }
  return sum >= peopleNum && sum <= max
}
