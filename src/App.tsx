import React, { useEffect, useState } from 'react';
import ImageSelector from './components/ImageSelector';
import ResultTab from './components/ResultTab';
import CameraFeed from './components/CameraFeed';
import { useDispatch, useSelector } from 'react-redux';
import { CustomReducerState } from './redux/reducer';
import { Backdrop, Button, CircularProgress, IconButton, TextField, Tooltip } from '@material-ui/core';
import { Preview } from './styles';
import { CameraAltRounded, CloudUpload, FlipOutlined, SearchRounded } from '@material-ui/icons';
import { useStyles } from './useStyles';
import { ActionType, updateData, updateImage, updateKeyword } from './redux/action';

const App = () => {
  const dispatch = useDispatch();
  const [ hasResult, setHasResult ] = useState(false);
  const [ currentType, setCurrentType ] = useState('keyword');
  const [ isOpenCam, setIsOpenCam ] = useState(false);
  const [ cardImage, setCardImageData ] = useState<Blob | null>(null);
  const [ loading, setLoading ] = useState(false);
  const state = useSelector((state: CustomReducerState) => state);
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
    console.log('flip captured');
    // @ts-ignore
    const img: HTMLImageElement = document.getElementById('image-base64');
    const canvas = document.createElement('canvas');
    const container = state.container;
    console.log(container);
    canvas.width = container.width;
    canvas.height = container.height;
    const canvasContext = canvas.getContext('2d');
    if (canvasContext) {
      canvasContext.translate(container.width, container.width / container.height);
      canvasContext.scale(-1, 1);
      // @ts-ignore
      canvasContext.drawImage(img, 0, 0);
    }
    canvas.toBlob(blob => setCardImageData(blob), 'image/jpeg', 1);
  };
  const flipUploadedImage = () => {
    // @ts-ignore
    const img: HTMLImageElement = document.getElementById('image-base64');
    const canvas = document.createElement('canvas');
    if (!img || !canvas) {
      return;
    }
    // @ts-ignore
    const width = img.naturalWidth;
    // @ts-ignore
    const height = img.naturalHeight;
    canvas.width = width;
    canvas.height = height;
    const canvasContext = canvas.getContext('2d');
    if (canvasContext) {
      canvasContext.translate(width, Math.round(width / height));
      canvasContext.scale(-1, 1);
      // @ts-ignore
      canvasContext.drawImage(img, 0, 0);
    }
    dispatch(updateImage(canvas.toDataURL('image/jpeg', 1.0)));
    
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

export default App;
