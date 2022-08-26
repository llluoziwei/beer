export function timestamp(timestamp, format) {
  let date = new Date(timestamp);
  let Y = date.getFullYear();
  let M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  format = format.indexOf("Y") > -1 ? format.replace("Y", Y) : format;
  format = format.indexOf("M") > -1 ? format.replace("M", M) : format;
  format = format.indexOf("D") > -1 ? format.replace("D", D) : format;
  format = format.indexOf("H") > -1 ? format.replace("H", H) : format;
  format = format.indexOf("m") > -1 ? format.replace("m", m) : format;
  format = format.indexOf("s") > -1 ? format.replace("s", s) : format;
  return format;
}
