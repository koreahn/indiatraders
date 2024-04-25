import Image from 'next/image';
import { HeroProps } from '~/shared/types';
import CTA from '../common/CTA';

const Hero = ({ title, subtitle, tagline, callToAction, callToAction2, image }: HeroProps) => {
  return (
    <section id="heroOne">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="mx-auto max-w-4xl pb-10 text-center md:pb-16">
            {tagline && (
              <p className="text-base font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-200">
                {tagline}
              </p>
            )}
            {title && (
              <h1 className="leading-tighter font-heading mb-6 text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
                {title}
              </h1>
            )}
            <div className="mx-auto max-w-3xl">
              <p className="mt-2 mb-1 text-lg text-gray-600 dark:text-slate-400">
                인도로부터 저렴한 가격으로 원자재 및 식재료 수입
              </p>
              <p className="mt-1 mb-1 text-lg text-gray-600 dark:text-slate-400">
                인도로 경쟁력있는 원자재 또는 완성품 수출
              </p>
              <p className="mt-1 mb-5 text-lg text-gray-600 dark:text-slate-400">
                인디아트레이더스와 함께 인도를 만나보세요
              </p>
              {subtitle && (
                <p className="mt-3 mb-3 text-xl font-normal text-gray-600 dark:text-slate-400">{subtitle}</p>
              )}
              <div className="flex max-w-none flex-col flex-nowrap gap-4 px-4 sm:flex-row sm:justify-center">
                {callToAction && <CTA callToAction={callToAction} linkClass="btn btn-primary" />}
                {callToAction2 && <CTA callToAction={callToAction2} linkClass="btn" />}
              </div>
            </div>
          </div>
          {image && (
            <div className="relative m-auto max-w-5xl">
              <Image
                className="mx-auto h-auto w-full rounded-md bg-gray-400 dark:bg-slate-700"
                src={image.src}
                alt={image.alt}
                width={1024}
                height={607}
                sizes="(max-width: 64rem) 100vw, 1024px"
                loading="eager"
                placeholder="blur"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
