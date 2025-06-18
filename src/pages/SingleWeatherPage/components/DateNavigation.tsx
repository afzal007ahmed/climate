import React, {type SetStateAction } from "react"
import { timeFormat } from "../utils/utils";

const DateNavigation = ({ index , setIndex , details , indexForDate , dateDetails  } : { index : number , setIndex : React.Dispatch<SetStateAction<number>> , details : number[] , indexForDate : number , dateDetails : Record<string,number>[] }) => {
    const date = new Date() ;
  return (
    <div className="flex my-8 overflow-x-auto">
        {
            details.map(( _ , i ) => <div key={i} className={`flex-1 text-sm shrink-0 cursor-pointer my-2 ${i === index ? 'font-bold border-r border-t border-l border-black rounded-t-sm' : 'border-b hover:bg-gray-200 rounded-t-sm'} ${date.getHours() >= details[ i + 1 ] && dateDetails[ indexForDate].date === date.getDate() && 'hidden' } max-w-[150px]  p-3 min-w-[100px]`} onClick={() => setIndex(i)}>
                   { timeFormat[details[ i ]] } - { i === details.length - 1 ?  timeFormat[details[ 0 ]]  : timeFormat[details[ i + 1 ]] }
            </div>)
        }
    </div>
  )
}

export default DateNavigation