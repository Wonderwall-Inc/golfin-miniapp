// FIXME

import { RecordContextType, RecordType } from "@/type";
import { createContext, useContext } from "react";

export const RecordContext = createContext<RecordContextType>({
    record: {} as RecordType,
    setRecord: () => { },
    isWaitingRecord: false,
    setIsWaitingRecord: () => { },
})

export const useRecrodContext = () => useContext(RecordContext)