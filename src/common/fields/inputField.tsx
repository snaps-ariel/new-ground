import { breakLines } from '@/utils/string';
import {
  Control,
  FieldErrors,
  UseFormRegisterReturn,
  useWatch,
} from 'react-hook-form';
import Image from 'next/image';
import Check from '../../../public/check.svg';

type Props = {
  name: 'loginId' | 'password';
  label?: string;
  type?: string;
  placeholder: string;
  disabled?: boolean;
  readOnly?: boolean;
  register: UseFormRegisterReturn;
  errors: FieldErrors<any>;
  control: Control<any>;
};

const InputField = ({
  name,
  label,
  type = 'text',
  placeholder,
  disabled = false,
  readOnly = false,
  register,
  errors,
  control,
}: Props) => {
  const value = useWatch({
    control,
    name,
  });

  const isEmptyValue = value === undefined;
  const isError = errors && Object.keys(errors).length > 0 && name;
  const isMaxRequiredLength = isError && errors[name]?.type === 'maxLength';

  return (
    <div className="relative block text-left">
      <label htmlFor={name}>{label}</label>
      <input
        className="w-full h-[50px] border-gray-300 border-b"
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        {...register}
      />

      {isError && (
        <span
          className="text-[#f02222] text-[12px] leading-[34px]"
          dangerouslySetInnerHTML={{
            __html: breakLines(errors[name]?.message as string),
          }}
        />
      )}

      {!isEmptyValue && !isError && (
        <div className="h-full flex items-center absolute top-0 right-0">
          <Image src={Check} alt={'check'} />
        </div>
      )}

      {/*{isMaxRequiredLength && (*/}
      {/*  <div className="count">*/}
      {/*    {input.value.length}/{maxLength}*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default InputField;
