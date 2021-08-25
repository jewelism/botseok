const robot = require("robotjs");
const { isSleeping, getCurrentTime } = require("./util");

const MACRO_FN_MINUTES = 5;
const MACRO_FN_MS = 1000 * 60 * MACRO_FN_MINUTES;
const macroFn = () =>
  setInterval(() => {
    // robot.typeString("`");
    robot.keyTap("escape");
    console.log("key tab:", getCurrentTime());
  }, MACRO_FN_MS);

const prevPos = { x: null, y: null };
let macroTimer = 0;

const SLEEP_CHECK_SECONDS = 10;
const SLEEP_CHECK_MS = 1000 * SLEEP_CHECK_SECONDS;
setInterval(() => {
  const mouse = robot.getMousePos();
  const sleeping = isSleeping({ mouse, prevPos });
  if (!sleeping && macroTimer) {
    console.log("커서 움직임 감지", getCurrentTime());
    clearInterval(macroTimer);
    macroTimer = null;
  }
  if (sleeping && !macroTimer) {
    macroTimer = macroFn();
    console.log(
      "커서 움직임이 없음. 5분 후 5분마다 esc 키를 누릅니다.",
      getCurrentTime()
    );
  }
  prevPos.x = mouse.x;
  prevPos.y = mouse.y;
}, SLEEP_CHECK_MS);
