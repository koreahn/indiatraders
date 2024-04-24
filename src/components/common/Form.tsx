'use client';

import { FormEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FormProps } from '../../shared/types';
import emailjs from '@emailjs/browser';

const Form = ({
  title,
  description,
  inputs,
  radioBtns,
  textarea,
  checkboxes,
  btn,
  btnPosition,
  containerClass,
}: FormProps) => {
  const [inputValues, setInputValues] = useState([]);
  const [radioBtnValue, setRadioBtnValue] = useState('');
  const [textareaValues, setTextareaValues] = useState('');
  const [checkedState, setCheckedState] = useState<boolean[]>(new Array(checkboxes && checkboxes.length).fill(false));

  // Update the value of the entry fields
  const changeInputValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  // Update checked radio buttons
  const changeRadioBtnsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioBtnValue(event.target.value);
  };

  // Update the textarea value
  const changeTextareaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValues(event.target.value);
  };

  // Update checkbox radio buttons
  const changeCheckboxHandler = (index: number) => {
    setCheckedState((prevValues) => {
      const newValues = [...(prevValues as boolean[])];
      newValues.map(() => {
        newValues[index] = !checkedState[index];
      });
      return newValues;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get('name') as string | null;
    const email = formData.get('email') as string | null;
    const phone = formData.get('phone') as string | null;
    const content = formData.get('content') as string | null;

    const res = checkValidation(name, email, phone, title, content);

    if (res !== '') {
      const notValidObj = document.getElementById(res) as HTMLInputElement;
      notValidObj.focus();
      return;
    }

    // const templateParams = {
    //   name: name,
    //   email: email,
    //   phone: phone,
    //   content: content,
    // };

    if (
      process.env.NEXT_PUBLIC_SERVICE_KEY &&
      process.env.NEXT_PUBLIC_TEMPLATE_ID &&
      process.env.NEXT_PUBLIC_PUBLIC_KEY
    ) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_SERVICE_KEY,
          process.env.NEXT_PUBLIC_TEMPLATE_ID,
          event.currentTarget as HTMLFormElement,
          process.env.NEXT_PUBLIC_PUBLIC_KEY,
        )
        .then(
          (result) => {
            alert('정상적으로 문의사항이 전달되었습니다.\n입력하신 이메일로 답변 드리겠습니다.\n감사합니다.');
          },
          (error) => {
            console.log(error.text);
            alert(error.text);
            alert("Failed to send email.\n\nPlease contact us using 'About Us' page.");
          },
        );
    }
  };

  const checkValidation = (name: string | null, email: string | null, phone: string | null, content: string | null) => {
    if (!name || '' === name || name.length < 2) {
      alert('이름은 2 글자 이상 입력해주세요.');
      return 'name';
    }

    if (
      !email ||
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      alert('이메일 형식에 맞지 않습니다.');
      return 'email';
    }

    if (!phone || '' === phone || !/^\d{3}\d{3,4}\d{4}$/.test(phone)) {
      alert('전화번호 형식에 맞지 않습니다.');
      return 'phone';
    }

    if (!title || '' === title || title.length < 5) {
      alert('제목은 5 글자 이상 입력해주세요.');
      return 'title';
    }

    if (!content || '' === content || content.length < 5) {
      alert('내용은 10 글자 이상 입력해주세요.');
      return 'content';
    }

    return '';
  };

  return (
    <form id="contactForm" className={twMerge('', containerClass)} onSubmit={handleSubmit}>
      {title && <h2 className={`${description ? 'mb-2' : 'mb-4'} text-2xl font-bold`}>{title}</h2>}
      {description && <p className="mb-4">{description}</p>}
      <div className="mb-6">
        {/* Inputs */}
        <div className="mx-0 mb-1 sm:mb-4">
          {inputs &&
            inputs.map(({ type, label, name, autocomplete, placeholder }, index) => (
              <div key={`item-input-${index}`} className="mx-0 mb-1 sm:mb-4">
                <label htmlFor={name} className="pb-1 text-xs uppercase tracking-wider">
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  autoComplete={autocomplete}
                  value={inputValues[index]}
                  onChange={changeInputValueHandler}
                  placeholder={placeholder}
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                />
              </div>
            ))}
        </div>
        {/* Radio buttons */}
        {radioBtns && (
          <div className="mx-0 mb-1 sm:mb-3">
            <span className="pb-1 text-xs uppercase tracking-wider">{radioBtns?.label}</span>
            <div className="flex flex-wrap">
              {radioBtns.radios.map(({ label }, index) => (
                <div key={`radio-btn-${index}`} className="mr-4 items-baseline">
                  <input
                    id={label}
                    type="radio"
                    name={label}
                    value={`value${index}`}
                    checked={radioBtnValue === `value${index}`}
                    onChange={changeRadioBtnsHandler}
                    className="cursor-pointer"
                  />
                  <label htmlFor={label} className="ml-2">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Textarea */}
        {textarea && (
          <div className={`mx-0 mb-1 sm:mb-4`}>
            <label htmlFor={textarea.name} className="pb-1 text-xs uppercase tracking-wider">
              {textarea.label}
            </label>
            <textarea
              id={textarea.name}
              name={textarea.name}
              cols={textarea.cols}
              rows={textarea.rows}
              value={textareaValues}
              onChange={(e) => changeTextareaHandler(e)}
              placeholder={textarea.placeholder}
              className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
            />
          </div>
        )}
        {/* Checkboxes */}
        {checkboxes && (
          <div className="mx-0 mb-1 sm:mb-4">
            {checkboxes.map(({ label }, index) => (
              <div key={`checkbox-${index}`} className="mx-0 my-1 flex items-baseline">
                <input
                  id={label}
                  type="checkbox"
                  name={label}
                  checked={checkedState[index]}
                  onChange={() => changeCheckboxHandler(index)}
                  className="cursor-pointer"
                />
                <label htmlFor={label} className="ml-2">
                  {label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      {btn && (
        <div
          className={`${btnPosition === 'left' ? 'text-left' : btnPosition === 'right' ? 'text-right' : 'text-center'}`}
        >
          <button type={btn.type || 'button'} className="btn btn-primary sm:mb-0">
            {btn.title}
          </button>
        </div>
      )}
    </form>
  );
};

export default Form;
