import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import viewIcon from "../assets/icons/view-icon.png";
import editIcon from "../assets/icons/edit-icon.png";
import sortIcon from "../assets/icons/sort-icon.png";
import deleteIcon from "../assets/icons/delete-icon.png";
import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import PaginationComponent from "./PaginationComponent";

export interface Column {
  id: string | number;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export type DataRecord = Record<string, string | number | React.ReactNode>;

interface CustomTableProps {
  columns: Column[];
  rows: DataRecord[];
  pagination?: boolean;
  showActions?: boolean;
  onRowClick?: (value: any) => void;
  onViewClick?: (value: any) => void;
  onEditClick?: (value: any) => void;
  onDeleteClick?: (value: any) => void;
  checkboxAvailable?: boolean;
  showHeaderCheckbox?: boolean;
  actionHeaderLabel?: string;
  sortAvailable?: boolean;
  onSortClick?: (value: any) => void;
  currentPage?: number;
  rowsPerPage?: number;
  handleChangeRowsPerPage?: (value: number) => void;
  handleChangePage?: (value: number) => void;
  isDeleteAvailable?: boolean;
  isEditAvailable?: boolean;
  tableParentClassName?: string;
}

const StyledTableRow = styled(TableRow)(() => ({
  "&.MuiTableRow-hover:hover": {
    backgroundColor: "#F9FBFF",
  },
}));

const DataGridWithHeaderCheckbox: React.FC<CustomTableProps> = ({
  columns,
  rows,
  pagination = true,
  showActions = true,
  onRowClick,
  onViewClick,
  onEditClick,
  onDeleteClick,
  checkboxAvailable = true,
  showHeaderCheckbox,
  actionHeaderLabel,
  sortAvailable,
  onSortClick,
  currentPage,
  handleChangePage,
  handleChangeRowsPerPage,
  rowsPerPage,
  isDeleteAvailable,
  isEditAvailable,
  tableParentClassName = "",
}) => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    columnId: string | number;
    direction: "asc" | "desc";
  } | null>(null);

  const safeCurrentPage = currentPage ?? 1;

  const safeRowsPerPage = rowsPerPage ?? rows.length;
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

  const isAllSelected = rows.length > 0 && selectedRows.size === rows.length;

  const handleSelectAllClick = () => {
    if (isAllSelected) {
      setSelectedRows(new Set());
    } else {
      const allRowIndices = new Set<number>();
      rows.forEach((_row, index) => allRowIndices.add(index));
      setSelectedRows(allRowIndices);
    }
  };

  const handleSortClick = (columnId: string | number) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.columnId === columnId) {
        const newDirection = prevConfig.direction === "asc" ? "desc" : "asc";
        console.log(`Sorting ${columnId} in ${newDirection} order`);
        return { columnId, direction: newDirection };
      } else {
        console.log(`Sorting ${columnId} in asc order`);
        return { columnId, direction: "asc" };
      }
    });
  };

  useEffect(() => {
    if (sortAvailable) {
      onSortClick?.(sortConfig);
    }
  }, [sortConfig]);
  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", borderRadius: 3, px: 2 }}
      className={`border-1 border-gray-200 !rounded-none ${tableParentClassName}`}
    >
      <TableContainer sx={{ height: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {checkboxAvailable && showHeaderCheckbox && (
                <TableCell padding="checkbox">
                  <Checkbox
                    size="small"
                    indeterminate={selectedRows.size > 0 && selectedRows.size < rows.length}
                    checked={isAllSelected}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
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
                  <div className="flex items-center">
                    <span className="mr-1">{column.label}</span>

                    {sortAvailable && (
                      <img
                        src={sortIcon}
                        alt="sort"
                        className="h-4 w-4 cursor-pointer"
                        onClick={() => handleSortClick?.(column.id)}
                      />
                    )}
                  </div>
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
                  {actionHeaderLabel}
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice((safeCurrentPage - 1) * safeRowsPerPage, safeCurrentPage * safeRowsPerPage)
              .map((row, rowIndex) => {
                const globalIndex = safeCurrentPage * safeRowsPerPage + rowIndex;
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
                    {checkboxAvailable && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          size="small"
                          checked={isSelected}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCheckBoxClick(globalIndex);
                          }}
                        />
                      </TableCell>
                    )}

                    {columns.map((column) => {
                      const value = row[column.id];
                      const cellContent = column.format && typeof value === "number" ? column.format(value) : value;

                      return (
                        <TableCell key={column.id} align={column.align} sx={{ py: 1 }}>
                          {cellContent}
                          {/* {cellContent.length > 1 ? cellContent : <p className="text-xl ml-1">--</p>} */}
                        </TableCell>
                      );
                    })}

                    {showActions && (
                      <TableCell onClick={(e) => e.stopPropagation()} sx={{ textAlign: "center" }}>
                        <button className="me-2" onClick={() => onViewClick?.(row)}>
                          <img src={viewIcon} alt="view" className="h-5 w-5 cursor-pointer" />
                        </button>
                        {isEditAvailable && (
                          <button onClick={() => onEditClick?.(row)} className="me-2">
                            <img src={editIcon} alt="edit" className="h-5 w-5 cursor-pointer" />
                          </button>
                        )}
                        {isDeleteAvailable && (
                          <button onClick={() => onDeleteClick?.(row)}>
                            <img src={deleteIcon} alt="delete" className="h-5 w-5 cursor-pointer" />
                          </button>
                        )}
                      </TableCell>
                    )}
                  </StyledTableRow>
                );
              })}
          </TableBody>
          {
            rows?.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns?.length + 1} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )
          }
        </Table>
      </TableContainer>
      {pagination && (
        <PaginationComponent
          count={Math.ceil(rows.length / safeRowsPerPage)}
          page={safeCurrentPage - 1}
          rowsPerPage={safeRowsPerPage}
          totalCount={rows.length}
          onPageChange={(e, newPage) => handleChangePage?.(newPage)}
          onRowsPerPageChange={(e) => handleChangeRowsPerPage?.(parseInt(e.target.value))}
        />
      )}
    </Paper>
  );
};

export default DataGridWithHeaderCheckbox;
