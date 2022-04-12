import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'inline',
    margin: '10px 25px'
  },
  buttonList:{
    display: 'inline-flex',
    width: '90%',
    margin: 'auto'
  },
  previewBlock: {
    margin: 'auto',
    width: '50%',
    display: 'grid'
  },
  flipButton: {
    width: 50,
    margin: 'auto',
    marginTop: 10
  },
  inputFields: {
    display: 'inline-flex',
    flexGrow: 1,
    justifyContent: 'center'
  }
}));