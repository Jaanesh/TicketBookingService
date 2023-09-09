export enum CustomLogType {
  APP = "APP_LEVEL",
  REQ_RES = "REQ_RES",
}

export enum CustomLogLayout {
  APP = "app",
  REQ_RES = "req_res",
}

export enum CustomLogCategory {
  APP = "default",
  REQ_RES = "REQ_RES",
}

export enum CustomLogAppender {
  APP_STDOUT = "app_stdout",
  REQ_RES_STDOUT = "req_res_stdout",
}

export const LOG_LEVEL = process.env.LOG_LEVEL;
