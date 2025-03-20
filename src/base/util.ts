/**
 * Axis line can be:
 * x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
 * y-axis "Revenue (in $)" 4000 --> 11000
 * y-axis 4000 --> 11000
 */

export type ParseArrayResult = {
  type: 'category' | 'value';
  data?: string[];
  min?: number;
  max?: number;
};

export function parseArray(str: string): ParseArrayResult {
  if (str.indexOf('-->') !== -1) {
    const [min, max] = str.split('-->').map((s) => Number(s.trim()));
    return {
      type: 'value',
      min,
      max,
    };
  }

  return {
    type: 'category',
    data: str
      .replace(/^\[|\]$/g, '')
      .split(',')
      .map((s) => s.trim())
      .map((s) => s.replace(/^"|"$/g, '')),
  };
}

/**
 * Convert 1d data into 2d data, linear the first dimension from xMin to xMax,
 * and the second dimension is the data.
 * For example, min 100, max 300 data [2, 4, 6],
 * isHorizontal false: returns [[100, 2], [200, 4], [300, 6]]
 * isHorizontal true: returns [[2, 100], [4, 200], [6, 300]]
 *
 * @param xMin
 * @param xMax
 * @param data
 * @param isHorizontal
 */
export function convert2dData(
  xMin: number,
  xMax: number,
  data: number[],
  isHorizontal: boolean
) {
  if (data.length < 1) {
    return [];
  } else if (data.length === 1) {
    return isHorizontal ? [[data[0], xMin]] : [[xMin, data[0]]];
  }
  const result = [];
  const step = (xMax - xMin) / (data.length - 1);
  for (let i = 0; i < data.length; i++) {
    result.push(
      isHorizontal ? [data[i], xMin + i * step] : [xMin + i * step, data[i]]
    );
  }
  return result;
}
