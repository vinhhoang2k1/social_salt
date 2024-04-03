import {
  Input as MaterialInput,
  InputProps as MaterialInputProps,
} from "@material-tailwind/react";
import { HTMLAttributes, ReactNode, forwardRef } from "react";
import ErrorMessage from "./ErrorMessage";
import HintMessage from "./HintMessage";
export type InputProps = MaterialInputProps & {
  label: string;
  type: MaterialInputProps["type"];
  required: boolean;
  errorMsg: string | undefined;
  errorMsgProps?: HTMLAttributes<HTMLParagraphElement>;
  hideError: boolean | undefined;
  hint?: string | ReactNode;
  hintProps?: HTMLAttributes<HTMLParagraphElement>;
  disabled: boolean;
  classNameWrap?:string
};

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = "text",
    color = "teal",
    variant = "outlined",
    size = "lg",
    className = "",
    errorMsg,
    errorMsgProps,
    hideError,
    error,
    hint,
    hintProps,
    label,
    disabled,
    required,
    autoComplete = "off",
    classNameWrap,
    //replace first character with empty string,
    //and any non word character with dash. Ex: '$ item price' => 'item-price'
    id = label
      .toLowerCase()
      .replace(/^[^\w]+/, "")
      .replaceAll(/[^\w]/g, "-"),
    name = label
      .toLowerCase()
      .replace(/^[^\w]+/, "")
      .replaceAll(/[^\w]/g, "-"),
    ...props
  },
  ref,
) {
  if (error === undefined) {
    if (hideError === true) error = false;
    else if (errorMsg) error = true;
    else error = false;
  }

  return (
    <div className={classNameWrap}>
      <MaterialInput
        {...props}
        id={id}
        name={name}
        label={label}
        aria-label={label}
        inputRef={ref}
        ref={null}
        type={type}
        variant={variant}
        color={color}
        size={size}
        error={error}
        autoComplete={autoComplete}
        className={`${className} file:mr-2 file:cursor-pointer file:rounded-md file:border-none
        file:bg-white file:text-center file:text-sm
        file:font-semibold file:uppercase  file:text-blue-gray-700
        file:transition file:duration-200 file:ease-in-out placeholder:italic
        focus:ring-0
        file:active:scale-95 file:disabled:opacity-60`}
        disabled={disabled}
        required={disabled === true ? false : required} //remove the red star of required input when disabled.
        crossOrigin={undefined}
      />
      <ErrorMessage message={errorMsg} {...errorMsgProps} />
      {typeof hint === "string" ? (
        <HintMessage message={hint} {...hintProps} />
      ) : (
        <HintMessage>{hint}</HintMessage>
      )}
    </div>
  );
});
