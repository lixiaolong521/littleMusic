const date =  new Date();
// type 代表的是要获取日期还是时间；separate代表的是按什么符号分割
export default (type='date',separate='/')=>{
  return getDateTime(type,separate);
}
function getDateTime(type,separate){
  switch(type){
    case 'date':
      // console.log(date.getFullYear())
      let Y = date.getFullYear();
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)
      let D = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
      let datetime = Y+separate+M+separate+D;
      return datetime
    case 'time':
      let H = date.getHours();
      let m = date.getMinutes();
      let time = H+separate+m
      return time;
  }
}