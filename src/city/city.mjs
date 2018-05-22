import { getBoundingBox, isPointInBoundingBox } from '../lib/boundingBox';

const _getCityLongitude = (city) => (city.geometry.coordinates[0]);
const _getCityLatitude = (city) => (city.geometry.coordinates[1]);
const _getCityName = (city) => (city.properties.name);
const _getCityPopulation = (city) => (city.properties.population);
const _getCityCoordinates = (city) => (city.geometry.coordinates);

const getCityId = (city) => (city.properties.cartodb_id);

const getCityBoundingBox = (city, distance) => {
  return getBoundingBox(_getCityLongitude(city), _getCityLatitude(city), distance)
};

const isCityInBoundingBox = (boundingBox, city) => {
  return isPointInBoundingBox(boundingBox, _getCityLongitude(city), _getCityLatitude(city));
};

const isAnotherCity = (city, id) => {
  return getCityId(city) != id;
};

const formatAllCities = (cities) => {
  return cities.slice().reduce((formattedCities, city) => {
    formattedCities[getCityId(city)] = formatCity(city);
    return formattedCities
  }, {});
};

const formatCity = (city) => {
  return {
    'cartodb_id': getCityId(city),
    'name': _getCityName(city),
    'population': _getCityPopulation(city),
    'coordinates': _getCityCoordinates(city)
  };
};

const getCitiesWithinBoundingBoxDistance = async (citiesRepo, id, distance) => {
  const city = citiesRepo.byId[id];
  const cityBoundingBox = getCityBoundingBox(city, distance);
  return citiesRepo.allIds.slice().reduce((citiesWithinBound, cityId) => {
    const city = citiesRepo.byId[cityId];
    if (isCityInBoundingBox(cityBoundingBox, city) && isAnotherCity(city, id)) {
      citiesWithinBound.push(city);
    }
    return citiesWithinBound;
  }, []);
};

export {
  getCityId,
  getCityBoundingBox,
  isAnotherCity,
  isCityInBoundingBox,
  formatAllCities,
  formatCity,
  getCitiesWithinBoundingBoxDistance
}
