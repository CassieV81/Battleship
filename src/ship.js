
let Ship = (len) => {

  let shipLength = len;

  const hit = () => {
    let noOfHits = 1;
    return len - noOfHits;
  }

  const isSunk = () => {
    
  }

  return {shipLength, hit};

}

export default Ship;