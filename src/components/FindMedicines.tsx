import React, { useEffect, useState } from 'react';
import ImageSelector from './ImageSelector';
import ResultTab from './ResultTab';
import CameraFeed from './CameraFeed';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, Button, CircularProgress, IconButton, TextField, Tooltip } from '@material-ui/core';
import { Preview } from '../styles';
import { CameraAltRounded, FlipOutlined, SearchRounded } from '@material-ui/icons';
import { useStyles } from '../useStyles';
import { updateData, updateImage, updateKeyword } from '../redux/action';
import { flipCaptureImageUtil, flipUploadImageUtil } from './utils/Util';
import { ReducerState } from '../redux/reducer';

const FindMedicines = () => {
  const dispatch = useDispatch();
  const [ hasResult, setHasResult ] = useState(false);
  const [ currentType, setCurrentType ] = useState('keyword');
  const [ isOpenCam, setIsOpenCam ] = useState(false);
  const [ cardImage, setCardImageData ] = useState<Blob | null>(null);
  const [ loading, setLoading ] = useState(false);
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
  const handleGetData = () => {
    setLoading(true);
    const body = {
      name: currentType === 'keyword' ? state.currentKeyword : null,
      image: currentType !== 'keyword' ? state.currentImage : null
    };
    const url = 'http://localhost:5000/check_info';
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
      dispatch(updateData(result));
      setHasResult(true);
    }).catch((e) => {
      console.log(e);
      setHasResult(false);
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
        <TextField
          label={'Keyword'}
          onChange={(e) => {
            setHasResult(false);
            dispatch(updateKeyword(e.target.value));
          }}
          onFocus={() => setCurrentType('keyword')}
          value={state.currentKeyword || ''}
        />
        
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
        onClick={handleGetData}
        color={'primary'}
        endIcon={<SearchRounded />}
      >
        Search
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
        <hr/>
      </>
    )}
    {hasResult && (<ResultTab/>)}
  </div>;
};

export default FindMedicines;
