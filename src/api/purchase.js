import request from "@/utils/request";

//采购计划分页查询
export function getPurchasePlanList(params) {
  return request({
    url: `/bs/v0/purchase/plans/page`,
    method: "get",
    params,
  });
}

//采购计划页面信息操作
export function purchaseChange(data) {
  return request({
    url: `/bs/v0/purchase/plans`,
    method: "post",
    header: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    data,
  });
}

//查询本单位及上级单位
export function slectOrg(params) {
  return request({
    url: `/bs/v0/purchase/plans/audit/orgs`,
    method: "get",
    params,
  });
}

//增量入库分页
export function purchaseAdd(params) {
  return request({
    url: `/bs/v0/purchase/stock/page`,
    method: "get",
    params,
  });
}
