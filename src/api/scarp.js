import request from "@/utils/request";

//获取所在智能柜
export function getBox(params) {
  return request({
    url: `/bs/v0/checkScrapped/findDeviceInfo`,
    method: "get",
    params,
  });
}

//分页查询报废审批
export function approval(params) {
  return request({
    url: `/bs/v0/checkScrapped/list`,
    method: "get",
    params,
  });
}

//审批操作
export function scarp(params) {
  return request({
    url: `/bs/v0/checkScrapped/approve/${params.id}/${params.status}`,
    method: "get",
    params: { msg: params.msg },
  });
}

//分页查询检查台账
export function verification(params) {
  return request({
    url: `/bs/v0/checkScrapped/findCheckInfo`,
    method: "get",
    params,
  });
}

//分页查询报废台账
export function scarpList(params) {
  return request({
    url: `/bs/v0/checkScrapped/scrappedList`,
    method: "get",
    params,
  });
}

//工器具档案基本信息
export function scarpDetails(epc) {
  return request({
    url: `/bs/v0/checkScrapped/findScrappedToolBasicInfo/${epc}`,
    method: "get",
  });
}

//工器具档案出入库记录分页查询
export function warehousing(params) {
  return request({
    url: `/bs/v0/checkScrapped/findOperateInfo/${params.epc}`,
    method: "get",
    params,
  });
}

//工器具档案检验记录分页查询
export function scarpCheck(params) {
  return request({
    url: `/bs/v0/checkScrapped/findVerificationInfo/${params.epc}`,
    method: "get",
    params,
  });
}
