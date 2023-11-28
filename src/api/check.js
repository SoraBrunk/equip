import request from "@/utils/request";

//获取校验总览分页
export function checkAll(params) {
  return request({
    url: "/bs/v0/inspect/check/overview",
    method: "get",
    params,
  });
}

//获取检验周期分页
export function checkInspectionInterval(params) {
  return request({
    url: "/bs/v0/inspect/check/types/page",
    method: "get",
    params,
  });
}

//设置检验周期
export function changeTime(data) {
  return request({
    url: "/bs/v0/inspect/check/inspectioninterval",
    method: "post",
    data,
  });
}

//获取检查台账分页
export function checkList(params) {
  return request({
    url: "/bs/v0/inspect/check/in",
    method: "get",
    params,
  });
}

//获取工器具校验记录信息
export function checkMateDetails(params) {
  return request({
    url: "/bs/v0/inspect/check/detail",
    method: "get",
    params,
  });
}

//获取校验信息分页
export function checkMateList(params) {
  return request({
    url: "/bs/v0/inspect/check/history",
    method: "get",
    params,
  });
}

//获取工器具检验档案信息
export function checkArchivesDetails(params) {
  return request({
    url: "/bs/v0/inspect/check/in/detail",
    method: "get",
    params,
  });
}

//获取工器具检验档案列表
export function checkArchivesList(params) {
  return request({
    url: "/bs/v0/inspect/check/in/time",
    method: "get",
    params,
  });
}
