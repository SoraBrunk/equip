import request from "@/utils/request";

//获取下拉工器具类型
export function getCheckQuipType(data) {
  return request({
    url: "bs/v0/inspect/check/alltypes",
    method: "get",
    data,
  });
}

//获取城市县
export function getCity(data) {
  return request({
    url: `/system/v0/org/tree?parentId=${data}`,
    method: "get",
  });
}
