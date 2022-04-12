import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerState } from '../redux/reducer';
import { updateImage, updateScheduleData } from '../redux/action';
import { useStyles } from '../useStyles';
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';
import ImageSelector from './ImageSelector';
import { CameraAltRounded, FlipOutlined } from '@material-ui/icons';
import CameraFeed from './CameraFeed';
import { Preview } from '../styles';
import { BiCloudUpload, GiProcessor } from 'react-icons/all';
import HandleSchedules from './HandleSchedules';
import { flipCaptureImageUtil, flipUploadImageUtil } from './utils/Util';
import moment from 'moment';

const Schedule = () => {
  const dispatch = useDispatch();
  const [ hasResult, setHasResult ] = useState(false);
  const [ currentType, setCurrentType ] = useState<string>();
  const [ isOpenCam, setIsOpenCam ] = useState(false);
  const [ cardImage, setCardImageData ] = useState<Blob | null>(null);
  const [ loading, setLoading ] = useState( false);
  const [draftNotfication, setDraftNotification] = useState(false);
  const state = useSelector((state: ReducerState) => state);
  useEffect(() => {
    if (cardImage) {
      const reader = new FileReader();
      reader.readAsDataURL(cardImage);
      reader.onloadend = function () {
        dispatch(updateImage(reader.result));
        setHasResult(false);
      };
    } else {
      dispatch(updateImage(undefined));
    }
  }, [ cardImage ]);
  const classes = useStyles();
  const DATE_FORMAT = "DD/MM/YYYY";
  const TIME_FORMAT = "HH:MM";
  const handleProcessImage = () => {
    setLoading(true);
    const body = {
      image: state.currentImage
    };
    const url = 'http://localhost:5000/remind';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json'
      },
      mode: 'cors'
    }).then((res) => {
      return res.json();
    }).then((result) => {
      dispatch(updateScheduleData(result));
      setHasResult(true);
    }).catch((e) => {
      console.log(e);
      setHasResult(false);
    }).finally(() => {
      setLoading(false);
    });
  };
  const handleSubmitSchedules = () => {
    const body = {
      items: state.schedule.items,
      start_date: state.schedule.start_date ? moment(String(state.schedule.start_date)).format(DATE_FORMAT) : null,
      end_date: state.schedule.end_date ? moment(String(state.schedule.end_date)).format(DATE_FORMAT) : null,
      base_time: {
        morning: state.schedule.base_time.morning ? moment(String(state.schedule.base_time.morning)).format(TIME_FORMAT) : null,
        afternoon: state.schedule.base_time.afternoon ? moment(String(state.schedule.base_time.afternoon)).format(TIME_FORMAT) : null,
        night: state.schedule.base_time.night ? moment(String(state.schedule.base_time.night)).format(TIME_FORMAT) : null,
      }
    };
    const url = 'http://localhost:5000/confirm';
    
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json'
      },
      mode: 'cors'
    }).then((response) => {
      setDraftNotification(true);
      setHasResult(false);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      setLoading(false);
    });
  };
  const flipCapturedImage = () => {
    flipCaptureImageUtil('image-base64', state.container, setCardImageData);
  };
  const flipUploadedImage = () => {
    flipUploadImageUtil('image-base64', setCardImageData, dispatch);
  };
  return <div className={classes.root}>
    {loading && (
      <Backdrop style={{ zIndex: 99999 }} open={loading}>
        <CircularProgress color="inherit" style={{ marginRight: 4 }}/>
      </Backdrop>)}
    <div className={classes.buttonList}>
      <div className={classes.inputFields}>
        <ImageSelector onSelect={() => {
          setCurrentType('upload');
          setHasResult(false);
        }}/>
        <Tooltip title="Open Camera">
          <IconButton
            style={{ marginRight: 15 }}
            onClick={() => {
              setIsOpenCam(true);
              setCurrentType('camera');
              setHasResult(false);
              dispatch(updateImage(undefined));
            }}>
            <CameraAltRounded/>
          </IconButton>
        </Tooltip>
        {(state.currentImage && !hasResult) && (
          <Tooltip title={'Flip image'}>
            <IconButton
              onClick={() => {
                if (currentType === 'camera') {
                  flipCapturedImage();
                } else if (currentType === 'upload') {
                  flipUploadedImage();
                }
              }}
            >
              <FlipOutlined/>
            </IconButton>
          </Tooltip>
        )}
      </div>
      <Button
        style={{ marginRight: 15 }}
        variant="contained"
        onClick={hasResult ? handleSubmitSchedules : handleProcessImage}
        color={'primary'}
        endIcon={(hasResult ? <BiCloudUpload/> : <GiProcessor/>)}
      >
        {!hasResult ? 'Process' : 'Submit'}
      </Button>
    </div>
    {isOpenCam && (<CameraFeed
      isOpenCam={isOpenCam}
      setOpenCam={(value: boolean) => setIsOpenCam(value)}
      cardImage={cardImage}
      setCardImage={(data: Blob) => setCardImageData(data)}
    />)}
    <hr/>
    {(state.currentImage && !hasResult) && (
      <>
        <h4>Preview</h4>
        <div className={classes.previewBlock}>
          <Preview id="image-base64" src={state.currentImage}/>
        </div>
      </>
    )}
    {hasResult && (<HandleSchedules/>)}
    <Dialog open={draftNotfication} onClose={() => setDraftNotification(false)}>
      <DialogContent>
        <div style={{display: 'flex'}}>
          <div style={{flexGrow: 1, display: 'flex'}}>
            <Avatar style={{backgroundColor: '#0c9cd4'}}/>
            <Typography style={{paddingTop: 10, paddingLeft: 10, fontStyle: 'bold'}}>
              AIviCare - Đã đến giờ uống thuốc </ Typography>
          </div>
          <span style={{paddingLeft: 20, paddingTop: 10}}>7:30</span>
        </div>
        <ol>
          <li style={{whiteSpace: 'break-spaces', paddingBottom: 10}}>{`NEBIVOLOL 5mg (NEBICARD)\n Ngày uống 1 lần, lần uống 1/2 viên, sau ăn sáng`} </li>
          <li style={{whiteSpace: 'break-spaces', paddingBottom: 10}}>{`INDAPADMID 1.5mg (NATRILIX SR)\nNgày uống 1 lần, lần uống 1 viên, sau ăn sáng`}</li>
          <li style={{whiteSpace: 'break-spaces', paddingBottom: 10}}>{`NITROGLYCERIN 2.6mg (NITROMINT)\nNgày uống 2 lần, lần uống 1 viên, sau ăn sáng, chiều`}</li>
        </ol>
      </DialogContent>
    </Dialog>
  </div>;
};

export default Schedule;