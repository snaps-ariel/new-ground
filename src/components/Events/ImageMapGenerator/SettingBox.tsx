'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginUser } from '@/model/user';
import { useCallback } from 'react';
import { IMapArea } from '@/components/Events/ImageMapGenerator/index';
import { useParams } from 'next/navigation';
import { OPM_EVENT_TYPE, SNAPS_EVENT_TYPE } from '@/configs/image-map';

type Props = {
  mapArea: IMapArea;
  index: number;
  setMapArea: any;
};
export default function SettingBox({ mapArea, index, setMapArea }: Props) {
  const { country, service } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    control,
  } = useForm<ILoginUser>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<any> = useCallback(() => {}, []);
  const { width, height, left, top, type } = mapArea;

  const eventType = service === 'snaps' ? SNAPS_EVENT_TYPE : OPM_EVENT_TYPE;

  const onChangeType = (e) => {
    const value = e.target.value;

    setMapArea((prev) =>
      prev.map((item, idx) => {
        if (index === idx) {
          return { ...item, type: value };
        } else {
          return item;
        }
      }),
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {/*delete icon*/}
        <span></span>
        <label></label>
        <div>
          <div>
            <label>width: </label>
            {/*<input value={parseFloat(width)} type="number" />*/}
          </div>
          <div>
            <label>height: </label>
            {/*<input value={parseFloat(height)} type="number" />*/}
          </div>
          <div>
            <label>left: </label>
            {/*<input value={parseFloat(left)} type="number" />*/}
          </div>
          <div>
            <label>top: </label>
            {/*<input value={parseFloat(top)} type="number" />*/}
          </div>
        </div>
        <div>
          <select onChange={onChangeType} value={type}>
            {eventType.map((event) => (
              <option key={event.label} value={event.value}>
                {event.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
