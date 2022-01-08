import React from "react";

import { useTable } from "react-table";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { updateSpending } from "../redux/features/spending";

const CustomTable = ({ columns, data }) => {
	const dispatch = useDispatch();

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns: columns, data: data });

	return (
		<TableContainer component={Paper}>
			<Table {...getTableProps()}>
				<TableHead>
					{headerGroups.map((headerGroup) => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<TableCell
									{...column.getHeaderProps({
										style: { width: column.width, fontWeight: "bold" },
									})}
								>
									{column.render("Header")}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<TableRow
								hover
								{...row.getRowProps()}
								onClick={
									() => {
										dispatch(updateSpending(row.original));
									}
									//spendingData({ type: "UPDATE_ALL", payload: row.original })
								}
							>
								{row.cells.map((cell) => {
									return (
										<TableCell
											{...cell.getCellProps({
												style: {
													width: cell.column.width,
												},
											})}
										>
											{cell.render("Cell")}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default CustomTable;
