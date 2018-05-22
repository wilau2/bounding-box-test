import request from 'supertest';
import { app, initialization } from './app';

describe('Api integration tests', () => {

  it('should throw error', async ()=> {
    await initialization();
    await expect(request(app).get('/id/test')).rejects.toEqual({error: 'testest'});
  });
  it('should return oriel city when GET 744', async () => {
    await initialization();
    const response = await request(app).get('/id/744');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      'city': {
        'cartodb_id': 744,
        'coordinates': [-80.643498, 43.069946],
        'name': 'Oriel',
        'population': 2500
      }
    });
  });
  it('should return cities in 4 kilometers bounding box from oriel when GET with ?dist=4', async () => {
    await initialization();
    const response = await request(app).get('/id/744?dist=4');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      'cities': {
        '737': {
          'cartodb_id': 737,
          'coordinates': [
            -80.598719,
            43.064133
          ],
          'name': 'Beaconsfield',
          'population': 2500
        },
        '776': {
          'cartodb_id': 776,
          'coordinates': [
            -80.682714,
            43.098307
          ],
          'name': 'Oxford Centre',
          'population': 109
        },
        '778': {
          'cartodb_id': 778,
          'coordinates': [
            -80.62027,
            43.099452
          ],
          'name': 'Vandecar',
          'population': 2500
        }
      }
    });
  });
});
