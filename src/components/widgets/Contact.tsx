import Form from '../common/Form';
import Headline from '../common/Headline';
import { ContactProps } from '~/shared/types';
import WidgetWrapper from '../common/WidgetWrapper';
// import { sql } from '@vercel/postgres';
// import { revalidatePath } from 'next/cache';

// const handleSubmit = async (formData: FormData) => {
//   'use server';

//   try {
//     const res = await sql`
//         INSERT INTO POSTS (TITLE, CONTENT, USER_NAME, PHONE_NUMBER, EMAIL, PASSWORD)
//         VALUES (
//           ${String(formData.get('title'))}
//           , ${String(formData.get('content'))}
//           , ${String(formData.get('name'))}
//           , ${String(formData.get('phone'))}
//           , ${String(formData.get('email'))}
//           , ${String(formData.get('password'))}
//         )`;

//     console.log('res', res);

//     revalidatePath('/Page');
//   } catch (e) {
//     console.log(e);
//   }
// };

const Contact = ({ header, content, items, form, id, hasBackground = false }: ContactProps) => (
  <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="max-w-6xl">
    {header && <Headline header={header} titleClass="text-3xl sm:text-5xl" />}
    <div className="flex items-stretch justify-center">
      <div className={`grid ${!content && !items ? 'md:grid-cols-1' : 'md:grid-cols-2'}`}>
        <div className="h-full pr-6">
          {content &&
            (content.indexOf('|') ? (
              <>
                <p className="mt-3 mb-5 text-lg text-gray-600 dark:text-slate-400">{content.split('|')[0]}</p>{' '}
                <p className="mt-3 mb-20 text-sm text-gray-600 dark:text-slate-400">{content.split('|')[1]}</p>
              </>
            ) : (
              <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">{content}</p>
            ))}
          <ul className="mb-6 md:mb-0">
            {items &&
              items.map(({ title, description, icon: Icon }, index) => (
                <li key={`item-contact-${index}`} className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">{title}</h3>
                    {typeof description === 'string' ? (
                      <p key={`text-description-${index}`} className="text-gray-600 dark:text-slate-400">
                        {description}
                      </p>
                    ) : (
                      description &&
                      description.map((desc, index) => (
                        <p key={`text-description-${index}`} className="text-gray-600 dark:text-slate-400">
                          {desc}
                        </p>
                      ))
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <Form {...form} containerClass="card h-fit max-w-2xl mx-auto p-5 md:p-12" btnPosition="right" />
        {/* <form
          id="contactForm"
          className={twMerge('', 'card h-fit max-w-2xl mx-auto p-5 md:p-12')}
          action={handleSubmit}
        >
          {form.title && <h2 className={`${form.description ? 'mb-2' : 'mb-4'} text-2xl font-bold`}>{form.title}</h2>}
          {form.description && <p className="mb-4">{form.description}</p>}
          <div className="mb-6">
            <div className="mx-0 mb-1 sm:mb-4">
              <div className="mx-0 mb-1 sm:mb-4">
                <label htmlFor="name" className="pb-1 text-xs uppercase tracking-wider"></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  placeholder="이름을 입력하세요."
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                />
              </div>
              <div className="mx-0 mb-1 sm:mb-4">
                <label htmlFor="email" className="pb-1 text-xs uppercase tracking-wider"></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  placeholder="e-mail 을 입력하세요."
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                />
              </div>
              <div className="mx-0 mb-1 sm:mb-4">
                <label htmlFor="phone" className="pb-1 text-xs uppercase tracking-wider"></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="off"
                  placeholder="전화번호를 입력하세요.(- 없이 숫자만)"
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                />
              </div>
              <div className="mx-0 mb-1 sm:mb-4">
                <label htmlFor="password" className="pb-1 text-xs uppercase tracking-wider"></label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  placeholder="비밀번호를 입력하세요."
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                />
              </div>
              <div className="mx-0 mb-1 sm:mb-4">
                <label htmlFor="title" className="pb-1 text-xs uppercase tracking-wider"></label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  autoComplete="off"
                  placeholder="제목을 입력하세요."
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                />
              </div>
              <div className={`mx-0 mb-1 sm:mb-4`}>
                <label htmlFor="content" className="pb-1 text-xs uppercase tracking-wider"></label>
                <textarea
                  id="content"
                  name="content"
                  cols={30}
                  rows={5}
                  placeholder="내용을 입력하세요."
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                />
              </div>
            </div>
          </div>
          <div className="text-right">
            <button type="submit" className="btn btn-primary sm:mb-0">
              저장
            </button>
          </div>
        </form> */}
      </div>
    </div>
  </WidgetWrapper>
);

export default Contact;
