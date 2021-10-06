import request from '@/utils/request'

export function getRemindMessage(params){
  return request({
    url: `/message/remind`,
    method: 'get',
    params
  })
}

export function getGlobalMessage(params){
  return request({
    url: `/message`,
    method: 'get',
    params
  })
}
