import { UserEntity } from 'src/core/entities/user.entity'

export type UserAppInPutDto = UserEntity
export type UserAppOutPutDto = UserEntity
export type UserAppCreatedOutPutDto = {
  id: string
  name: string
}
