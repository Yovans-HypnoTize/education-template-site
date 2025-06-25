import { Pagination, Stack, MenuItem, Select } from "@mui/material";

interface PaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  rowsPerPageOptions?: number[];
}

const PaginationComponent: React.FC<PaginationProps> = ({
  count,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100],
}) => {
  const start = page * rowsPerPage + 1;
  const end = Math.min((page + 1) * rowsPerPage, totalCount);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(event, value);
  };
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center">
        <p>
          Showing {start} to {end} of {totalCount} entries
        </p>
        <div className="ml-3">
          <Select
            size="small"
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
            sx={{ height: 30 }}
          >
            {rowsPerPageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Stack spacing={2}>
          <Pagination
            count={count}
            page={page}
            onChange={handleChange}
            color="primary"
            siblingCount={1}
            boundaryCount={2}
          />
        </Stack>
      </div>
    </div>
  );
};

export default PaginationComponent;
