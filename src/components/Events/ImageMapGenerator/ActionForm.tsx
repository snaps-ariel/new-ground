import { FieldValues } from 'react-hook-form';

type Props = {
  watchType: string;
  field: FieldValues;
};

export default function ActionForm({ watchType, field }: Props) {
  const { value, onChange } = field;
  const getDescKey = Object.keys(value).join();

  switch (watchType) {
    case 'goLink':
      return (
        <div>
          <label className="m-1.5">주소</label>
          <input
            className="border-solid border-[1px]"
            type="text"
            placeholder="이동 URL"
            onChange={(e) => onChange({ goLink_url: e.target.value })}
            defaultValue={value.goLink_url || null}
          />
        </div>
      );
    case 'openLayerPopup':
      return (
        <div>
          <label className="m-1.5">팝업 이름</label>
          <input
            className="border-solid border-[1px]"
            type="text"
            placeholder="팝업 이름"
            onChange={(e) =>
              onChange({
                ...(value.isNeedLogin && value),
                openLayerPopup: e.target.value,
              })
            }
            defaultValue={value.openLayerPopup || null}
          />
          <label className="m-1.5">로그인 필요 여부</label>
          <input
            className="border-solid border-[1px]"
            type="text"
            placeholder="boolean"
            onChange={(e) =>
              onChange({
                ...(value.openLayerPopup && value),
                isNeedLogin: e.target.value,
              })
            }
            defaultValue={value.isNeedLogin || null}
          />
        </div>
      );
    case 'goOutLink':
      return (
        <div>
          <label className="m-1.5">주소</label>
          <input
            className="border-solid border-[1px]"
            type="text"
            placeholder="이동 URL"
            onChange={(e) => onChange({ goOutLink_url: e.target.value })}
            defaultValue={value.goOutLink_url || null}
          />
        </div>
      );
    case 'getCoupon':
      return (
        <div>
          <label className="m-1.5">이벤트 코드</label>
          <input
            className="border-solid border-[1px]"
            type="text"
            placeholder="이벤트 코드"
            onChange={(e) =>
              onChange({
                ...(value.getCoupon_issueCode && value),
                getCoupon_code: e.target.value,
              })
            }
            defaultValue={value.getCoupon_code || null}
          />
          <label className="m-1.5">이벤트 코드</label>
          <input
            className="border-solid border-[1px]"
            type="text"
            placeholder="이슈 코드"
            onChange={(e) =>
              onChange({
                ...(value.getCoupon_code && value),
                getCoupon_issueCode: e.target.value,
              })
            }
            defaultValue={value.getCoupon_issueCode || null}
          />
        </div>
      );
    case 'copyText':
      return (
        <div>
          <label className="m-1.5">텍스트</label>
          <input
            className="border-solid border-[1px]"
            type="text"
            placeholder="텍스트"
            onChange={(e) => onChange({ copyText_text: e.target.value })}
            defaultValue={value.copyText_text || null}
          />
        </div>
      );
    case 'goKakaoChannel':
      return (
        <div>
          <label className="m-1.5">채널 주소</label>
          <input
            className="border-solid border-[1px]"
            type="text"
            placeholder="채널 주소"
            onChange={(e) => onChange({ goKakaoChannel: e.target.value })}
            defaultValue={value.goKakaoChannel || null}
          />
        </div>
      );
    case 'shareKakao':
      return (
        <div>
          <label className="m-1.5">템플릿 ID</label>
          <input
            className="border-solid border-[1px]"
            type="text"
            placeholder="템플릿 ID"
            onChange={(e) =>
              onChange({
                ...(value.shareKakao_eventCode && value),
                shareKakao: e.target.value,
              })
            }
            defaultValue={value.shareKakao || null}
          />
          <label className="m-1.5">이벤트 코드</label>
          <input
            className="border-solid border-[1px]"
            type="text"
            placeholder="이벤트 코드"
            onChange={(e) =>
              onChange({
                ...(value.shareKakao && value),
                shareKakao_eventCode: e.target.value,
              })
            }
            defaultValue={value.shareKakao_eventCode || null}
          />
        </div>
      );
    case 'setGif':
      return (
        <div>
          <label className="m-1.5">gif 파일 이름</label>
          <input
            className="border-solid border-[1px]"
            type="text"
            placeholder="(OPM/SNAPS)-xxx"
            onChange={(e) => onChange({ setGif: e.target.value })}
            defaultValue={value.setGif || null}
          />
        </div>
      );
    case 'setCustomFunction':
      return (
        <div>
          <label className="m-1.5">함수명</label>
          <input
            className="border-solid border-[1px]"
            type="text"
            placeholder="함수명"
            onChange={(e) => onChange({ setCustomFunction: e.target.value })}
            defaultValue={value.setCustomFunction || null}
          />
          <input
            className="border-solid border-[1px]"
            type="text"
            placeholder="전달할 parameter"
            onChange={(e) =>
              onChange({ setCustomFunction_functionName: e.target.value })
            }
            defaultValue={value.setCustomFunction_functionName || null}
          />
        </div>
      );
    case 'embedYoutube':
      return (
        <div>
          <label className="m-1.5">주소</label>
          <input
            className="border-solid border-[1px]"
            type="text"
            placeholder="재생 URL"
            onChange={(e) => onChange({ youtubeUrl: e.target.value })}
            defaultValue={value.youtubeUrl || null}
          />
        </div>
      );
    default:
      break;
  }
}
