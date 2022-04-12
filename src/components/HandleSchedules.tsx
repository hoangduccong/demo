import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerState } from '../redux/reducer';
import { useStyle } from './componentStyles';
import CustomTextField from './CustomTextField';
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { changeDate, changeNotifyTime, updateScheduleTimeByIndex } from '../redux/action';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const DayCheckedTime = [
  {
    value: 'morning',
    label: 'Morning'
  },
  {
    value: 'afternoon',
    label: 'Afternoon'
  },
  {
    value: 'night',
    label: 'Night'
  }
];
const HandleSchedules = () => {
  const { schedule } = useSelector((state: ReducerState) => state);
  const classes = useStyle();
  const dispatch = useDispatch();
  const createSchedule = (s: any, index: number) => {
    return (<div className={classes.schedules}>
      <CustomTextField className={classes.scheduleText} disabled value={s.name}
                       label={index === 0 ? 'Name' : ''}/>
      <CustomTextField className={classes.scheduleText} disabled value={s.desc}
                       label={index === 0 ? 'Description' : ''}/>
      {DayCheckedTime.map((t) => {
        return (<FormControlLabel
          control={(
            <Checkbox
              checked={s?.time?.[t.value]}
              onChange={(_, checked) =>
                dispatch(updateScheduleTimeByIndex(index, t.value, checked))}
              color="primary"
            />
          )}
          label={t.label}
        />);
      })}
    </div>);
  };
  
  const generateTimeNotify = () => {
    return <div className={classes.baseTime}>
      <Typography className={classes.typo}> Time notify </Typography>
      <div className={classes.divTimePicker}>
        <TimePicker
          className={classes.dateTime}
          autoOk
          ampm={false}
          label={'Morning'}
          onChange={(e: MaterialUiPickersDate) => {
            if (e) {
              dispatch(changeNotifyTime('morning', e));
            }
          }}
          value={schedule.base_time.morning ? new Date(String(schedule.base_time.morning)) : null}
        />
        <TimePicker
          className={classes.dateTime}
          ampm={false}
          autoOk
          label={'Afternoon'}
          onChange={(e: MaterialUiPickersDate) => {
            if (e) {
              dispatch(changeNotifyTime('afternoon', e));
            }
          }}
          value={schedule.base_time.afternoon ? new Date(String(schedule.base_time.afternoon)) : null}
        />
        <TimePicker
          className={classes.dateTime}
          ampm={false}
          autoOk
          label={'Night'}
          onChange={(e: MaterialUiPickersDate) => {
            if (e) {
              dispatch(changeNotifyTime('night', e));
            }
          }}
          value={schedule.base_time.night ? new Date(String(schedule.base_time.night)) : null}
        />
      </div>
    </div>;
  };
  
  const generateStartEndDates = () => {
    return <div>
      <DatePicker
        className={classes.dateTime}
        autoOk
        format="dd/MM/yyyy"
        label="Start date"
        onChange={(newValue: MaterialUiPickersDate) => {

          if (newValue) {
            dispatch(changeDate('start_date', newValue));
          }
        }}
        value={schedule.start_date ? new Date(String(schedule.start_date)) : null}/>
      <DatePicker
        className={classes.dateTime}
        format="dd/MM/yyyy"
        autoOk
        label="End Date"
        onChange={(newValue: MaterialUiPickersDate) => {
          
          if (newValue) {
            dispatch(changeDate('end_date', newValue));
          }
        }}
        value={schedule.end_date ? new Date(String(schedule.end_date)) : null}/>
    </div>;
  }
  
  return (
    <div>
      {schedule.items.map((s, index) => createSchedule(s, index))}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {generateTimeNotify()}
        {generateStartEndDates()}
      </MuiPickersUtilsProvider>
    
    </div>
  );
};

export default HandleSchedules;