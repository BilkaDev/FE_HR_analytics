import { TranslateColumnName } from '../../components/table/Table.types';

import { CandidatesTableColumnNames } from './candidates.types';

export const candidatesColumns: TranslateColumnName<CandidatesTableColumnNames>[] =
  [
    { id: 'name', displayName: 'name' },
    { id: 'position', displayName: 'position' },
    { id: 'date', displayName: 'date' },
    { id: 'actions', displayName: 'actions' }
  ];
