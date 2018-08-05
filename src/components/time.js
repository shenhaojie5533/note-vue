let time =  function (str) {
  let date = new Date(str)
  year  = date.getFullYear();
  mon  = date.getMonth()+1;
  day  = date.getDate();
  h  = date.getHours();
  min  = date.getMinutes();
  s = date.getSeconds()
  return `${year}年${mon}月${day}日`
}
module.exports = time
