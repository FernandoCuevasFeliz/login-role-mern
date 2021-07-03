import { connect, connection } from 'mongoose';
import { uri } from './config';

connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

connection.once('open', () => {
  console.log('DB is connect');
});

connection.on('error', (error) => console.log(error));
