import * as home from './action-type';
import Immutable from 'immutable';

// 首页表单数据
export const formData = (state = [] , action = {}) => {
  switch(action.type){
    case home.SAVEFORMDATA:
      let result = Immutable.List(action.data).toJS();
      return result;
    default:
      return state;
  }
}

export const formData2 = (state=[], action = {}) => {
  switch(action.type){
    case home.SAVEFORMDATA2:
      let result = Immutable.List(action.data).toJS();
      return result;
    default:
      return state;
  }
}

export const mainword = (state=[], action = {}) => {
  switch(action.type){
    case home.UPDATEMAINWORD:
      return action.data;
    default:
      return state;
  }
}

