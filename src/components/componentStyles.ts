import { makeStyles } from '@material-ui/core';

export const useStyle = makeStyles(() =>({
  root: {
    display: 'inline-flex',
    width: '100%',
    margin: 'auto',
    paddingTop: 50
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