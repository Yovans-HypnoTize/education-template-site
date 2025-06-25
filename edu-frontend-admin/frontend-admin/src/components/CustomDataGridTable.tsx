import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import viewIcon from "../assets/icons/view-icon.png";
import editIcon from "../assets/icons/edit-icon.png";
import { Checkbox } from "@mui/material";

export interface Column {
  id: string | number;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export type DataRecord = Record<string, string | number>;

interface CustomTableProps {
  columns: Column[];
  rows: DataRecord[];
  pagination?: boolean;
  showActions?: boolean;
  onRowClick?: (value: any) => void;
  onViewClick?: (value: any) => void;
  onEditClick?: (value: any) => void;
  checkboxAvailable?: boolean;
  actionHeaderLabel?:string;
}

const StyledTableRow = styled(TableRow)(() => ({
  "&.MuiTableRow-hover:hover": {
    backgroundColor: "#F9FBFF",
  },
}));

const CustomDataGridTable: React.FC<CustomTableProps> = ({
  columns,
  rows,
  pagination = true,
  showActions = true,
  onRowClick,
  onViewClick,
  onEditClick,
  checkboxAvailable = true,
  actionHeaderLabel
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(
    new Set()
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleCheckBoxClick = (index: number) => {
    setSelectedRows((prevSelected) => {
      const updated = new Set(prevSelected);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return updated;
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", borderRadius: 3, px: 2  }}
      className="border-1 border-gray-200"
    >
      <TableContainer sx={{ height:520, maxWidth: "1300px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              {showActions && (
                <TableCell
                  style={{
                    minWidth: 50,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {actionHeaderLabel ?? "Action"}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                const globalIndex = page * rowsPerPage + rowIndex;
                const isSelected = selectedRows.has(globalIndex);

                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={rowIndex}
                    onClick={() => onRowClick?.(row)}
                    style={{ cursor: "pointer" }}
                  >
                    {columns.map((column, colIndex) => {
                      const value = row[column.id];
                      const cellContent =
                        checkboxAvailable && colIndex === 0 ? (
                          <div className="flex items-center gap-2">
                            <Checkbox
                              size="small"
                              checked={isSelected}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCheckBoxClick(globalIndex);
                              }}
                            />
                            <span>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </span>
                          </div>
                        ) : column.format && typeof value === "number" ? (
                          column.format(value)
                        ) : (
                          value
                        );

                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ py: 1 }}
                        >
                          {cellContent}
                        </TableCell>
                      );
                    })}
                    {showActions && (
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <button
                          className="me-2"
                          onClick={() => onViewClick?.(row)}
                        >
                          <img src={viewIcon} alt="view" className="h-5 w-5" />
                        </button>
                        <button onClick={() => onEditClick?.(row)}>
                          <img src={editIcon} alt="edit" className="h-5 w-5" />
                        </button>
                      </TableCell>
                    )}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default CustomDataGridTable;
