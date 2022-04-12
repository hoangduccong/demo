export const ActionType = {
  SET_CONTAINER: 'SET_CONTAINER',
  UPDATE_IMAGE_SEARCH: 'UPDATE_IMAGE_SEARCH',
  UPDATE_KEY_WORD: 'UPDATE_KEY_WORD',
  UPDATE_DATA_REQUEST: 'UPDATE_DATA_REQUEST',
  UPDATE_DATA: 'UPDATE_DATA'
};
export const updateImage = (image: any) => ({
  type: ActionType.UPDATE_IMAGE_SEARCH,
  image
});
export const updateData = (data: any) => ({
  type: ActionType.UPDATE_DATA,
  data
})
export const updateKeyword = (keyword: any) => ({
  type: ActionType.UPDATE_KEY_WORD,
  keyword
})