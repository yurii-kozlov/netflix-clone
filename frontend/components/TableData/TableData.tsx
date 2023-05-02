import React, { ReactElement } from 'react';
import { SubscriptionPlans } from 'types/Plan';
import cn from 'classnames';
import styles from 'components/TableData/TableData.module.scss';

type TableDataProps = {
  chosenPlan: SubscriptionPlans,
  content: string[]
};

export const TableData: React.FC<TableDataProps> = ({ chosenPlan, content }): ReactElement => (
  <>
    <td className={cn(styles.data, {[styles.dataActive]: chosenPlan === SubscriptionPlans.Basic})}>
      {content[0]}
    </td>
    <td className={cn(styles.data, {[styles.dataActive]: chosenPlan === SubscriptionPlans.Standard})}>
      {content[1]}
    </td>
    <td className={cn(styles.data, {[styles.dataActive]: chosenPlan === SubscriptionPlans.Premium})}>
      {content[2]}
    </td>
  </>
  );
