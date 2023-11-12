import { 
  Paper,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableFooter, 
  TableHead, 
  TablePagination, 
  TableRow, 
  Tooltip
} from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { CountContext } from '../../App';
import Row from '../../components/TableRow/TableRow';

export function createData(
  id: string,
  product: string,
  price: string,
  amount: string,
  total: string,
  date: string,
  history: any
) {
return {
  id,
  product,
  price,
  amount,
  total,
  date,
  history,
};
}

const rows = new Array;

function History() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [state, setState] = useState(false);
  const { count } = useContext(CountContext);
  const product = new Array;
  const price = new Array;
  const amount = new Array;
  const history_data = new Array;

  useEffect(() => {
    if(Number(count) > 0 && !state){
      setState(true);
      for(let x = 0; x < Number(count); x++){
        let local_row = JSON.parse(localStorage.getItem((`compra-${x+1}`)) as string);
        let local_total = JSON.parse(localStorage.getItem((`total-${x+1}`)) as string);
        product.push(Array(local_row.length).fill(local_row).map((item, index) => item[index].product));
        price.push(Array(local_row.length).fill(local_row).map((item, index) => item[index].price));
        amount.push(Array(local_row.length).fill(local_row).map((item, index) => item[index].amount));
        history_data[x] = local_row.map((item:Object, index: number) =>  Object.assign(item, {key: index + 1}) );

        rows[x] = createData(
          (x+1).toString(), 
          product[x].join(', '), 
          price[x].join(', '), 
          amount[x].join(', '), 
          local_total.total, 
          local_total.date,
          history_data[x]
        );
      }
    }
  },[]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    console.log(event);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <div className="title" style={{position:'relative', top:0}}>
      <h1>Historial de Compras</h1>
    </div>
    <div className="styled-button" style={{right:'30px'}}>
      <Tooltip title="Home">
        <Link to={"/"}>&#x1f3e0; Home</Link>
      </Tooltip>
    </div>
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Id</TableCell>
              <TableCell>Productos</TableCell>
              <TableCell align="right">Total&nbsp;($)</TableCell>
              <TableCell align="right">Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <Row key={row.id} row={row} />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
    </>
  )
}

export default History