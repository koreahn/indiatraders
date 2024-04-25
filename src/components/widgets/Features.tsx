import { FeaturesProps } from '~/shared/types';
import Headline from '../common/Headline';
import WidgetWrapper from '../common/WidgetWrapper';
import ItemGrid from '../common/ItemGrid';

const Features = ({ id, header, items, columns = 2, hasBackground = false }: FeaturesProps) => (
  <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="scroll-mt-16 max-w-6xl">
    {header && <Headline header={header} titleClass="text-4xl md:text-5xl" />}
    <div className="text-center">
      <p className="mt-2 mb-1 text-lg font-bold text-primary-500 dark:text-primary-200">
        <span className="text-primary-600 dark:text-primary-200 text-2xl">수입</span>하고 싶은 품목을 알려주세요.{' '}
        <span className="text-primary-600 dark:text-primary-200 text-2xl">견적</span>을 쉽게 알려드립니다.
      </p>
      <p className="mt-1 mb-12 text-lg font-bold text-primary-500 dark:text-primary-200">
        <span className="text-primary-600 dark:text-primary-200 text-2xl">수출</span>하고 싶은 품목을 견적과 함께
        알려주세요. <span className="text-primary-600 dark:text-primary-200 text-2xl">바이어</span>를 찾아드립니다.
      </p>
    </div>
    <ItemGrid
      id={id}
      items={items}
      columns={2}
      defaultColumns={2}
      containerClass={`pb-6 ${columns === 2 ? 'max-w-5xl' : ''}`}
      panelClass={`flex max-w-full ${columns === 2 ? 'sm:max-w-md mx-auto' : ''}`}
      iconClass="h-12 w-12 flex items-center justify-center rounded-md text-white bg-primary-900 p-2 md:p-3 mt-1.5 mb-4 mr-4 rtl:ml-4 rtl:mr-0"
      titleClass="mb-3 text-xl font-bold"
      descriptionClass="text-gray-600 dark:text-slate-400"
      actionClass="justify-start"
    />
  </WidgetWrapper>
);

export default Features;
