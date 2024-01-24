import Image from 'next/image';
import { ChangeEvent, Dispatch } from 'react';

interface IPreview {
  // 추가
  banners: {
    previewWebBanner: string;
  };
}

type Props = {
  preview: IPreview | null | undefined;
  setPreview: Dispatch<React.SetStateAction<IPreview | null | undefined>>;
};

export default function BannerSetting({ preview, setPreview }: Props) {
  // 배너 데이터 받기
  const eventData = { style: { backgroundImage: '' } };

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

  return (
    <section className="mb-[20px]">
      <button className="flex mr-[20px] items-center justify-center shadow-[0px_1px_3px_#c1b1b1] col-[#1A1A1A] p-[10px_20px] mb-[15px] cursor-pointer">
        <input
          className="hidden cursor-pointer"
          id="uploadImg"
          type="file"
          accept=".jpg, .gif"
          onChange={(e) => onFileChange(e, 'webBanner')}
        />
        <label htmlFor="uploadImg" className="cursor-pointer">
          웹 이미지 선택
        </label>
      </button>
      {preview && (
        <div>
          <Image
            src={preview.banners.previewWebBanner}
            alt={'webBanner'}
            width={100}
            height={100}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      )}
      {
        <Image
          src={eventData.style.backgroundImage}
          alt={'backgroundImage'}
          width={100}
          height={100}
        />
      }
    </section>
  );
}
