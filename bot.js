const robot = require("robotjs");
const { isSleeping, getCurrentTime } = require('./util');

const MACRO_FN_MINUTES = 5;
const MACRO_FN_MS = 1000 * 60 * MACRO_FN_MINUTES;
const macroFn = () => setInterval(() => {
  robot.typeString("`");
}, MACRO_FN_MS);

const prevPos = { x: null, y: null };
let macroTimer = 0;

const SLEEP_CHECK_SECONDS = 10;
const SLEEP_CHECK_MS = 1000 * SLEEP_CHECK_SECONDS;
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
}, SLEEP_CHECK_MS);
