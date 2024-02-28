import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TablePagination,
  TextField
} from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';
import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import {
  Candidate,
  CANDIDATE_URL,
  CandidatesResponse,
  getCandidateUrl
} from '../../api/request/candidate';
import { Table } from '../../components/table/Table';
import { TableData } from '../../components/table/Table.types';
import { useTranslate } from '../../contex/translations/useTranslate';
import { AppRoute, getSingleCandidateUrl } from '../../AppRoute';
import { usePagination } from '../../common/hooks/usePagination';
import { useSearch } from '../../common/hooks/useSearch';
import { useMutationCustom } from '../../api/useMutationCustom';
import { useQueryCustom } from '../../api/useQueryCustom';

import { candidatesColumns } from './candidatesColumns';
import { CandidatesTableColumnNames } from './candidates.types';
import * as styles from './candidates.styles';

export const Candidates = () => {
  const { data } = useQueryCustom<CandidatesResponse>({
    queryKey: ['candidates'],
    url: CANDIDATE_URL
  });
  const {
    currentPage,
    paginatedData,
    onPageChange,
    onRowsChange,
    rowsPerPage
  } = usePagination<CandidatesResponse>({
    data: data?.data ?? [],
    rows: 5
  });
  const { searchTerm, searchResult, onSearchTerm } = useSearch<
    Candidate,
    'name'
  >({
    data: paginatedData,
    searchBy: 'name'
  });
  const translate = useTranslate();
  const queryClient = useQueryClient();

  const translateColumnName = useMemo(
    () =>
      candidatesColumns.map(col => ({
        id: col.id,
        displayName: translate(col.displayName)
      })),
    [translate]
  );
  const onOptimisticUpdate = useCallback(
    (itemId: string) => {
      const dataCache = queryClient.getQueryData<
        AxiosResponse<CandidatesResponse>
      >(['candidates']);
      if (!dataCache) return;
      const itemsFiltered = dataCache.data.filter(item => item.id !== itemId);
      queryClient.setQueryData(['candidates'], {
        ...dataCache,
        data: itemsFiltered
      });
    },
    [queryClient]
  );

  const { mutate: onCandidateDelete } = useMutationCustom({
    mutationFn: axios => (candidateId: string) =>
      axios.delete(getCandidateUrl(candidateId)),
    onSettled: () => queryClient.invalidateQueries(['candidates']),
    onMutate: onOptimisticUpdate
  });

  const candidates: TableData<CandidatesTableColumnNames> = useMemo(() => {
    if (!data) return [];
    return (searchResult || data.data.slice(0, rowsPerPage)).map(candidate => ({
      id: candidate.id,
      date: candidate.createdAt.slice(0, 10),
      name: candidate.name,
      position: candidate.position,
      actions: (
        <Box>
          <IconButton onClick={() => onCandidateDelete(candidate.id)}>
            <Delete />
          </IconButton>
          <IconButton component={Link} to={getSingleCandidateUrl(candidate.id)}>
            <Visibility />
          </IconButton>
        </Box>
      )
    }));
  }, [data, onCandidateDelete, rowsPerPage, searchResult]);

  if (!data?.data) return null;

  return (
    <Table<CandidatesTableColumnNames>
      columnNames={translateColumnName}
      data={candidates}
      renderAboveTable={({ selectedIds, onSelect }) => (
        <Box sx={styles.aboveTableContainer}>
          <Select
            value="actions"
            disabled={selectedIds.length === 0}
            onChange={async e => {
              if (e.target.value === 'delete') {
                await Promise.all(
                  selectedIds.map(async id => {
                    await onCandidateDelete(id);
                  })
                );
                selectedIds.forEach(id => {
                  onSelect(id);
                });
              }
            }}
          >
            <MenuItem value="actions">{translate('actions')}</MenuItem>
            <MenuItem value="delete">{translate('delete')}</MenuItem>
          </Select>
          <TextField
            onChange={e => onSearchTerm(e.target.value)}
            value={searchTerm}
            type="search"
            label={translate('search candidate')}
          />
          <Button
            component={Link}
            to={AppRoute.addCandidate}
            variant="contained"
            sx={styles.addCandidateButton}
          >
            {translate('add candidate')}
          </Button>
        </Box>
      )}
      renderBelowTable={() => (
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          labelRowsPerPage={translate('rows per page:')}
          component="div"
          rowsPerPage={rowsPerPage}
          count={data.data.length}
          page={currentPage}
          onPageChange={(_event, newPage) => {
            onPageChange(newPage);
          }}
          onRowsPerPageChange={event =>
            onRowsChange(parseInt(event.target.value, 10))
          }
        />
      )}
    />
  );
};
