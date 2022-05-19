#! /usr/bin/env node

const robot = require('robotjs');
const desktopIdle = require('desktop-idle');

const DEFAULT_IDLE_TIME = 5; // minutes

const moveMouse = () => {
  const mouse = robot.getMousePos();
  const originalX = mouse.x;
  const originalY = mouse.y;

  robot.moveMouse(originalX-100,originalY+100);
  
  setTimeout(() => {
    robot.moveMouse(originalX+100,originalY-100);
  },100);
  
  setTimeout(() => {
    robot.moveMouse(originalX,originalY);
  },300);
}

(() => {
  let time = DEFAULT_IDLE_TIME;
  let count = 0;
  let sessionTime = 0;

  const args = process.argv.slice(2);
  if (args.length > 0) {
    if (args[0] === '-h' || args[0] === '--help') {
      console.log('Usage: caffe [idle interval in minutes (default 10 minutes)] [active interval in minutes (default infinite)]');
      return;
    }
    time = parseInt(args[0] || DEFAULT_IDLE_TIME);
    sessionTime = parseInt(args[1] || 0);
  }

  console.log( `caffe activated! - idle: ${time} minutes - infinite` );

  const intervalInstance = setInterval(() => {
    const idleTime = desktopIdle.getIdleTime();
    if (idleTime > ((time < 1 ? 1 : time) * 60)) {
      moveMouse();
    }

    if(sessionTime > 0) {
      if (count >= sessionTime * 60) {
        clearInterval(intervalInstance);
      }
    }

    count++;
  }
  , 1000);
})();