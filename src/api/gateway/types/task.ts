export interface ICreateTaskData {
  type: number
  clockType: number
  time: number
  taskJson: string
}

export interface IGetTaskParams {
  page: number
  limit: number
}

