import React, { ReactElement } from 'react';
import { Plan } from 'enums/Plan';
import cn from 'classnames';
import styles from 'components/TableData/TableData.module.scss';

type TableDataProps = {
  chosenPlan: Plan,
  content: string[]
};

export const TableData: React.FC<TableDataProps> = ({ chosenPlan, content }): ReactElement => (
  <>
    <td className={cn(styles.data, {[styles.dataActive]: chosenPlan === Plan.Basic})}>
      {content[0]}
    </td>
    <td className={cn(styles.data, {[styles.dataActive]: chosenPlan === Plan.Standard})}>
      {content[1]}
    </td>
    <td className={cn(styles.data, {[styles.dataActive]: chosenPlan === Plan.Premium})}>
      {content[2]}
    </td>
  </>
  );
