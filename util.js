const isSleeping = ({ mouse, prevPos }) => {
  if (prevPos.x === null) {
    return true;
  }
  if (mouse.x === prevPos.x && mouse.y === prevPos.y) {
    return true;
  }
  return false;
}
const padding = (num) => String(num).padStart(2, '0');

const getCurrentTime = () => {
  const date = new Date;
  const hh = padding(date.getHours());
  const mm = padding(date.getMinutes());
  const ss = padding(date.getSeconds());
  return `${hh}:${mm}:${ss}`;
}

module.exports = {
  isSleeping,
  getCurrentTime
}