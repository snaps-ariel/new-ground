import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { OPM_EVENT_TYPE, SNAPS_EVENT_TYPE } from '@/configs/image-map';
import { IMapArea } from '@/model/events';
import ActionForm from '@/components/Events/ImageMapGenerator/ActionForm';
import Image from 'next/image';
import DeleteBtn from '../../../../public/deleteBtn.svg';
import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Crop } from 'react-image-crop';

type Props = {
  isAppend: boolean;
  setIsAppend: Dispatch<SetStateAction<boolean>>;
  crop: Crop | undefined;
  setCrop: Dispatch<SetStateAction<Crop | undefined>>;
  mapArea: IMapArea[];
  setMapArea: Dispatch<SetStateAction<IMapArea[] | []>>;
};

type FormValues = {
  mapArea: IMapArea[];
};

export default function SettingBox({
  isAppend,
  setIsAppend,
  crop,
  setCrop,
  mapArea,
  setMapArea,
}: Props) {
  const { country, service } = useParams();
  const [uploadedFileInfo, setUploadedFileInfo] = useState<File | null>(null);
  const searchParams = useSearchParams();

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

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'mapArea',
  });

  useEffect(() => {
    if (!isAppend) return;

    setIsAppend(false);
    console.log('crop', crop);
    append([
      {
        height: '2.3363436487860234',
        key: 'skstnskstn',
        left: '52.945662928759894',
        top: '92.07073453273127',
        type: 'goLink',
        width: '25.949765006596305',
        desc: {
          goLink_url: '10',
        },
      },
    ]);
    setCrop(undefined);
  }, [isAppend]);

  const uploadFile = async () => {
    if (!uploadedFileInfo) return;
    const getEventId = searchParams.get('idx');
    // region 분기 - kor / jpn
    const region = country === 'kor' ? 'ap-northeast-2' : 'ap-northeast-1';
    // Bucket 분기 - snaps / opm
    const Bucket =
      service === 'snaps'
        ? process.env.NEXT_PUBLIC_SNAPS_MAP_BUCKET
        : process.env.NEXT_PUBLIC_OPM_KR_MAP_BUCKET;
    // Key 분기 - snaps kr / snaps jp / opm kr / opm jp
    const Key = `${
      service === 'snaps' && `desktop/${country}/`
    }map_event/${getEventId}/pc/e_body/eventBody-${getEventId}.jpg`;

    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env
          .NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
      },
    });

    const params = {
      Bucket,
      Key,
      Body: uploadedFileInfo,
      ContentType: uploadedFileInfo.type,
      ACL: 'public-read' as ObjectCannedACL,
    };

    try {
      const command = new PutObjectCommand(params);
      const response = await s3Client.send(command);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    // 1. 등록하시겠습니까? 모달창
    // 2. 이미지 변경 등록시 -> s3 jpg로 요청하기
    if (!!uploadedFileInfo) {
      await uploadFile();
    }
    // 3. 기본 변경 등록시(필수) -> s3 json으로 요청하기
    console.log('values', values);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFileInfo(files[0] as File);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const eventType = service === 'snaps' ? SNAPS_EVENT_TYPE : OPM_EVENT_TYPE;
  return (
    <form className="py-5 text-sm" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, idx) => {
        const { width, height, left, top, type, id } = field;

        return (
          <div key={id} className="flex py-2.5 items-center">
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
                        className="border-solid border-[1px] border-[#d9d9d9] w-[120px] rounded-bl h-8 px-2"
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
                        className="border-solid border-[1px] border-[#d9d9d9] w-[120px] rounded-bl h-8 px-2"
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
                        className="border-solid border-[1px] border-[#d9d9d9] w-[120px] rounded-bl h-8 px-2"
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
                        className="border-solid border-[1px] border-[#d9d9d9] w-[120px] rounded-bl h-8 px-2"
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
                        className="border-solid border-[1px] border-[#d9d9d9] w-[120px] rounded-bl h-8 px-2"
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
      <section className="flex my-[15px] ">
        <button className="flex mr-[20px] items-center justify-center shadow-[0px_1px_3px_#c1b1b1] col-[#1A1A1A] p-[10px_20px] cursor-pointer">
          <input
            className="hidden cursor-pointer"
            id="uploadImg"
            type="file"
            accept=".jpg, .gif"
            onChange={onFileChange}
          />
          <label htmlFor="uploadImg" className="cursor-pointer">
            이미지 선택
          </label>
        </button>
        <button className="bg-gray-600 text-white shadow-[0px_1px_3px_#c1b1b1] p-[10px_20px] cursor-pointer">
          등록
        </button>
      </section>
    </form>
  );
}
