import request from "@/utils/request";

//获取轨迹跟踪列表分页
export function getTrackList(params) {
  return request({
    url: `/bs/v0/useStorage/findToolTrack`,
    method: "get",
    params,
  });
}

//轨迹跟踪地图模式
export function getTrackListMap(params) {
  return request({
    url: `/bs/v0/useStorage/findTrackChart`,
    method: "get",
    params,
  });
}

//获取使用台账分页
export function getUseList(params) {
  return request({
    url: `/bs/v0/useStorage/findToolOperateInfo`,
    method: "get",
    params,
  });
}

//获取工器具出入库档案信息
export function useTrackDetails(epc) {
  return request({
    url: `/bs/v0/useStorage/findToolTrack/${epc}`,
    method: "get",
  });
}

//获取工器具出入库档案信息列表
export function useTrackDetailsList(params) {
  return request({
    url: `/bs/v0/useStorage/findToolTrackOperateInfo/${params.epc}`,
    method: "get",
    params,
  });
}

//出入库档案轨迹查看
export function useTrackDetailsMap(epc) {
  return request({
    url: `/bs/v0/useStorage/findToolAllTrackInfo/${epc}`,
    method: "get",
  });
}
