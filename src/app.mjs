import express from 'express';
import { createInMemoryRepository, withCanadianCities } from './city/repository';
import { formatAllCities, formatCity, getCitiesWithinBoundingBoxDistance } from './city/city';

const app = express();

const initialization = async () => {
  const canadianCitiesRepo = await createInMemoryRepository(withCanadianCities);

  app.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    const distance = req.query.dist;
    
    if (distance) {
      const cities = await getCitiesWithinBoundingBoxDistance(canadianCitiesRepo, id, distance);
      res.send({ 'cities': formatAllCities(cities) });
    } else {
      res.send({ 'city': formatCity(canadianCitiesRepo.byId[id]) });
    }
  });
};

export { app, initialization }
