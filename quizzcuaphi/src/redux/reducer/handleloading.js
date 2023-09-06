
export const handleLoading = (a = false , b) => {
   switch(b.type){
    case "loading" : return b.value
    default : return a
   }
}