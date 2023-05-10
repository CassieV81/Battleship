
const Ship = (len) => {

  let shipLength = len;

  const hit = () => {
    if (shipLength > 0) {
      shipLength -= 1;
    }
    return shipLength;
  }

  const isSunk = () => {
    return shipLength === 0;
  }

  return {shipLength, hit, isSunk};

}

export default Ship;