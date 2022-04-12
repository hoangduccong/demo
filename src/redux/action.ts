export const ActionType = {
  SET_CONTAINER: 'SET_CONTAINER',
  UPDATE_IMAGE_SEARCH: 'UPDATE_IMAGE_SEARCH',
  UPDATE_KEY_WORD: 'UPDATE_KEY_WORD',
  UPDATE_DATA_REQUEST: 'UPDATE_DATA_REQUEST',
  UPDATE_DATA: 'UPDATE_DATA',
  UPDATE_SCHEDULE_TIME: 'UPDATE_SCHEDULE_TIME',
  UPDATE_NOTIFY_TIME: 'UPDATE_NOTIFY_TIME',
  UPDATE_NOTIFY_DATE: 'UPDATE_NOTIFY_DATE'
};
export const updateImage = (image: any) => ({
  type: ActionType.UPDATE_IMAGE_SEARCH,
  image
});
export const updateData = (data: any) => ({
  type: ActionType.UPDATE_DATA,
  data
});
export const updateKeyword = (keyword: any) => ({
  type: ActionType.UPDATE_KEY_WORD,
  keyword
});
export const updateScheduleTimeByIndex = (index: number, key: string, checked: boolean) => ({
  type: ActionType.UPDATE_SCHEDULE_TIME,
  index,
  key,
  checked
});
export const changeNotifyTime = (key: string, value: any) => ({
  type: ActionType.UPDATE_NOTIFY_TIME,
  key,
  value
});
export const changeDate = (key: string, value: any) => ({
  type: ActionType.UPDATE_NOTIFY_DATE,
  key,
  value
});
