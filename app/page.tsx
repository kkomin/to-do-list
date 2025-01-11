import { CheckListForm } from "@/components/auth/CheckListForm";
import GnbForm from "@/components/auth/GnbForm";
import { SearchForm } from "@/components/auth/SearchForm";
import { ReactNode } from "react";

interface imgProps {
  src: string,
  className: string;
}

interface textProps {
  text: ReactNode,
  className: string;
}

const ImageSection = ({ src, className }: imgProps) => (
  <img src={src} className={className} />
);

const TextSection = ({ text, className }: textProps) => (
  <span className={className} style={{ fontFamily: 'Nanum Square', lineHeight: '18.16px' }}>
    {text}
  </span>
);

export default function Home() {
  return (
    <main>
      <SearchForm />

      {/* TO DO 리스트 */}
      <div className="flex lg:flex-row flex-col">
        <ImageSection
          src="/img/todo.png"
          className="w-[101px] h-[36px] top-[156px] left-[16px] absolute lg:top-[180px] lg:left-[360px] sm:top-[180px] sm:left-[24px]"
        />
        <ImageSection
          src="/img/doit_list.png"
          className="w-[120px] h-[120px] absolute top-[192px] left-[128px] sm:w-[240px] sm:h-[240px] sm:top-[280px] sm:left-[250px] lg:w-[240px] lg:h-[240px] lg:top-[280px] lg:left-[534px]"
        />
        <TextSection
          text= {
            <>
            할 일이 없어요.<br/>TODO를 새롭게 추가해주세요!
            </>
          }
          className="text-slate-400 text-base text-center absolute w-[201px] h-[36px] top-[328px] left-[87px] sm:left-[272px] sm:top-[480px] lg:top-[544px] lg:left-[553px]"
        />
      </div>

      {/* DO IT 리스트 - 데스크탑에서만 보임 */}
      <div className="lg:block hidden">
        <ImageSection
          src="/img/done.png"
          className="w-[97px] h-[36px] absolute lg:left-[972px] lg:top-[180px]"
        />
        <ImageSection
          src="/img/done_list.png"
          className="w-[240px] h-[240px] absolute left-[1146px] top-[280px]"
        />
        <TextSection
          text={
            <>
            아직 다 한 일이 없어요.<br/>해야 할 일을 체크해보세요!
            </>
          }
          className="text-slate-400 text-base text-center absolute w-[201px] h-[36px] top-[584px] left-[99px] sm:top-[888px] sm:left-[284px] lg:top-[544px] lg:left-[1178px]"
        />
      </div>

      {/* DO IT 리스트 - 모바일에서만 보임 */}
      <div className="lg:hidden">
        <ImageSection
          src="/img/done.png"
          className="w-[97px] h-[36px] absolute top-[412px] left-[16px] sm:top-[564px] sm:left-[24px]"
        />
        <ImageSection
          src="/img/done_list.png"
          className="w-[120px] h-[120px] absolute top-[448px] left-[128px] sm:w-[240px] sm:h-[240px] sm:top-[624px] sm:left-[252px]"
        />
        <TextSection
          text={
            <>
            아직 다 한 일이 없어요.<br/>해야 할 일을 체크해보세요!
            </>
          }
          className="text-slate-400 text-base text-center absolute w-[201px] h-[36px] top-[584px] left-[99px] sm:top-[888px] sm:left-[284px] lg:top-[544px] lg:left-[1178px]"
        />
      </div>
      {/* <CheckListForm/> */}
    </main>
  );
}
