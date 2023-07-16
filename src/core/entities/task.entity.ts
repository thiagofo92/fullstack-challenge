export interface TaskEntity {
  id?: string
  idUser: string
  title: string
  description: string
  status: TaskStatus
  endDate: Date
}

export enum TaskStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}
