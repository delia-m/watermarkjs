/**
 * Return a function for positioning a watermark on a target canvas
 *
 * @param {Function} xFn - a function to determine an x value
 * @param {Function} yFn - a function to determine a y value
 * @param {String} text - the text to write
 * @param {String} font - same as the CSS font property
 * @param {String} fillStyle
 * @param {Number} alpha
 * @param {String} textBgColor - background color for text
 * @return {Function}
 */
export function atPos(xFn, yFn, text, font, fillStyle, alpha, textBgColor) {
  alpha || (alpha = 1.0);
  return function (target) {
    const context = target.getContext('2d');
    context.save();

    context.font = font;
    context.globalAlpha = alpha;
    context.textBaseline = 'top';

    let metrics = context.measureText(text);
    const textX = xFn(target, metrics, context);
    const textY = yFn(target, metrics, context);
    const fontSize = font.split('px')[0];

    if (textBgColor && font) {
      // color for background
      context.fillStyle = textBgColor;
      const fontBgPadding = 5;

      context.fillRect(
        textX - fontBgPadding,
        textY - fontBgPadding,
        metrics.width + (fontBgPadding * 2),
        parseInt(font.split('px')[0]) + (fontBgPadding * 2)
      );
    }

    context.fillStyle = fillStyle;
    context.fillText(text, textX, textY);

    context.restore();
    return target;
  }
}

/**
 * Write text to the lower right corner of the target canvas
 *
 * @param {String} text - the text to write
 * @param {String} font - same as the CSS font property
 * @param {String} fillStyle
 * @param {Number} alpha - control text transparency
 * @param {String} textBgColor - background color for text
 * @param {Number} y - height in text metrics is not very well supported. This is a manual value
 * @return {Function}
 */
export function lowerRight(text, font = '28px serif', fillStyle, alpha, textBgColor, y) {
  return atPos(
    (target, metrics) => target.width - (metrics.width + 10),
    target => y || (target.height - parseInt(font.split('px')[0]) - 10),
    text,
    font,
    fillStyle,
    alpha,
    textBgColor
  );
}

/**
 * Write text to the lower left corner of the target canvas
 *
 * @param {String} text - the text to write
 * @param {String} font - same as the CSS font property
 * @param {String} fillStyle
 * @param {Number} alpha - control text transparency
 * @param {String} textBgColor - background color for text
 * @param {Number} y - height in text metrics is not very well supported. This is a manual value
 * @return {Function}
 */
export function lowerLeft(text, font = '28px serif', fillStyle, alpha, textBgColor, y) {
  return atPos(
    () => 10,
    target => y || (target.height - parseInt(font.split('px')[0]) - 10),
    text,
    font,
    fillStyle,
    alpha,
    textBgColor
  );
}

/**
 * Write text to the upper right corner of the target canvas
 *
 * @param {String} text - the text to write
 * @param {String} font - same as the CSS font property
 * @param {String} fillStyle
 * @param {Number} alpha - control text transparency
 * @param {String} textBgColor - background color for text
 * @param {Number} y - height in text metrics is not very well supported. This is a manual value
 * @return {Function}
 */
export function upperRight(text, font = '28px serif', fillStyle, alpha, textBgColor, y) {
  return atPos(
    (target, metrics) => target.width - (metrics.width + 10),
    () => y || 20,
    text,
    font,
    fillStyle,
    alpha,
    textBgColor
  );
}

/**
 * Write text to the upper left corner of the target canvas
 *
 * @param {String} text - the text to write
 * @param {String} font - same as the CSS font property
 * @param {String} fillStyle
 * @param {Number} alpha - control text transparency
 * @param {String} textBgColor - background color for text
 * @param {Number} y - height in text metrics is not very well supported. This is a manual value
 * @return {Function}
 */
export function upperLeft(text, font = '28px serif', fillStyle, alpha, textBgColor, y) {
  return atPos(
    () => 10,
    () => y || 20,
    text,
    font,
    fillStyle,
    alpha,
    textBgColor
  );
}

/**
 * Write text to the center of the target canvas
 *
 * @param {String} text - the text to write
 * @param {String} font - same as the CSS font property
 * @param {String} fillStyle
 * @param {Number} alpha - control text transparency
 * @param {String} textBgColor - background color for text
 * @param {Number} y - height in text metrics is not very well supported. This is a manual value
 * @return {Function}
 */
export function center(text, font, fillStyle, alpha, textBgColor, y) {
  return atPos(
    (target, metrics, ctx) => {ctx.textAlign = 'center'; return  target.width / 2;},
    (target, metrics, ctx) => {ctx.textBaseline = 'middle'; return target.height / 2; },
    text,
    font,
    fillStyle,
    alpha,
    textBgColor
  );
}
