const robot = require("robotjs");

const isSleeping = ({ mouse, prevPos }) => {
  if (prevPos.x === null) {
    return true;
  }
  if (mouse.x === prevPos.x && mouse.y === prevPos.y) {
    return true;
  }
  return false;
}

const getCurrentTime = () => {
  const date = new Date;
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  return `${hh}:${mm}:${ss}`;
}

const macroFn = () => setInterval(() => {
  robot.typeString("`");
}, 1000 * 60 * 5);

const prevPos = { x: null, y: null };
let macroTimer = 0;
setInterval(() => {
  
  const mouse = robot.getMousePos();
  const sleeping = isSleeping({ mouse, prevPos });
  if (!sleeping && macroTimer) {
    console.log('not sleeping!', getCurrentTime());
    clearInterval(macroTimer);
    macroTimer = null;
  }
  if (sleeping && !macroTimer) {
    macroTimer = macroFn();
    console.log('i\'m sleeping!', getCurrentTime());
  }
  prevPos.x = mouse.x;
  prevPos.y = mouse.y;
}, 10000);
