import { Message, ValidationRule } from 'react-hook-form';

export const required: Message | ValidationRule<boolean> = {
  value: true,
  message: '필수 항목입니다.',
};

export const validEmail: ValidationRule<RegExp> = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  message: '유효하지 않은 이메일 입니다.',
};
