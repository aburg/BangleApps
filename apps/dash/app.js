const fontColor = 0x0661;
const fillColor = 0x0461;
const borderColor = 0x0261;
const fontSize = 1;
const fontFamily = '6x8';

const drawFillbox = (x, y, w, h, progress) => {
    g.setColor(fillColor);
    g.fillRect(x, y, x + progress, y + h);
    g.setColor(borderColor);
    g.drawRect(x, y, x + w, y + h);
};

const drawProgress = (x, y, w, h, progress, label) => {
    drawFillbox(x, y, w, h, progress);
    g.setColor(fontColor);
    g.setFont(fontFamily, fontSize);
    g.drawString(label, x + 4, y + 2);
};

const drawCheckbox = (x, y, w, h, checked, label) => {
    drawFillbox(x + w - h, y, h, h, checked ? h : 0);
    g.setColor(fontColor);
    g.setFont(fontFamily, fontSize);
    g.drawString(label, x, y + 2);
};

const drawDashboard = () => {
    g.clear();

    let y = -5;
    drawProgress(10, y += 15, 100, 11, 20, 'LEVEL 1');
    drawProgress(10, y += 15, 100, 11, 60, 'DAILY');

    const exercises = [
        'cold shower',
        'push ups',
        'grip150',
    ];

    exercises.forEach((exercise) => {
        drawProgress(10, y += 15, 100, 11, 60, exercise);
    });

    drawCheckbox(10, y += 15, 100, 11, false, 'CheckCheck1');
    drawCheckbox(10, y += 15, 100, 11, true, 'CheckCheck2');
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
