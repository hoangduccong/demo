import React from 'react';
import { useSelector } from 'react-redux';
import { CustomReducerState } from '../redux/reducer';
import CustomTextField from './CustomTextField';

const ResultTab = (props: any) => {
  const data = useSelector((state: CustomReducerState) => state.data);
  
  return (
    <div style={{ display: 'grid', width: '70%', margin: 'auto', paddingTop: 50 }}>
      <CustomTextField
        style={{ marginBottom: 15 }}
        label={'Name'} value={data?.name}
        disabled
      />
      <CustomTextField style={{ marginBottom: 15 }} label={'Price'} value={data?.price} disabled/>
      <CustomTextField style={{ marginBottom: 15 }} label={'Specified'} value={data?.specified} disabled/>
      <CustomTextField style={{ marginBottom: 15 }} label={'Ingredient'} value={data?.ingredient} disabled/>
      <CustomTextField style={{ marginBottom: 15 }} label={'Contraindication'} value={data?.contraindication} disabled/>
      <CustomTextField style={{ marginBottom: 15 }} label={'Pharmacies'} value={data?.Pharmacies} disabled/>
    </div>
  );
};

export default ResultTab;