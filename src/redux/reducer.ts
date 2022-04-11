export const ActionType = {
  SET_CONTAINER: 'SET_CONTAINER',
  UPDATE_IMAGE_SEARCH: 'UPDATE_IMAGE_SEARCH',
  UPDATE_KEY_WORD: 'UPDATE_KEY_WORD',
  UPDATE_DATA_REQUEST: 'UPDATE_DATA_REQUEST',
  UPDATE_DATA: 'UPDATE_DATA'
};
export const TypeSearch = {
  IMAGE: 'image',
  KEY_WORD: 'keyword'
};
const initialState = {
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
  }
};
export type CustomReducerState = typeof initialState;
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
    case ActionType.UPDATE_DATA_REQUEST: {
      return {
        ...state,
        currentImage: null,
        typeSearch: null,
        currentKeyword: null
      }
    }
    case ActionType.UPDATE_DATA: {
      return {
        ...state,
        data: {...state.data, ...action.data}
      }
    }
    default:
      return state;
  }
};
