import {port} from './src/config';
import app from './src/app';

console.log(`Server is running on ${port}`);
app.listen(port);
