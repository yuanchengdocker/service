import * as home from './action-type';
import {axiosAjax} from '../../service/getService';
import {formatDateTime} from '../../utils/optTime'
import {getUser,delUser,getUserFlag} from '../../components/userInit'

// 保存表单数据
export const getMemberList = (state,page,param2) => async (dispatch) => {
  let param = {
    currentPage:(page&&page.current)||state.pagination.current,
    pageSize:(page&&page.pageSize)||state.pagination.pageSize,
    table:"member",
    param:param2||{}
  }
  let {data,total,code,messgage} = await axiosAjax(["member","list"],param,"post")
  if(code != 1000){
    notification['error']({
        message: '失败',
        description: messgage
    });
    if(code == 1009){
        delUser();
    }
  }
  data&&data.map((item)=>{
      item.create_time = formatDateTime(item.create_time)
  })
  dispatch({
      type: home.SAVEFORMDATA,
      data:data
  });
  dispatch({
      type: home.SAVEFORMDATA2,
      data:data
  });
}

export const updateMainWord = (data) => (dispatch)=> {
    dispatch({
        type: home.UPDATEMAINWORD,
        data:data
    });
}


