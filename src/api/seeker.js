// /hr/position/deliver/{deliverId}/workExperience

//  hr 查看当前求职者的详细信息
import request from '@/utils/request'

export function checkSeekerDetailInfo(deliverId) {
  return request({
    url: `/hr/position/deliver/${deliverId}`,
    method: 'get',
  })
}

export function getSeekerWorkExperience(deliverId) {
  return request({
    url: `/hr/position/deliver/${deliverId}/workExperience`,
    method: 'get',
  })
}

// 获取当前就职经历的评论
export async function getPositionComments(deliverId) {
  return request({
    url: `/hr/position/deliver/${deliverId}/workExperience/comment`,
    method: 'get',
  })
}
