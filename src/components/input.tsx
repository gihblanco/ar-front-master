import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name:string;
  label?: string;
}

export default function Input({ name, label, ...rest }: InputProps) {


  const inputRef = useRef(null);

  const { fieldName, defaultValue = "", registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });
  }, [fieldName, registerField]);
  return (
    <>
      {}

      <input
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        placeholder={label}
        {...rest}
      />

      {error && <span style={{ color: "#f00" }}>{error}</span>}
    </>
  );
}
