import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'next/navigation';
import { OPM_EVENT_TYPE, SNAPS_EVENT_TYPE } from '@/configs/image-map';
import { IMapArea } from '@/model/events';
import ActionForm from '@/components/Events/ImageMapGenerator/ActionForm';
import Image from 'next/image';
import DeleteBtn from '../../../../public/deleteBtn.svg';

type Props = {
  mapArea: IMapArea[];
  setMapArea: Dispatch<SetStateAction<IMapArea[] | []>>;
};

type FormValues = {
  mapArea: IMapArea[];
};

export default function SettingBox({ mapArea, setMapArea }: Props) {
  const { country, service } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      mapArea: mapArea,
    },
  });

  const { fields, remove } = useFieldArray({
    control,
    name: 'mapArea',
  });

  // const onSubmit: SubmitHandler<IMapArea> = useCallback(async (values) => {
  //   console.log('values', values);
  // }, []);
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log('values', values);
  };

  const eventType = service === 'snaps' ? SNAPS_EVENT_TYPE : OPM_EVENT_TYPE;

  return (
    <form className="py-5 text-sm" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, idx) => {
        const { width, height, left, top, type, id } = field;

        return (
          <div key={id} className="flex py-2.5">
            <Image
              className="mr-[8px] cursor-pointer"
              src={DeleteBtn}
              alt={'delete_btn'}
              onClick={() => remove(idx)}
            />
            <label className="mr-[20px]">{`map${idx + 1}`}</label>
            <div className="flex">
              <div>
                <label className="m-1.5">width: </label>
                <Controller
                  render={({ field }) => {
                    return (
                      <input
                        className="border-solid border-[1px] border-[#d9d9d9] w-[120px] rounded-bl"
                        type="number"
                        {...{ ...field, value: parseFloat(field.value) }}
                      />
                    );
                  }}
                  name={`mapArea.${idx}.width`}
                  control={control}
                />
              </div>
              <div>
                <label className="m-1.5">height: </label>
                <Controller
                  render={({ field }) => {
                    return (
                      <input
                        className="border-solid border-[1px] border-[#d9d9d9] w-[120px] rounded-bl"
                        type="number"
                        {...{ ...field, value: parseFloat(field.value) }}
                      />
                    );
                  }}
                  name={`mapArea.${idx}.height`}
                  control={control}
                />
              </div>
              <div>
                <label className="m-1.5">left: </label>
                <Controller
                  render={({ field }) => {
                    return (
                      <input
                        className="border-solid border-[1px] border-[#d9d9d9] w-[120px] rounded-bl"
                        type="number"
                        {...{ ...field, value: parseFloat(field.value) }}
                      />
                    );
                  }}
                  name={`mapArea.${idx}.left`}
                  control={control}
                />
              </div>
              <div>
                <label className="m-1.5">top: </label>
                <Controller
                  render={({ field }) => {
                    return (
                      <input
                        className="border-solid border-[1px] border-[#d9d9d9] w-[120px] rounded-bl"
                        type="number"
                        {...{ ...field, value: parseFloat(field.value) }}
                      />
                    );
                  }}
                  name={`mapArea.${idx}.top`}
                  control={control}
                />
              </div>
            </div>
            <div>
              <label className="m-1.5">option: </label>
              <Controller
                name={`mapArea.${idx}.type`}
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <select
                        className="border-solid border-[1px] border-[#d9d9d9] w-auto rounded-bl"
                        {...field}
                      >
                        {eventType.map((event, idx) => (
                          <option
                            key={`${idx}_${event.value}`}
                            value={event.value}
                          >
                            {event.label}
                          </option>
                        ))}
                      </select>
                    </>
                  );
                }}
              />
            </div>
            <div>
              <Controller
                name={`mapArea.${idx}.desc`}
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <ActionForm
                        watchType={watch(`mapArea.${idx}.type`)}
                        field={field}
                      />
                    </>
                  );
                }}
              />
            </div>
          </div>
        );
      })}
      <button>이미지 선택 </button>
      <button>등록</button>
    </form>
  );
}
