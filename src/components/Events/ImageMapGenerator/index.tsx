'use client';

import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Crop, ReactCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { IBannerData } from '@/model/events';
import { ImageMap } from '@qiuz/react-image-map';
import SettingBox from '@/components/Events/ImageMapGenerator/SettingBox';

type Props = {
  eventCreateData: IBannerData;
  getMapData: IMapArea[];
};

export interface IMapArea {
  desc: object;
  height: string;
  key: string;
  left: string;
  top: string;
  type: string;
  width: string;
}

interface IPreview {
  banners: {
    previewWebBanner: string;
  };
}
export default function ImageMapGenerator({
  eventCreateData,
  getMapData,
}: Props) {
  const [preview, setPreview] = useState<IPreview | null>();
  const [crop, setCrop] = useState<Crop>({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [mapArea, setMapArea] = useState(getMapData || []);
  const { country, service } = useParams();

  const onCropChange = (crop: Crop, percentCrop: Crop) => {
    setCrop(percentCrop);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>, target: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // let previewObj = {};
        let previewObj = {
          banners: {
            previewWebBanner: reader.result as string,
          },
        };

        setPreview(() => ({ ...previewObj }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onMapClick = (area, index) => {
    const tip = `click map${index + 1}`;
    console.log(tip, area);
    alert(tip);
  };

  const img =
    'https://global-snaps-static-resource.s3.ap-northeast-2.amazonaws.com/desktop/kor/map_event/1904/pc/e_body/eventBody-1904.jpg';

  // console.log('eventCreateData', eventCreateData);
  console.log('mapArea', mapArea);
  return (
    <div className="w-lvw h-lvh">
      <h2 className="mb-[40px]">snaps kr</h2>
      {/*<section className="mb-[20px]">*/}
      {/*  <button className="flex mr-[20px] items-center justify-center shadow-[0px_1px_3px_#c1b1b1] col-[#1A1A1A] p-[10px_20px] mb-[15px] cursor-pointer">*/}
      {/*    <input*/}
      {/*      className="hidden cursor-pointer"*/}
      {/*      id="uploadImg"*/}
      {/*      type="file"*/}
      {/*      accept=".jpg, .gif"*/}
      {/*      onChange={(e) => onFileChange(e, 'webBanner')}*/}
      {/*    />*/}
      {/*    <label htmlFor="uploadImg" className="cursor-pointer">*/}
      {/*      웹 이미지 선택*/}
      {/*    </label>*/}
      {/*  </button>*/}
      {/*  {preview && (*/}
      {/*    <div>*/}
      {/*      <Image*/}
      {/*        src={preview.banners.previewWebBanner}*/}
      {/*        alt={'webBanner'}*/}
      {/*        width={100}*/}
      {/*        height={100}*/}
      {/*        style={{*/}
      {/*          width: '100%',*/}
      {/*          height: '100%',*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*  {*/}
      {/*    <Image*/}
      {/*      src={eventCreateData.style.backgroundImage}*/}
      {/*      alt={'backgroundImage'}*/}
      {/*      width={100}*/}
      {/*      height={100}*/}
      {/*    />*/}
      {/*  }*/}
      {/*</section>*/}
      <section>
        <div>
          <ReactCrop crop={crop} onChange={onCropChange}>
            <img src={img} />
          </ReactCrop>
          {img ? (
            getMapData.map((map, index) => {
              const { key, top, left, width, height } = map;
              return (
                <span
                  className="crop-item"
                  key={key}
                  style={{ top, left, width, height }}
                />
              );
            })
          ) : (
            <div className="img-none">이미지를 등록해 주세요.</div>
          )}
        </div>
        <div>
          <ImageMap
            className="usage-map"
            src={img}
            map={mapArea}
            alt="React Image Map"
          />
        </div>
      </section>

      {mapArea.map((map, idx) => (
        <SettingBox
          key={idx}
          mapArea={map}
          index={idx}
          setMapArea={setMapArea}
        />
      ))}
    </div>
  );
}
