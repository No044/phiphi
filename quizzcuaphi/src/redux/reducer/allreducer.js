import {combineReducers} from "redux"
import { handledata,handlerender } from "./handledata"
import { handleLoading } from "./handleloading"
  const AllReducer = combineReducers (
    {
      handledata,
      handlerender,
      handleLoading
      
    }
  )

export default AllReducer