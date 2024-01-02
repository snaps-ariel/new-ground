import { NextPage } from 'next';

const NotFound: NextPage = () => {
  return (
    <div>
      <h3>페이지를 찾을 수 없습니다.</h3>
      <span>
        입력하신 URL 주소가 잘못 입력된 부분이 없는지 확인 후,
        <br />
        다시 시도 해 주세요.
      </span>
    </div>
  );
};

export default NotFound;
