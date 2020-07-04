const CalendarDao = require('./calendars');
const testUtils = require('../test-utils');

describe('Calendars DAO', () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  
  describe('getById', () => {
    it('should return null with no calendar created', async () => {
      const calendar = await CalendarDao.getById('id');
      expect(calendar).toBeNull();
    });
  });

  describe('create', () => {
    it('should fail without a provided name', async () => {
      expect(() => CalendarDao.create(undefined)).rejects.toThrow();
    });
  });

  describe('create multiple calendars and then getById', () => {
    let calendar1, calendar2;

    beforeAll(async () => {
      calendar1 = await CalendarDao.create('calendar1');
      calendar2 = await CalendarDao.create('calendar2');
    });

    it('should return calendar1 using its id', async () => {
      const storedCalendar = await CalendarDao.getById(calendar1._id);
      expect(storedCalendar).toMatchObject({ 
        name: 'calendar1', 
        _id: calendar1._id 
      });
    });

    it('should return calendar2 using its id', async () => {
      const storedCalendar = await CalendarDao.getById(calendar2._id);
      expect(storedCalendar).toMatchObject({ 
        name: 'calendar2', 
        _id: calendar2._id 
      });
    });
  });
})