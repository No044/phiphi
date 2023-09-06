import { router } from "./router";
import {useRoutes} from "react-router-dom"

function Allrouter(){
    const render = useRoutes(router)

     return  render
 
}

export default Allrouter