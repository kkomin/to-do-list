export function SearchForm() {
    return (
        <div className="flex absolute top-[76px] sm:top-[84px] lg:top-[84px]">
            <input alt="searchbar" className="rounded-full bg-slate-100 border-2 border-solid border-b-slate-900 border-b-[6px] border-slate-900 
                focus:ring-0 pl-[24px] w-[280px] h-[56px] border-input ml-[16px] file:text-sm focus-visible:outline-none 
                placeholder:text-slate-500 sm:w-[518px] sm:ml-[24px] lg:w-[1016px] lg:ml-[360px]" placeholder="할 일을 입력하세요"/>
            <button className="absolute w-[56px] h-[56px] left-[304px] sm:w-[162px] sm:left-[558px] lg:w-[168px] lg:left-[1392px] bg-no-repeat center"
            style={{
                backgroundImage:"url('/btn/plus.png')",
                backgroundSize:'contain'
            }}/>
        </div>
    );
}``