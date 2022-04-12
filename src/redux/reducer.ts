import { ActionType } from './action';
import schedule from '../components/Schedule';

export const TypeSearch = {
  IMAGE: 'image',
  KEY_WORD: 'keyword'
};

export interface ScheduleItem {
  name: string;
  desc: string;
  time: {
    morning: boolean;
    afternoon: boolean;
    night: boolean;
  };
}

export interface Schedule {
  base_time: {
    morning: object | null;
    afternoon: object| null;
    night: object | null;
  };
  start_date: object| null;
  end_date: object| null;
  items: Array<ScheduleItem>;
}


export interface ReducerState {
  container: {
    width: number;
    height: number;
  },
  currentImage: any,
  currentKeyword: string | null,
  typeSearch: string | null,
  data: {
    name?: string | null,
    price?: string | null,
    specified?: string | null,
    ingredient?: string | null,
    contraindication?: string | null,
    Pharmacies?: string | null
  },
  schedule: Schedule,
}

const initialState: ReducerState = {
  container: {
    width: 0,
    height: 0
  },
  currentImage: null,
  currentKeyword: null,
  typeSearch: null,
  data: {
    name: null,
    price: null,
    specified: null,
    ingredient: null,
    contraindication: null,
    Pharmacies: null
  },
  schedule: {
    base_time: {
      morning: null,
      afternoon: null,
      night: null
    },
    start_date: null,
    end_date: null,
    items: [
      { name: 'NEBIVOLOL 5mg (NEBICARD)', desc: 'Ngày uống 1 lần, lần uống 1/2 viên, sau ăn sáng', time: { morning: true, afternoon: true, night: false } },
      { name: 'INDAPADMID 1.5mg(NATRILIX SR)', desc: 'Ngày uống 1 lần, lần uống 1 viên, sau ăn sáng', time: { morning: true, afternoon: true, night: false } },
      { name: 'VALSARTAN 80mg (VALSACARD 80)', desc: 'Ngày uống 1 lần, lần uống 1/2 viên, sau ăn chiều', time: { morning: true, afternoon: true, night: false } },
      { name: 'NITROGLYCERIN 2.6mg (NITROMINT)', desc: 'Ngày uống 2 lần, lần uống 1 viên, sau ăn sáng, chiều', time: { morning: true, afternoon: true, night: false } },
      { name: 'CLOPIDOGREL 75mg (CLOPIKIP)', desc: 'Ngày uống 1 lần, lần uống 1 viên, sau ăn chiều', time: { morning: true, afternoon: true, night: false } },
    ]
  }
};
// @ts-ignore
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CONTAINER:
      return { ...state, container: action.container };
    case ActionType.UPDATE_IMAGE_SEARCH:
      return {
        ...state,
        currentImage: action.image,
        typeSearch: TypeSearch.IMAGE,
        currentKeyword: null
      };
    case ActionType.UPDATE_KEY_WORD:
      return {
        ...state,
        currentImage: undefined,
        currentKeyword: action.keyword,
        typeSearch: TypeSearch.KEY_WORD
      };
    case ActionType.UPDATE_DATA: {
      return {
        ...state,
        data: { ...state.data, ...action.data }
      };
    }
    case ActionType.UPDATE_SCHEDULE_TIME: {
      const { index, key, checked } = action;
      if (state.schedule.items[index]) {
        return {
          ...state,
          schedule: {
            ...state.schedule, items: state.schedule.items.map((s, idx) =>
              index === idx ? ({ ...s, time: { ...s.time, [key]: checked } }) : s)
          }
        };
      }
      return state;
    }
    case ActionType.UPDATE_NOTIFY_TIME: {
      const {key, value} = action;
      return {
        ...state,
        schedule: {...state.schedule, base_time: {...state.schedule.base_time, [key]: value}}
      }
    }
    case ActionType.UPDATE_NOTIFY_DATE:
      const {key, value} = action;
      return {
        ...state,
        schedule: {...state.schedule, [key]: value}
      }
    case ActionType.UPDATE_SCHEDULE_DATA:
      return {
        ...state,
        schedule: action.data,
        currentImage: undefined
      }
    default:
      return state;
  }
};
