const fontColor = 0x0661;
const fillColor = 0x0461;
const borderColor = 0x0261;
const fontSize = 2;
const fontFamily = '6x8';

const drawFillbox = (x, y, w, h, progress) => {
  g.setColor(fillColor);
  g.fillRect(x, y, x + progress, y + h);
  g.setColor(borderColor);
  g.drawRect(x, y, x + w, y + h);
};

const drawProgress = (x, y, w, h, label, progress) => {
  console.log('drwaing progress');
  drawFillbox(x, y, w, h, progress);
  g.setColor(fontColor);
  g.setFont(fontFamily, fontSize);
  g.drawString(label, x + 4, y + 2);
};

const drawCheckbox = (x, y, w, h, label, checked) => {
  drawFillbox(x + w - h, y, h, h, checked ? h : 0);
  g.setColor(fontColor);
  g.setFont(fontFamily, fontSize);
  g.drawString(label, x, y + 2);
};

const drawDashboard = () => {
  g.clear();

  const x = 20;
  let y = 5;
  const dy = 30;
  const w = 200;
  const h = 22;
  const exercises = [
    ['drawProgress', 'LEVEL 1', 20],
    ['drawProgress', 'DAILY', 60],
    ['drawProgress', 'push ups', 10],
    ['drawProgress', 'grip150', 0],
    ['drawCheckbox', 'CheckCheck1', false],
    ['drawCheckbox', 'CheckCheck2', true],
  ];

  exercises.forEach((exercise) => {
    switch (exercise[0]) {
      case 'drawProgress':
        drawProgress(x, y += dy, w, h, exercise[1], exercise[2]);
        break;
      case 'drawCheckbox':
        drawCheckbox(x, y += dy, w, h, exercise[1], exercise[2]);
        break;
    }
  });
};


// special function to handle display switch on
Bangle.on('lcdPower', (on) => {
  if (on) {
    drawDashboard();
    Bangle.drawWidgets();
  }
});

g.clear();
drawDashboard();
