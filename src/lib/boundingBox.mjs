const _toDegrees = (angle) => (_precisionRound(angle * (180 / Math.PI)));
const _toRadians = (angle) => (angle * (Math.PI / 180));

const _precisionRound = (number) => {
  const factor = Math.pow(10, 6);
  return Math.round(number * factor) / factor;
};

const EARTH_RADIUS = 6371.01;
const MIN_LAT = _toRadians(-90);
const MAX_LAT = _toRadians(90);
const MIN_LON = _toRadians(-180);
const MAX_LON = _toRadians(180);

const getBoundingBox = (longitude, latitude, distance) => {
  const longitudeRadian = _toRadians(longitude);
  const latitudeRadian = _toRadians(latitude);

  const angularDistance = distance / EARTH_RADIUS;

  let minLatitude = latitudeRadian - angularDistance;
  let maxLatitude = latitudeRadian + angularDistance;
  let minLongitude;
  let maxLongitude;

  if (minLatitude > MIN_LAT && maxLatitude < MAX_LAT) {
    const delta_lon = Math.asin(Math.sin(angularDistance) / Math.cos(latitudeRadian));
    minLongitude = longitudeRadian - delta_lon;
    if (minLongitude < MIN_LON) {
      minLongitude += 2 * Math.PI
    }
    maxLongitude = longitudeRadian + delta_lon;
    if (maxLongitude > MAX_LON) {
      maxLongitude -= 2 * Math.PI
    }
  } else {
    minLatitude = max(minLatitude, MIN_LAT);
    maxLatitude = min(maxLatitude, MAX_LAT);
    minLongitude = MIN_LON;
    maxLongitude = MAX_LON;
  }

  return {
    'minLongitude': _toDegrees(minLongitude),
    'minLatitude': _toDegrees(minLatitude),
    'maxLongitude': _toDegrees(maxLongitude),
    'maxLatitude': _toDegrees(maxLatitude)
  };

};

const isPointInBoundingBox = (boundingBox, pointLongitude, pointLatitude) => {
  return pointLatitude >= boundingBox.minLatitude && pointLatitude <= boundingBox.maxLatitude && pointLongitude >= boundingBox.minLongitude && pointLongitude <= boundingBox.maxLongitude;
};

export { getBoundingBox, isPointInBoundingBox }
