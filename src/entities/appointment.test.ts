import { expect, it } from 'vitest'
import { getFutureDate } from '../tests/utils/get-future-date'
import { getPastDate } from '../tests/utils/get-past-date'
import { Appointment } from './appointment'

it('should be able to create an appointment', () => {
    const startsAt = getFutureDate("2022-08-09")
    const endsAt = getFutureDate("2022-08-10")

    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt,
        endsAt,
    })

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.customer).toEqual('John Doe')
})

it('should not be able to create an appointment with end date before start date', () => {
    const startsAt = getFutureDate("2022-08-10")
    const endsAt = getFutureDate("2022-08-09")

    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt,
        })
    }).toThrow()
})

it('should not be able to create an appointment with start date before current date', () => {
    const startsAt = getPastDate("2022-08-10")
    const endsAt = getFutureDate("2022-08-10")

    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt,
        })
    }).toThrow()
})
