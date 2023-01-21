import { describe, expect, it } from 'vitest'
import { Appointment } from '../entities/appointment'
import { InMemoryAppointmentRepository } from '../repositories/in-memory/in-memory-appointment-repository'
import { getFutureDate } from '../tests/utils/get-future-date'
import { CreateAppointment } from './create-appointment'

describe('Create Appointment', () => {
    it('should be able to create an appointment', () => {
        const appointmentRepository = new InMemoryAppointmentRepository()
        const sut = new CreateAppointment(appointmentRepository)

        expect(sut.execute({
            customer: 'John Doe',
            startsAt: getFutureDate("2022-08-09"),
            endsAt: getFutureDate("2022-08-10")
        })).resolves.toBeInstanceOf(Appointment)
    })

    it('should not be able to create an appointment with overlapping dates', async () => {
        const appointmentRepository = new InMemoryAppointmentRepository()
        const sut = new CreateAppointment(appointmentRepository)

        await sut.execute({
            customer: 'John Doe',
            startsAt: getFutureDate("2022-08-10"),
            endsAt: getFutureDate("2022-08-15")
        })

        expect(sut.execute({
            customer: 'John Doe',
            startsAt: getFutureDate("2022-08-14"),
            endsAt: getFutureDate("2022-08-18")
        })).rejects.toBeInstanceOf(Error)

        expect(sut.execute({
            customer: 'John Doe',
            startsAt: getFutureDate("2022-08-08"),
            endsAt: getFutureDate("2022-08-12")
        })).rejects.toBeInstanceOf(Error)

        expect(sut.execute({
            customer: 'John Doe',
            startsAt: getFutureDate("2022-08-08"),
            endsAt: getFutureDate("2022-08-17")
        })).rejects.toBeInstanceOf(Error)

        expect(sut.execute({
            customer: 'John Doe',
            startsAt: getFutureDate("2022-08-11"),
            endsAt: getFutureDate("2022-08-14")
        })).rejects.toBeInstanceOf(Error)
    })
})
