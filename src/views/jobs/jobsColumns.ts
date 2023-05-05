import { TranslateColumnName } from '../../components/table/Table.types';

import { JobsTableColumnNames } from './Jobs.types';

export const jobsColumns: TranslateColumnName<JobsTableColumnNames>[] = [
  { id: 'position', displayName: 'position' },
  { id: 'date', displayName: 'date' },
  { id: 'actions', displayName: 'actions' }
];
