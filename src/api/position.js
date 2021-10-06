import request from '@/utils/request'

export function changePositionUseStatus(positionId) {
  return request({
    url: `/hr/position/${positionId}`,
    method: 'put'
  })
}

export function saveORUpdatePositionInfo(data) {
  return request({
    url: `/hr/position`,
    method: 'post',
    data
  })
}

export function checkDeliver(data) {
  return request({
    url: `/hr/position/checkDeliver`,
    method: 'put',
    data
  })
}



