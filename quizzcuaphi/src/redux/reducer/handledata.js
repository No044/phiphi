
export const handledata = (a = false ,b) => {

  switch(b.type){
    case "render" : return b.value
    default : return a
  }

}

export const handlerender = (a = 1,b) => {

  switch(b.type){
    case "renderhistory": return b.value
    default : return a
  }
}
