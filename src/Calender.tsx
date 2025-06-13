import { SyntheticEvent, useEffect, useState } from "react";
import { calendarItemType } from "./ts/calendarItemType";
import { PrevNextMonthBtns } from "./PrevNextMonthBtns";
import { DaydateList } from "./DaydateList";
import { DaysList } from "./DaysList";
import { useGetMonthDays } from "./hooks/useGetMonthDays";

type todaySignal = {
    thisYear: number;
    thisMonth: number;
    today: number;
};

export const Calendar = () => {
    const { getMonthDays } = useGetMonthDays();

    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth() + 1;
    const [ctrlYear, setCtrlYear] = useState<number>(currYear);
    const [ctrlMonth, setCtrlMonth] = useState<number>(currMonth);
    const [days, setDays] = useState<calendarItemType[]>([]);
    const [, setCtrlToday] = useState<todaySignal | null>(null);

    useEffect(() => {
        const today: todaySignal = {
            thisYear: new Date().getFullYear(),
            thisMonth: new Date().getMonth() + 1,
            today: new Date().getDate()
        }
        setCtrlToday(today);

         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const jumpThisMonth: () => void = () => {
        const thisYear: number = new Date().getFullYear();
        const thisMonth: number = new Date().getMonth() + 1;
        setCtrlYear(thisYear);
        setCtrlMonth(thisMonth);
        getMonthDays(thisYear, thisMonth, setDays);
        window.scrollTo(0, 0);
    }

    /* カレンダーの部分ではスワイプ機能を停止 */
    const handleSwipeCancel: (calendarElm: SyntheticEvent<HTMLUListElement>) => void = (calendarElm: SyntheticEvent<HTMLUListElement>) => calendarElm.stopPropagation();

    useEffect(() => {
        getMonthDays(ctrlYear, ctrlMonth, setDays);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctrlMonth]);

    return (
        <section className="w-[clamp(20rem,100%,60rem)] mb-[5em]">
            <h2 className="text-[1.25rem] mb-[.5em]">{ctrlYear}年{ctrlMonth}月</h2>
            <PrevNextMonthBtns
                ctrlYear={ctrlYear}
                setCtrlYear={setCtrlYear}
                ctrlMonth={ctrlMonth}
                setCtrlMonth={setCtrlMonth}
            />
            <button id="jumpThisMonth" className="rounded-[.5em] bg-[#59b835] mt-[1.5em] mx-0 mb-[.5em] py-[.5em] px-[1em] text-white border border-transparent text-[0.875rem] disabled:bg-[#dadada] disabled:text-[#333] trantion duration-[.25s] not-disabled:hover:cursor-pointer not-disabled:hover:bg-white hover:text-[#59b835] hover:border-[#59b835] active:bg-white active:text-[#59b835] active:border-[#59b835]" type="button" onClick={jumpThisMonth}>今月に移動</button>
            <ul className="grid grid-cols-[repeat(7,1fr)] place-items-center place-content-start rounded lg:rounded-[.5rem]"
                // Reactにおけるイベントハンドラでは、イベントオブジェクト（SyntheticEvent）が自動的に渡されるので以下の書き方でOK （handleSwipeCancel にわざわざ引数を指定しなくても良い）
                onTouchMove={handleSwipeCancel}
            >
                <DaydateList days={days} />
                <DaysList days={days} />
            </ul>
        </section>
    );
}