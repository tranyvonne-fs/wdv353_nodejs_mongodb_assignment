const request = require('supertest');
const app = require('../index');
const Pet = require('../models/Pet');
const Owner = require('../models/Owner');

jest.mock('../models/Pet');
jest.mock('../models/Owner');

describe('Pet API Query Tests', () => {
    afterEach(() => jest.clearAllMocks());
  
    test('should return only name and species of pets', async () => {
      const mockData = [{ name: 'Fido', species: 'Dog' }];
      Pet.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockData)
      });
  
      const res = await request(app).get('/api/pets?select=name,species');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
    });
  
    test('should return all pet fields if select is not used', async () => {
      const mockData = [{ name: 'Whiskers', species: 'Cat', age: 3 }];
      Pet.find.mockResolvedValue(mockData);
  
      const res = await request(app).get('/api/pets');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
    });
  
    test('should return 5 pets with limit and skip', async () => {
      const mockData = Array(5).fill({ name: 'Pet' });
      Pet.find.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(mockData)
        })
      });
  
      const res = await request(app).get('/api/pets?skip=0&limit=5');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(5);
    });
  
    test('should return 2 pets when limit=2', async () => {
      const mockData = Array(2).fill({ name: 'Pet' });
      Pet.find.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(mockData)
        })
      });
  
      const res = await request(app).get('/api/pets?limit=2');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
  
    test('should return pets sorted by age ascending', async () => {
      const mockData = [{ age: 1 }, { age: 5 }];
      Pet.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockData)
      });
  
      const res = await request(app).get('/api/pets?sort=age');
      expect(res.statusCode).toBe(200);
      expect(res.body[0].age).toBeLessThanOrEqual(res.body[1].age);
    });
  
    test('should return pets sorted by age descending', async () => {
      const mockData = [{ age: 5 }, { age: 1 }];
      Pet.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockData)
      });
  
      const res = await request(app).get('/api/pets?sort=-age');
      expect(res.statusCode).toBe(200);
      expect(res.body[0].age).toBeGreaterThanOrEqual(res.body[1].age);
    });
  });
  
  describe('Owner API Query Tests', () => {
    afterEach(() => jest.clearAllMocks());
  
    test('should return only name and email of owners', async () => {
      const mockData = [{ name: 'Jane', email: 'jane@example.com' }];
      Owner.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockData)
      });
  
      const res = await request(app).get('/api/owners?select=name,email');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
    });
  
    test('should return all owner fields if select is not used', async () => {
      const mockData = [{ name: 'John', email: 'john@example.com', phone: '555-5555' }];
      Owner.find.mockResolvedValue(mockData);
  
      const res = await request(app).get('/api/owners');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
    });
  
    test('should return 5 owners with limit and skip', async () => {
      const mockData = Array(5).fill({ name: 'Owner' });
      Owner.find.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(mockData)
        })
      });
  
      const res = await request(app).get('/api/owners?skip=0&limit=5');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(5);
    });
  
    test('should return 2 owners when limit=2', async () => {
      const mockData = Array(2).fill({ name: 'Owner' });
      Owner.find.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(mockData)
        })
      });
  
      const res = await request(app).get('/api/owners?limit=2');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
  
    test('should return owners sorted by name ascending', async () => {
      const mockData = [{ name: 'Alice' }, { name: 'Bob' }];
      Owner.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockData)
      });
  
      const res = await request(app).get('/api/owners?sort=name');
      expect(res.statusCode).toBe(200);
      expect(res.body[0].name < res.body[1].name).toBe(true);
    });
  
    test('should return owners sorted by name descending', async () => {
      const mockData = [{ name: 'Bob' }, { name: 'Alice' }];
      Owner.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockData)
      });
  
      const res = await request(app).get('/api/owners?sort=-name');
      expect(res.statusCode).toBe(200);
      expect(res.body[0].name > res.body[1].name).toBe(true);
    });

    afterAll(done => {
        if (global.server) {
          global.server.close(done);
        } else {
          done();
        }
      });
  });
  