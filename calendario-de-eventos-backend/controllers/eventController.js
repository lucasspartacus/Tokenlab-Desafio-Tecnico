const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

exports.createEvent = async (req, res) => {
  try {
   
    const { description, startTime, endTime } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    
    const decoded = jwt.verify(token, 'secretkey');  
    
    const event = new Event({
      description,
      startTime,
      endTime,
      userId: decoded.userId,  
    });


    await event.save();
    res.status(201).json(event);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Event creation failed' });
  }
};


exports.updateEvent = async (req, res) => {
  try {
    const { description, startTime, endTime } = req.body;
    const event = await Event.findByIdAndUpdate(req.params.id, { description, startTime, endTime }, { new: true });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Event update failed' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Event deletion failed' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];  
    const decoded = jwt.verify(token, 'secretkey');  
  
    const events = await Event.find({ userId: decoded.userId });
    
    res.json(events); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};
