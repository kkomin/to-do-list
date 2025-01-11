import { DetailCheckForm } from "@/components/auth/DetailCheckForm";

export default function Detail() {
    return (
        <main className="flex items-center justify-center">
            <div className="flex flex-col items-center w-[1200px] h-[1020px] bg-white">
                <div className="w-[343px] h-[64px] mt-[16px] sm:w-[696px] sm:mt-[24px] lg:w-[996px] lg:mt-[24px] justify-center">
                    <DetailCheckForm/>
                </div>
                <div className="w-[343px] h-[311px] border-dashed rounded-[24px] border-[2px] mt-[17px] border-slate-300 bg-slate-50 
                    flex flex-col items-center justify-center sm:w-[696px] sm:mt-[24px] lg:w-[384px]">
                        <div className="absolute flex flex-col items-center justify-center w-full h-full">
                            <img alt="picture_icon" src="/ic/img.png" className="w-[64px] h-[64px]"/>
                        </div>
                        <button className="w-[64px] h-[64px] ml-auto mr-[16px] mt-auto mb-[16px] bg-no-repeat" 
                            style={{backgroundImage:"url('/btn/plus_circle.png')", backgroundSize:"contain"}}/>
                </div>
                <div className="relative w-[343px] h-[311px] mt-[15px] sm:w-[696px] lg:w-[588px] flex flex-col items-center">
                    <img src="/img/memo.png" className="w-full h-full rounded-[24px]"/>
                    <span className="absolute top-[24px] text-amber-800">Memo</span>
                    <textarea className="absolute bg-transparent text-center outline-none top-1/2 w-[calc(100%-32px)] resize-none overflow-auto" 
                        placeholder="메모 입력"/>
                    <div className="flex flex-row pt-[24px] justify-center lg:justify-end w-full">
                        <button className="w-[168px] h-[56px]" style={{backgroundImage:"url('/btn/m_complete.png')", backgroundSize:"contain"}}/>
                        <button className="w-[168px] h-[56px] ml-[7px]" style={{backgroundImage:"url('/btn/delete.png')", backgroundSize:"contain"}}/>
                    </div>
                </div>
        </div>
    </main>
    );
}