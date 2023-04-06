const SYSTEM_NAME = "yuanli-iot"

class CacheKey {
  static TOKEN = `${SYSTEM_NAME}_ms_token`
  static EMAIL = `${SYSTEM_NAME}_ms_email`
  static ROLE = `${SYSTEM_NAME}_ms_role`
  static PROJECT = `${SYSTEM_NAME}_ms_project`
  static PROJECT_KEY = `${SYSTEM_NAME}_ms_project_key`
  static CUR_REGION = `cur_region`
}

export default CacheKey
