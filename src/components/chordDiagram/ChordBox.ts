import { SVG, Svg } from '@svgdotjs/svg.js';

export interface ChordBoxOptions {
  numStrings?: number;
  numFrets?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  strokeColor?: string;
  showTuning?: boolean;
  defaultColor?: string;
  bgColor?: string;
  labelColor?: string;
  textColor?: string;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: string;
  fontWeight?: string;
  labelWeight?: string;
  bridgeColor?: string;
  stringWidth?: number;
  stringColor?: string;
  fretWidth?: number;
  fretColor?: string;
  circleRadius?: number;
}

interface Barre {
  fromString: number;
  toString: number;
  fret: number;
}

interface DrawOptions {
  chord: Chord;
  position?: number;
  positionText?: number;
  barres?: Barre[];
  tuning?: string[];
}

export type Chord = Array<[number, 'x'] | [number, number, string]>;

const defaultParams: ChordBoxOptions = {
  numStrings: 6,
  numFrets: 5,
  x: 0,
  y: 0,
  width: 100,
  height: 120,
  strokeWidth: 1,
  showTuning: true,
  defaultColor: '#666',
  bgColor: '#fff',
  labelColor: '#fff',
  textColor: '#444',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontSize: 10,
  fontStyle: 'light',
  fontWeight: '100',
  labelWeight: '100',
};

class ChordBox {
  public position = 0;
  public positionText = 0;
  public chord: Chord = [];
  public barres: Barre[] = [];
  public tuning = ['E', 'A', 'D', 'G', 'B', 'E'];

  private sel: HTMLElement | null;
  private params: Required<ChordBoxOptions>;
  public canvas: Svg;
  public width: number;
  public height: number;
  public numFrets: number;
  public numStrings: number;
  public spacing: number;
  public fretSpacing: number;
  public x: number;
  public y: number;
  public fontSize: number;

  public metrics: {
    circleRadius: number;
    barreRadius: number;
    fontSize: number;
    barShiftX: number;
    bridgeStrokeWidth: number;
  };

  constructor(sel: HTMLElement | null, params: ChordBoxOptions = {}) {
    this.sel = sel;

    if (!sel) throw new Error('Not a valid selector');

    this.params = {
      ...defaultParams,
      ...params,
    } as Required<ChordBoxOptions>;

    // Setup defaults if not specifically overridden
    [
      'bridgeColor',
      'stringColor',
      'fretColor',
      'strokeColor',
      'textColor',
    ].forEach((param) => {
      this.params[param] = this.params[param] || this.params.defaultColor;
    });

    ['stringWidth', 'fretWidth'].forEach((param) => {
      this.params[param] = this.params[param] || this.params.strokeWidth;
    });

    // Create canvas and add it to the DOM
    this.canvas = SVG().addTo(sel).size(this.params.width, this.params.height);

    // Size and shift board
    this.width = this.params.width * 0.75;
    this.height = this.params.height * 0.75;

    // Initialize scaled-spacing
    this.numStrings = this.params.numStrings;
    this.numFrets = this.params.numFrets;
    this.spacing = this.width / this.numStrings;
    this.fretSpacing = this.height / (this.numFrets + 2);

    // Add room on sides for finger positions on 1. and 6. string
    this.x = this.params.x + this.params.width * 0.15 + this.spacing / 2;
    this.y = this.params.y + this.params.height * 0.15 + this.fretSpacing;

    this.metrics = {
      circleRadius: this.width / 20,
      barreRadius: this.width / 25,
      fontSize: this.params.fontSize || Math.ceil(this.width / 8),
      barShiftX: this.width / 28,
      bridgeStrokeWidth: Math.ceil(this.height / 36),
    };
  }

  drawText(x: number, y: number, msg: string | number, attrs?: object) {
    const textAttrs = {
      family: this.params.fontFamily,
      size: this.metrics?.fontSize,
      style: this.params.fontStyle,
      weight: this.params.fontWeight,
      ...attrs,
    };

    const text = this.canvas
      .text(`${msg}`)
      .stroke(this.params.textColor)
      .fill(this.params.textColor)
      .font(textAttrs);

    return text.move(x - text.length() / 2, y);
  }

  drawLine(x: number, y: number, newX: number, newY: number) {
    return this.canvas.line(0, 0, newX - x, newY - y).move(x, y);
  }

  draw({ chord, position, barres, positionText, tuning }: DrawOptions) {
    this.chord = chord;
    this.position = position || 0;
    this.positionText = positionText || 0;
    this.barres = barres || [];
    this.tuning = tuning || ['E', 'A', 'D', 'G', 'B', 'E'];
    if (this.tuning.length === 0) {
      this.fretSpacing = this.height / (this.numFrets + 1);
    }

    const { spacing } = this;
    const { fretSpacing } = this;

    // Draw guitar bridge
    if (this.position <= 1) {
      const fromX = this.x;
      const fromY = this.y - this.metrics?.bridgeStrokeWidth;
      this.canvas
        .rect(this.x + spacing * (this.numStrings - 1) - fromX, this.y - fromY)
        .move(fromX, fromY)
        .stroke({ width: 0 })
        .fill(this.params.bridgeColor);
    } else {
      // Draw position number
      this.drawText(
        this.x - this.spacing / 2 - this.spacing * 0.1,
        this.y + this.fretSpacing * this.positionText,
        this.position,
      );
    }

    // Draw strings
    for (let i = 0; i < this.numStrings; i += 1) {
      this.drawLine(
        this.x + spacing * i,
        this.y,
        this.x + spacing * i,
        this.y + fretSpacing * this.numFrets,
      ).stroke({
        width: this.params.stringWidth,
        color: this.params.stringColor,
      });
    }

    // Draw frets
    for (let i = 0; i < this.numFrets + 1; i += 1) {
      this.drawLine(
        this.x,
        this.y + fretSpacing * i,
        this.x + spacing * (this.numStrings - 1),
        this.y + fretSpacing * i,
      ).stroke({
        width: this.params.fretWidth,
        color: this.params.fretColor,
      });
    }

    // Draw tuning keys
    if (this.params.showTuning && this.tuning.length !== 0) {
      for (
        let i = 0;
        i < Math.min(this.numStrings, this.tuning.length);
        i += 1
      ) {
        this.drawText(
          this.x + this.spacing * i,
          this.y + this.numFrets * this.fretSpacing + this.fretSpacing / 12,
          this.tuning[i],
        );
      }
    }

    // Draw chord
    for (let i = 0; i < this.chord.length; i += 1) {
      // Light up string, fret, and optional label.
      this.lightUp({
        string: this.chord[i][0],
        fret: this.chord[i][1], // TODO: hacky casting
        label: this.chord.length > 2 ? this.chord[i][2] : undefined,
      });
    }

    // Draw barres
    for (let i = 0; i < this.barres.length; i += 1) {
      this.lightBar(
        this.barres[i].fromString,
        this.barres[i].toString,
        this.barres[i].fret,
      );
    }
  }

  lightUp({
    string,
    fret,
    label,
  }: {
    string: number;
    fret: 'x' | number;
    label?: string;
  }) {
    const stringNum = this.numStrings - string;
    const shiftPosition =
      this.position === 1 && this.positionText === 1 ? this.positionText : 0;

    const mute = fret === 'x';
    const fretNum = fret === 'x' ? 0 : fret - shiftPosition;

    const x = this.x + this.spacing * stringNum;
    let y = this.y + this.fretSpacing * fretNum;

    if (fretNum === 0) {
      y -= this.metrics.bridgeStrokeWidth;
    }

    if (!mute) {
      this.canvas
        .circle()
        .move(x, y - this.fretSpacing / 2)
        .radius(this.params.circleRadius || this.metrics.circleRadius)
        .stroke({
          color: this.params.strokeColor,
          width: this.params.strokeWidth,
        })
        .fill(fretNum > 0 ? this.params.strokeColor : this.params.bgColor);
    } else {
      this.drawText(x, y - this.fretSpacing, 'X');
    }

    if (label) {
      const fontSize = this.metrics.fontSize * 0.55;
      const textYShift = fontSize * 0.66;
      this.drawText(x, y - this.fretSpacing / 2 - textYShift, label, {
        weight: this.params.labelWeight,
        size: fontSize,
      })
        .stroke({
          width: 0.7,
          color:
            fretNum !== 0 ? this.params.labelColor : this.params.strokeColor,
        })
        .fill(fretNum !== 0 ? this.params.labelColor : this.params.strokeColor);
    }

    return this;
  }

  lightBar(stringFrom: number, stringTo: number, theFretNum: number) {
    let fretNum = theFretNum;
    if (this.position === 1 && this.positionText === 1) {
      fretNum -= this.positionText;
    }

    const stringFromNum = this.numStrings - stringFrom;
    const stringToNum = this.numStrings - stringTo;

    const x = this.x + this.spacing * stringFromNum - this.metrics.barShiftX;
    const xTo = this.x + this.spacing * stringToNum + this.metrics.barShiftX;

    const y = this.y + this.fretSpacing * (fretNum - 1) + this.fretSpacing / 4;
    const yTo =
      this.y + this.fretSpacing * (fretNum - 1) + (this.fretSpacing / 4) * 3;

    this.canvas
      .rect(xTo - x, yTo - y)
      .move(x, y)
      .radius(this.metrics.barreRadius)
      .fill(this.params.strokeColor);

    return this;
  }
}

export default ChordBox;
