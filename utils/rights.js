export function rights(ident) {
  let allRights = uni.getStorageSync("rights");
  let right = allRights.filter((item) => {
    return item.rights == ident;
  });
  console.log(right);
  return right;
}
