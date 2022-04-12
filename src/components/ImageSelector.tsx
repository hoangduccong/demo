import React, { useEffect, useRef } from 'react';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { CloudUpload } from '@material-ui/icons';
import { updateImage } from '../redux/action';
import { ReducerState } from '../redux/reducer';


const ImageSelector = (props: any) => {
  const { onSelect } = props;
  const fileInputRef = useRef<any>(null);
  const dispatch = useDispatch();
  const image = useSelector((state: ReducerState) => state.currentImage);
  const onUpload = () => {
    const file: File = fileInputRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        onSelect();
        dispatch(updateImage(reader.result));
      };
    }
  }
  useEffect(() => {
    if (!image && fileInputRef) {
      fileInputRef.current.value = null;
    }
  }, [image])
  return (
    <div>
      <Grid item >
        <Tooltip title="Upload image" >
          <IconButton
            style={{marginRight: 15}}
            onClick={() => {
              fileInputRef?.current?.click();
            }}>
            <CloudUpload/>
          </IconButton>
        </Tooltip>
        
        <input
          ref={fileInputRef}
          onChange={onUpload}
          type="file"
          name="file"
          style={{ display: 'none' }}
          accept="image/*"
        />
      </Grid>
    </div>
  );
}

export default ImageSelector;