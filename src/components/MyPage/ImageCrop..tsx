import React from 'react';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import { UploadFile } from 'antd/lib';
import { UploadChangeParam } from 'antd/es/upload';

interface Props {
  fileList: UploadFile[];
  onImageChange: (info: UploadChangeParam<UploadFile>) => void;
  children: React.ReactNode;
  cropShape: 'rect' | 'round';
  listType: 'text' | 'picture' | 'picture-card' | 'picture-circle';
}
export default function ImageCrop({
  fileList,
  onImageChange,
  children,
  cropShape,
  listType,
}: Props) {
  return (
    <ImgCrop showGrid rotationSlider aspectSlider showReset cropShape={cropShape}>
      <Upload listType={listType} fileList={fileList} onChange={onImageChange}>
        {children}
      </Upload>
    </ImgCrop>
  );
}
