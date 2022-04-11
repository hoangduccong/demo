import React from 'react';
import {Camera} from "./camera";
import {Dialog, DialogContent} from "@material-ui/core";

const CameraFeed = (props) => {
  const {isOpenCam, setOpenCam, setCardImage} = props;
  return (
    <>
      <Dialog open={isOpenCam}
              maxWidth="lg"
              fullWidth
              onClose={() => setOpenCam(false)}>
        <DialogContent>
          <Camera
            onCapture={blob => setCardImage(blob)}
            onClear={() => setCardImage(undefined)}
            setCloseCam={() => setOpenCam(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CameraFeed;