export type ISrsSelfData = {
  version: string
  pid: number
  ppid: number
  argv: string
  cwd: string
  mem_kbyte: number
  mem_percent: number
  cpu_percent: number
  srs_uptime: number
}

export type ISrsSystem = {
  cpu_percent: number
  disk_read_KBps: number
  disk_write_KBps: number
  disk_busy_percent: number
  mem_ram_kbyte: number
  mem_ram_percent: number
  mem_swap_kbyte: number
  mem_swap_percent: number
  cpus: number
  cpus_online: number
  uptime: number
  ilde_time: number
  load_1m: number
  load_5m: number
  load_15m: number
  net_sample_time: number
  net_recv_bytes: number
  net_send_bytes: number
  net_recvi_bytes: number
  net_sendi_bytes: number
  srs_sample_time: number
  srs_recv_bytes: number
  srs_send_bytes: number
  conn_sys: number
  conn_sys_et: number
  conn_sys_tw: number
  conn_sys_udp: number
  conn_srs: number
}

export type IMeminfoData = {
  buffers: number
  cached: number
  memActive: number
  memFree: number
  memTotal: number
  notInUse: number
  ok: boolean
  percent_ram: number
  percent_swap: number
  realInUse: number
  sample_time: number
  swapFree: number
  swapTotal: number
}

export type IGetSrsSummariesResponseData = IApiResponseData<{
  ok: boolean
  now_ms: number
  self: ISrsSelfData
  system: ISrsSystem
}>
