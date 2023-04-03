export type ServeAddressItemResp = {
  id: number
  name: string
  addrsss: string
  status: null
}

export type GetServeAddressData = IApiResponseData<{
  list: ServeAddressItemResp[]
}>
