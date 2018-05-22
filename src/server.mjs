import { app, initialization } from './app';

const PORT = 8000;

initialization().then(
  () => {},
  (err) => {
    console.error(err);
    console.error('Something went wrong');
  },
);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
