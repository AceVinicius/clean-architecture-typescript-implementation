import { Appointment } from "../entities/appointment"
import { AppointmentRepository } from "../repositories/appointment-repository"

interface CreateAppointmentRequest {
    customer: string
    startsAt: Date
    endsAt: Date
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
    constructor(
        private appointmentRepository: AppointmentRepository
    ) {}

    async execute(request: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
        const {customer, startsAt, endsAt} = request

        const overlappingAppointment = await this.appointmentRepository.findOverlappingAppointment(startsAt, endsAt)

        if (overlappingAppointment) {
            throw new Error('Another appointmentoverlaps this appointment dates')
        }

        const appointment = new Appointment({
            customer,
            startsAt,
            endsAt
        })

        await this.appointmentRepository.create(appointment)
        
        return appointment
    }
}
