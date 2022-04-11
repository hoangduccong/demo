import React, { useEffect, useState } from 'react';
import ImageSelector from './components/ImageSelector';
import ResultTab from './components/ResultTab';
import CameraFeed from './components/CameraFeed';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType, CustomReducerState } from './redux/reducer';
import { Backdrop, Button, CircularProgress, IconButton, TextField, Tooltip } from '@material-ui/core';
import { Preview } from './styles';
import { FlipOutlined } from '@material-ui/icons';

const App = () => {
  const dispatch = useDispatch();
  const [ hasResult, setHasResult ] = useState(false);
  const [ currentType, setCurrentType ] = useState('keyword');
  const [ isOpenCam, setIsOpenCam ] = useState(false);
  const [ cardImage, setCardImageData ] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const state = useSelector((state: CustomReducerState) => state);
  useEffect(() => {
    if (cardImage) {
      const reader = new FileReader();
      reader.readAsDataURL(cardImage);
      reader.onloadend = function () {
        dispatch({
          type: ActionType.UPDATE_IMAGE_SEARCH,
          image: reader.result
        })
        setHasResult(false);
      }
    } else {
      dispatch({
        type: ActionType.UPDATE_IMAGE_SEARCH,
        image: undefined
      })
    }
  }, [cardImage]);
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
      dispatch({
        type: ActionType.UPDATE_IMAGE_SEARCH,
        image: undefined
      })
      return res.json();
    }).then((result) => {
      dispatch({
        type: ActionType.UPDATE_DATA,
        data: result
      })
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
    canvas.toBlob(blob => setCardImageData(blob), "image/jpeg", 1);
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
    dispatch({
      type: ActionType.UPDATE_IMAGE_SEARCH,
      image: canvas.toDataURL('image/jpeg', 1.0)
    });
  };
  return <div style={{ display: 'inline', margin: '10px 25px' }}>
    {loading && (
      <Backdrop
        style={{zIndex: 99999}}
        open={loading}
      >
        <CircularProgress color="inherit" style={{ marginRight: 4 }} />
      </Backdrop>)}
    <div style={{ display: 'inline-flex',width: '100%', margin: 'auto' }}>
      <div style={{ display: 'inline-flex' }}>
        <TextField
          label={'Keyword'}
          onChange={(e) => {
          setHasResult(false);
            dispatch({
              type: ActionType.UPDATE_KEY_WORD,
              keyword: e.target.value
            })}
          }
          onFocus={() => setCurrentType('keyword')}
          value={state.currentKeyword || ''}
        />
        
        <ImageSelector onSelect={() => {
          setCurrentType('upload');
          setHasResult(false);
        }}/>
        
        <Button
          style={{marginRight: 15}}
          variant="outlined"
          onClick={() => {
            setIsOpenCam(true);
            setCurrentType('camera');
            setHasResult(false);
          }}>
          Open Camera
        </Button>
      </div>
      <Button
        style={{marginRight: 15}}
        variant="outlined"
        onClick={handleGetData}>
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
    {state.currentImage && (
      <>
        <h4>Preview</h4>
        <div style={{ margin: 'auto', width: '50%', display: 'grid' }}>
          <Preview id="image-base64" src={state.currentImage}/>
          <Tooltip title={"Flip image"} >
            <IconButton
              style={{width: 50, margin: 'auto', marginTop: 10}}
              onClick={() => {
                if (currentType === 'camera') {
                  flipCapturedImage();
                } else if (currentType === 'upload') {
                  flipUploadedImage();
                }
              }}
            >
              <FlipOutlined />
            </IconButton>
          </Tooltip>
        </div>
        <hr/>
      </>
    )}
    {hasResult && (<ResultTab/>)}
  </div>;
};

export default App;
