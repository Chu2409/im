import { IFullLotLocation } from '@/core/lots/types'
import { Alert } from '@prisma/client'

export interface IFullAlert extends Alert {
  lotLocation: IFullLotLocation
}
