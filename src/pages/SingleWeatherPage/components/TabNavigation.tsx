import { dayNames } from "../utils/utils"

const TabNavigation = ({ details , index , setIndex } : { details : Record<string , number >[] , index : number , setIndex : React.Dispatch<React.SetStateAction<number>> }) => {
  return (
    <div className="flex w-full overflow-x-auto py-2">
       {
        details.map(( item , i ) => <div key={i} className={`${ index === i ? 'font-bold border-r border-t border-l border-black rounded-t-sm' : 'border-b hover:bg-gray-200 rounded-t-sm'} p-2 flex-1 cursor-pointer min-w-[100px]`} onClick={() => setIndex(i)}>
            <div>
             <p className="text-center">{item.date}</p>
             <p className="text-center">{dayNames[ item.day ]}</p>      
             </div>   
        </div>)
       }
    </div>
  )
}

export default TabNavigation