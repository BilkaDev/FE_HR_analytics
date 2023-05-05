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
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { Table } from '../../components/table/Table';
import { TableData } from '../../components/table/Table.types';
import { useTranslate } from '../../contex/translations/useTranslate';
import { AppRoute, getSingleJobUrl } from '../../AppRoute';
import { usePagination } from '../../common/hooks/usePagination';
import { useSearch } from '../../common/hooks/useSearch';
import { useMutationCustom } from '../../api/useMutationCustom';
import { useQueryCustom } from '../../api/useQueryCustom';
import { JobsResponse, Job, JOBS_URL, getJobsUrl } from '../../api/request/job';

import { jobsColumns } from './jobsColumns';
import { JobsTableColumnNames } from './Jobs.types';
import * as styles from './jobs.styles';

export const Jobs = () => {
  const { data } = useQueryCustom<JobsResponse>({
    queryKey: ['jobs'],
    url: JOBS_URL
  });
  const queryClient = useQueryClient();

  const {
    currentPage,
    paginatedData,
    onPageChange,
    onRowsChange,
    rowsPerPage
  } = usePagination<JobsResponse>({
    data: data?.data ?? [],
    rows: 5
  });
  const { searchTerm, searchResult, onSearchTerm } = useSearch<Job, 'title'>({
    searchBy: 'title',
    data: paginatedData
  });
  const translate = useTranslate();

  const translateColumnName = useMemo(
    () =>
      jobsColumns.map(col => ({
        id: col.id,
        displayName: translate(col.displayName)
      })),
    [translate]
  );

  const onOptimisticUpdate = useCallback(
    (itemId: string) => {
      const dataCache = queryClient.getQueryData<AxiosResponse<JobsResponse>>([
        'jobs'
      ]);
      if (!dataCache) return;
      const itemsFiltered = dataCache.data.filter(item => item.id !== itemId);
      queryClient.setQueryData(['jobs'], {
        ...dataCache,
        data: itemsFiltered
      });
    },
    [queryClient]
  );

  const { mutate: onJobDelete } = useMutationCustom({
    mutationFn: axios => (jobId: string) => axios.delete(getJobsUrl(jobId)),
    onSettled: () => {
      queryClient.invalidateQueries(['jobs']);
    },
    onMutate: onOptimisticUpdate
  });

  const jobs: TableData<JobsTableColumnNames> = useMemo(() => {
    if (!data) return [];
    return (searchResult ?? data.data.slice(0, rowsPerPage)).map(job => ({
      id: job.id,
      date: job.createdAt.slice(0, 10),
      position: job.title,
      actions: (
        <Box>
          <IconButton onClick={() => onJobDelete(job.id)}>
            <Delete />
          </IconButton>
          <IconButton component={Link} to={getSingleJobUrl(job.id)}>
            <Visibility />
          </IconButton>
        </Box>
      )
    }));
  }, [data, onJobDelete, rowsPerPage, searchResult]);

  if (!data?.data) return null;

  return (
    <Table<JobsTableColumnNames>
      columnNames={translateColumnName}
      data={jobs}
      renderAboveTable={({ selectedIds, onSelect }) => (
        <Box sx={styles.aboveTableContainer}>
          <Select
            value="actions"
            disabled={selectedIds.length === 0}
            onChange={async e => {
              if (e.target.value === 'delete') {
                await Promise.all(
                  selectedIds.map(async id => {
                    onJobDelete(id);
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
            label={translate('search job')}
          />
          <Button
            component={Link}
            to={AppRoute.addJob}
            variant="contained"
            sx={styles.addJobButton}
          >
            {translate('add job offer')}
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
