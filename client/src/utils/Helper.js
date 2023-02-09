
const convertDate =(date) =>{
    let dateNew = new Date(date);

    const year = dateNew.getFullYear();
    const month = dateNew.getMonth();
    const day = dateNew.getDate();

    let hours = String(dateNew.getHours());
    let minutes = String(dateNew.getMinutes());

    if(hours.length == 1)
        hours = '0' + hours;
    if(minutes.length == 1)
        minutes = '0' + minutes
    
    const stringDate = `${day}/${month}/${year}`
    // const stringHourDate = dateNew.toLocaleDateString('en-US')
    const stringHourDate = `${hours}:${minutes}`

    return {day:stringDate, hour:stringHourDate}
}

const otherFunc = () =>{

}

export {convertDate, otherFunc}