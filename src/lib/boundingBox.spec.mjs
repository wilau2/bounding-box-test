import { getBoundingBox } from './boundingBox';

describe('when getBoundingBox', () => {
  it('should get same output from python bbox example', async () => {
    const bboxValues = getBoundingBox(-71.269204, 46.716993, 2);
    expect(bboxValues).toEqual({"maxLatitude": 46.734979, "maxLongitude": -71.24297, "minLatitude": 46.699007, "minLongitude": -71.295438});
  });
});
