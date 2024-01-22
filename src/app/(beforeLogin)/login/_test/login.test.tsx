import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/components/Login/LoginForm';

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});
it('has input and a button', async () => {
  render(<LoginForm login={mockLogin} />);

  const loginIdInput = screen.getByPlaceholderText('이메일');
  const passwordInput = screen.getByPlaceholderText('비밀번호');
  const button = screen.getByText('로그인');

  expect(loginIdInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

it('should display required error when value is invalid', async () => {
  render(<LoginForm login={mockLogin} />);

  fireEvent.submit(screen.getByRole('button'));

  // 아이디, 비밀번호 값 없이 등록 시 유효성 검사 실패 -> 오류 발생 ('필수 항목입니다.')
  expect(await screen.findAllByRole('alert')).toHaveLength(2);
});

it('should display matching error when email is invalid', async () => {
  render(<LoginForm login={mockLogin} />);

  fireEvent.input(screen.getByRole('textbox', { name: /loginId/i }), {
    target: {
      value: 'test',
    },
  });

  fireEvent.input(screen.getByLabelText('password'), {
    target: {
      value: 'password',
    },
  });

  fireEvent.submit(screen.getByRole('button'));

  expect(screen.getByRole('textbox', { name: /loginId/i })).toHaveValue('test');
  expect(screen.getByLabelText('password')).toHaveValue('password');

  // 아이디 값이 유효성 검사 실패 -> 오류 발생 ('유효하지 않은 이메일 입니다.')
  expect(await screen.findAllByRole('alert')).toHaveLength(2);
});

it('should display required min length error when password is invalid', async () => {
  render(<LoginForm login={mockLogin} />);

  fireEvent.input(screen.getByRole('textbox', { name: /loginId/i }), {
    target: {
      value: 'test@mail.com',
    },
  });

  fireEvent.input(screen.getByLabelText('password'), {
    target: {
      value: '',
    },
  });

  fireEvent.submit(screen.getByRole('button'));

  expect(screen.getByRole('textbox', { name: /loginId/i })).toHaveValue(
    'test@mail.com',
  );
  expect(screen.getByLabelText('password')).toHaveValue('');

  // 비밀번호 값이 유효성 검사 실패 -> 오류 발생 ('필수 항목입니다.')
  expect(await screen.findAllByRole('alert')).toHaveLength(2);
});

it('should not display error when value is valid', async () => {
  render(<LoginForm login={mockLogin} />);

  fireEvent.input(screen.getByRole('textbox', { name: /loginId/i }), {
    target: {
      value: 'test@mail.com',
    },
  });

  fireEvent.input(screen.getByLabelText('password'), {
    target: {
      value: 'password',
    },
  });

  fireEvent.submit(screen.getByRole('button'));

  expect(screen.getByRole('textbox', { name: /loginId/i })).toHaveValue(
    'test@mail.com',
  );
  expect(screen.getByLabelText('password')).toHaveValue('password');

  // 아이디, 비밀번호 값 모두 유효성 검사 통과
  await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
});
