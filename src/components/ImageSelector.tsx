import React, { useRef } from 'react';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { ActionType } from '../redux/reducer';
import { useDispatch } from 'react-redux';
import { CloudUpload } from '@material-ui/icons';


const ImageSelector = (props: any) => {
  const { onSelect } = props;
  const fileInputRef = useRef<any>(null);
  const dispatch = useDispatch();
  const onUpload = () => {
    const file: File = fileInputRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        onSelect();
        dispatch({
          type: ActionType.UPDATE_IMAGE_SEARCH,
          image: reader.result
        });
      };
    }
  }
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