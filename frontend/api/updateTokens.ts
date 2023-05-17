import schedule, {Job} from 'node-schedule';
import { Dispatch } from 'redux';
import { NextRouter } from 'next/router';
import * as authActions from 'features/authorization';

export const intervalForUpdate = '*/29 * * * *';

export const startTokenUpdater = (
  dispatch: Dispatch<any>,
  interval: string,
  router: NextRouter
): Job => {
  const job = schedule.scheduleJob(interval, async () => {
    try {
      dispatch(authActions.checkAuth());
    } catch (error) {
      router.replace('/signIn');
    }
  });

  return job;
};
