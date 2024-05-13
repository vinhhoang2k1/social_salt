import { Card, Typography } from "@material-tailwind/react";
import { Pagination } from "../Pagination/Pagination";
import { ReactNode } from "react";
export type TColumn = {
    index: string | number;
    title: string;
    render?: (row: any) => ReactNode;
};
type Props = {
    columns: TColumn[];
    datas: any[];
    onChangePage?: (page) => void;
    totalPage: number;
    className?: string
};
export function DataTable({ columns, datas, onChangePage, totalPage, className }: Props) {
    return (
        <Card className={`h-full w-full overflow-scroll ${className}`}  >
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={column.index}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {column.title}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {datas ? (
                        datas.map((record, recordIndex) => (
                            <tr key={recordIndex}>
                                {columns.map((column, colIndex) => (
                                    <td
                                        className="p-4"
                                        key={`cel-${column.index}-${colIndex}`}
                                    >
                                        {column.render ? (
                                            column.render(record)
                                        ) : (
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {record[column.index]}
                                            </Typography>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <>No data</>
                    )}
                </tbody>
            </table>
            {totalPage > 1 && (
                <Pagination total={totalPage} onChange={onChangePage} />
            )}
        </Card>
    );
}
