import React from 'react';
import { useSelector } from 'react-redux';
import { CustomReducerState } from '../redux/reducer';
import CustomTextField from './CustomTextField';
import { useStyle } from './componentStyles';

const ResultTab = (props: any) => {
  const { data, currentImage } = useSelector((state: CustomReducerState) => state);
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.imageShow}>
        {currentImage && <img id="image-base64" src={currentImage} width="400px" height="auto"/>}
      </div>
      <div className={classes.infoText}>
        <CustomTextField style={{ marginBottom: 15 }} label={'Name'} value={data?.name} disabled/>
        <CustomTextField style={{ marginBottom: 15 }} label={'Price'} value={data?.price} disabled/>
        <CustomTextField style={{ marginBottom: 15 }} label={'Specified'} value={data?.specified} disabled/>
        <CustomTextField style={{ marginBottom: 15 }} label={'Ingredient'} value={data?.ingredient} disabled/>
        <CustomTextField style={{ marginBottom: 15 }} label={'Contraindication'} value={data?.contraindication} disabled/>
        <CustomTextField style={{ marginBottom: 15 }} label={'Pharmacies'} value={data?.Pharmacies} disabled/>
      </div>
    </div>
  );
};

export default ResultTab;