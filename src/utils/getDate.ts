
const getDay = () => {
  let currentDate = new Date()
  let day = currentDate.getDate()
  let month = currentDate.getMonth() + 1
  let year = currentDate.getFullYear()
  let completeDate = (day + "/" + month + "/" + year)

  return completeDate

}

export default getDay