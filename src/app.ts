import express from 'express';
import path from 'path';
import { calculateAge } from './utils/ageCalculator';
import { validate } from './utils/validator';

/**
 * Express application for serving the age calculator UI and API.
 */
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

/**
 * Handles age calculation requests from the UI.
 *
 * @param req - Express request containing `birthdate` in query params.
 * @param res - Express response returning a JSON message.
 * @returns Sends a JSON response with validation or age result details.
 */
function handleCalculate(req: express.Request, res: express.Response) {
  const input = req.query.birthdate as string;

  const validation = validate(input);
  if (!validation.valid) {
    return res.json({ message: validation.error });
  }

  const [y, m, d] = input.split('/').map(Number);
  const birthDate = new Date(y, m - 1, d);
  const today = new Date();

  if (birthDate > today) {
    return res.json({ message: 'You are not born yet!' });
  }

  if (birthDate.toDateString() === today.toDateString()) {
    return res.json({ message: 'Are you sure you are born today?' });
  }

  const age = calculateAge(birthDate, today);
  let message = `You are ${age} years old.`;

  if (age > 100) {
    message += ' Wow! You are over 100!';
  } else if (age === 100) {
    message += ' Congratulations!';
  }

  if (
    birthDate.getMonth() === today.getMonth() &&
    birthDate.getDate() === today.getDate()
  ) {
    message += ' Happy Birthday!';
  }

  res.json({ message });
}

app.get('/calculate', handleCalculate);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});