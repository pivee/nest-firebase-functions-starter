import * as functions from 'firebase-functions';
import { FirebaseFunction } from './firebase-function';
import { HelloWorldModule } from './hello-world/hello-world.module';

export const helloWorld = functions.https.onRequest(
  new FirebaseFunction(HelloWorldModule).init(),
);
