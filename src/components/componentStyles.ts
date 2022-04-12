import { makeStyles } from '@material-ui/core';

export const useStyle = makeStyles(() =>({
  root: {
    display: 'inline-flex',
    width: '100%',
    margin: 'auto',
    paddingTop: 50
  },
  schedules: {
    display: 'inline-flex',
    width: '90%',
    margin: 'auto',
    paddingTop: 10,
    paddingLeft: 10
  },
  baseTime: {
    display: 'inline-flex',
    width: '100%',
    margin: 'auto',
    paddingTop: 30,
    paddingLeft: 10,
    paddingBottom: 30
  },
  typo: {
  
  },
  dateTime:{
    marginLeft: 30
  },
  divTimePicker: {
    flexGrow: 1,
    margin: 'auto'
  },
  scheduleText:{
    paddingRight: 15,
    paddingLeft: 15,
    '& .MuiInputLabel-root' :{
      color: '#000'
    }
  },
  imageShow:{
    paddingRight: 30
  },
  textField: {
    '& .MuiInputLabel-root' :{
      color: '#000'
    }
  },
  infoText: {
    margin: 'auto'
  }
}))