'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Crop, ReactCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ImageMap } from '@qiuz/react-image-map';

import { IMapArea } from '@/model/events';
import SettingBox from '@/components/Events/ImageMapGenerator/SettingBox';

type Props = {
  getMapData: IMapArea[];
};

export default function ImageMapGenerator({ getMapData }: Props) {
  const { country, service } = useParams();
  const searchParams = useSearchParams();

  // const [preview, setPreview] = useState<IPreview | null>();
  const [mapArea, setMapArea] = useState<IMapArea[] | []>(getMapData || []);
  const [crop, setCrop] = useState<Crop | undefined>({
    unit: '%',
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const isSnaps = service === 'snaps';
  const idx = searchParams.get('idx');
  const imageUrl = isSnaps
    ? `${process.env.NEXT_PUBLIC_SNAPS_KR_S3}/desktop/${country}/map_event/${idx}/pc/e_body/eventBody-${idx}.jpg`
    : `${process.env.NEXT_PUBLIC_OPM_KR_S3}/map_event/${idx}/pc/e_body/eventBody-${idx}.jpg`;

  useEffect(() => {
    setMapArea((prev) =>
      prev.map((map, idx) => {
        return {
          ...map,
          style: {
            backgroundColor: 'rgba(169, 169, 169, 0.5)',
            border: '1px solid rgba(255, 0, 0, 0.5)',
          },
          render: () => (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 0, 0.5)',
                height: '100%',
                fontSize: '20px',
              }}
            >
              map {idx + 1}
            </span>
          ),
        };
      }),
    );
  }, [getMapData]);

  const onCropChange = (crop: Crop, percentCrop: Crop) => {
    setCrop(percentCrop);
  };

  return (
    <div className="w-lvw h-lvh">
      <h2 className="mb-[40px]">snaps kr</h2>
      {/*<BannerSetting preview={preview} setPreview={setPreview} />*/}
      <section className="flex gap-x-[20px]">
        <div className="relative">
          <ReactCrop
            crop={crop}
            onChange={onCropChange}
            ruleOfThirds={true}
            style={{ display: 'block' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt={'image'} />
          </ReactCrop>
          {imageUrl ? (
            mapArea.map((map, index) => {
              const { key, top, left, width, height } = map;
              return (
                <span
                  className="absolute z-[10px] border-solid border-[1px] bg-black opacity-50"
                  key={key}
                  style={{
                    top,
                    left,
                    width,
                    height,
                    borderImageSource: `url('data:image/gif;base64,R0lGODlhCgAKAJECAAAAAP///////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEI5RDc5MTFDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEI5RDc5MTBDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQoAAgAsAAAAAAoACgAAAhWEERkn7W3ei7KlagMWF/dKgYeyGAUAIfkEBQoAAgAsAAAAAAoACgAAAg+UYwLJ7RnQm7QmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYgLJHdiinNSAVfOEKoUCACH5BAUKAAIALAAAAAAKAAoAAAIRVISAdusPo3RAzYtjaMIaUQAAIfkEBQoAAgAsAAAAAAoACgAAAg+MDiem7Q8bSLFaG5il6xQAIfkEBQoAAgAsAAAAAAoACgAAAg+UYRLJ7QnQm7SmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYBLJDdiinNSEVfOEKoECACH5BAUKAAIALAAAAAAKAAoAAAIRFISBdusPo3RBzYsjaMIaUQAAOw==')`,
                    borderImageSlice: 1,
                    borderImageRepeat: 'repeat',
                  }}
                />
              );
            })
          ) : (
            <div className="img-none">이미지를 등록해 주세요.</div>
          )}
        </div>
        <div className="relative">
          <ImageMap
            className="usage-map"
            src={imageUrl}
            map={mapArea as []}
            alt="React Image Map"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 0, 0.5)',
              height: '100%',
              fontSize: '20px',
            }}
          />
        </div>
      </section>

      <SettingBox mapArea={mapArea} setMapArea={setMapArea} />
    </div>
  );
}
