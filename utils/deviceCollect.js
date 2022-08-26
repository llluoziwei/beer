import NET from "./request.js";
import API from "../config/api.js";

export function device(position_id, coll_type_id, device_coll_param) {
  let a = NET.tempRequest(
    API.deviceCollect,
    {
      work_position_id: position_id,
      device_coll_type_id: coll_type_id,
      device_coll_param: device_coll_param,
    },
    "POST"
  )
    .then(async (res) => {
      if (res.data.code == 200) {
        return await res.data.data.value;
      } else {
        uni.showToast({
          title: res.data.msg,
          icon: "none",
          duration: 2000,
        });
      }
    })
    .catch(async (err) => {
      console.log(err);
      uni.showToast({
        title: err.data.msg,
        icon: "none",
        duration: 2000,
      });
    });

  return a;
}
