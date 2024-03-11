'use client';

import { ChangeEvent, EventHandler, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Crop, ReactCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ImageMap } from '@qiuz/react-image-map';

import { IMapArea } from '@/model/events';
import SettingBox from '@/components/Events/ImageMapGenerator/SettingBox';
import { useGetParams } from '@/hooks/useGetParams';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography, Select } from 'antd';
import { FieldData } from 'rc-field-form/es/interface';
import { boxSpanStyle, boxStyle } from '@/components/Events/definition';
import { OPM_EVENT_TYPE, SNAPS_EVENT_TYPE } from '@/configs/image-map';
import { v4 as uuidv4 } from 'uuid';
import ActionForms from '@/components/Events/ImageMapGenerator/ActionForms';

type Props = {
  getMapData: IMapArea[];
};

export default function ImageMapGenerator({ getMapData }: Props) {
  const searchParams = useSearchParams();
  const { country, service, device, idx } = useGetParams();
  const isSnaps = service === 'snaps';
  const imageUrl = isSnaps
    ? `${process.env.NEXT_PUBLIC_SNAPS_KR_S3}/${
        device === 'mobile' ? 'mobile' : 'desktop'
      }/${country}/map_event/${idx}/${device}/e_body/eventBody-${idx}.jpg`
    : `${process.env.NEXT_PUBLIC_OPM_KR_S3}/map_event/${idx}/${device}/e_body/eventBody-${idx}.jpg`;
  const eventType = service === 'snaps' ? SNAPS_EVENT_TYPE : OPM_EVENT_TYPE;

  // const [preview, setPreview] = useState<IPreview | null>();
  const [form] = Form.useForm<{ items: IMapArea[] }>();
  const [mapArea, setMapArea] = useState<IMapArea[] | []>([]);
  const [isAppend, setIsAppend] = useState<boolean>(false);
  const [crop, setCrop] = useState<Crop | {}>({
    unit: '%',
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (mapArea.length === 0) {
      setMapArea(() =>
        getMapData.map((map, idx) => {
          return {
            ...map,
            style: boxStyle,
            render: () => <span style={boxSpanStyle}>map {idx + 1}</span>,
          };
        }),
      );
    }
  }, [getMapData, mapArea.length]);

  const onCropChange = (crop: Crop, percentCrop: Crop) => {
    setCrop(percentCrop);
  };

  const onClickCropImage = (event: React.MouseEvent<HTMLDivElement>) => {
    const cropElement = document.querySelector('.ReactCrop__crop-selection');
    const isDoubleClicked = event.detail >= 2;
    const { items } = form.getFieldsValue();

    if (event.target === cropElement && isDoubleClicked) {
      const { height, width, x: left, y: top, unit } = crop as Crop;
      const getPercentCrop = {
        key: uuidv4(),
        width: `${width}${unit}`,
        height: `${height}${unit}`,
        left: `${left}${unit}`,
        top: `${top}${unit}`,
        type: eventType[0].value,
        desc: {},
        style: boxStyle,
        render: () => <span style={boxSpanStyle}>map {items.length}</span>,
      };

      // mapArea 상태 추가
      setMapArea((prev) => [...prev, getPercentCrop]);
      // Form 추가
      items.push(getPercentCrop);
      form.setFieldsValue({ items });

      setCrop({});
      return;
    }
  };

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    setMapArea((prev) => prev);
  };

  const handleChange = (value: string, name: number) => {
    const { items } = form.getFieldsValue();
    items.splice(name, 1, { ...items[name], desc: {} });
    form.setFieldsValue({ items });
  };

  return (
    <div className="w-lvw h-lvh">
      <h2 className="mb-[40px]">snaps kr</h2>
      {/*<BannerSetting preview={preview} setPreview={setPreview} />*/}
      <section className="flex gap-x-[20px]">
        <div className="relative" onClick={onClickCropImage}>
          <ReactCrop
            crop={crop as Crop}
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
            <div>이미지를 등록해 주세요.</div>
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

      {mapArea.length > 0 && (
        <>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            name="dynamic_form_complex"
            autoComplete="off"
            // initialValues={{ items: mapArea }}
            onFinish={onFinish}
          >
            <Form.List name="items" initialValue={mapArea}>
              {(fields, { add, remove }) => (
                <div
                  style={{
                    display: 'flex',
                    rowGap: 16,
                    flexDirection: 'column',
                    margin: '20px 0',
                  }}
                >
                  {fields.map(({ name, key }) => {
                    const getType = form.getFieldValue('items')[name]?.type;
                    return (
                      <div key={key} className="flex items-center">
                        <label className="mr-[20px]">{`map ${key + 1}`}</label>
                        <Form.Item
                          style={{ marginBottom: '0' }}
                          label="width"
                          name={[name, 'width']}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          style={{ marginBottom: '0' }}
                          label="height"
                          name={[name, 'height']}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          style={{ marginBottom: '0' }}
                          label="left"
                          name={[name, 'left']}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          style={{ marginBottom: '0' }}
                          label="top"
                          name={[name, 'top']}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          style={{ marginBottom: '0' }}
                          label="type"
                          name={[name, 'type']}
                        >
                          <Select
                            options={eventType}
                            onChange={(e) => handleChange(e, name)}
                          />
                        </Form.Item>
                        <ActionForms name={name} type={getType} />
                      </div>
                    );
                  })}
                </div>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              {() => (
                <Typography>
                  <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                </Typography>
              )}
            </Form.Item>
          </Form>
        </>
      )}

      {/*<SettingBox*/}
      {/*  isAppend={isAppend}*/}
      {/*  setIsAppend={setIsAppend}*/}
      {/*  crop={crop}*/}
      {/*  setCrop={setCrop}*/}
      {/*  mapArea={mapArea}*/}
      {/*  setMapArea={setMapArea}*/}
      {/*/>*/}
    </div>
  );
}
