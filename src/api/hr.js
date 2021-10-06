import request from '@/utils/request'

export function saveOrUpdateHrInfo(data) {
  return request({
    url: `/hr`,
    method: 'post',
    data
  })
}

export function saveOrUpdateCompanyInfo(data) {
  return request({
    url: `/hr/company`,
    method: 'post',
    data
  })
}
