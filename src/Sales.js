import React ,{useEffect,useState}from 'react';
import { withRouter } from 'react-router-dom';
import {Table, Pagination} from 'react-bootstrap';

function Sales(props) {
  const[sales,setSale]=useState([]);
  const[currentPage,setCurrentPage]=useState(1);
  

  useEffect(()=>{
    {
      fetch(`https://web422assign.herokuapp.com/api/sales?page=${currentPage}&perPage=10`)
      .then(res => res.json()) 
      .then(obj => { 
        setSale(obj);  
      })
      .catch((e)=>console.log(e))
    }
  },[currentPage])
 
  function priviousPage(){
   if(currentPage>1){
    setCurrentPage(currentPage -1 );
   }
  }
  function nextPage(){
    setCurrentPage(currentPage + 1);  
  }
  //console.log();
  //setSale();

  if(sales.length>0)
  {
    return(
      <>
        <div><h1>Sales</h1></div>
            <div>
              <Table  hover>
                <thead>
                  <tr>
                    <td>Customer</td>
                    <td>Store Location</td>
                    <td>Number of Items</td>
                    <td>Sale Date</td>
                  </tr>
                </thead>
                <tbody>
                 {sales.map((sale)=>(
                   <tr key={sale._id} onClick={()=>{props.history.push(`/Sale/${sale._id}`)}}>
                     <td>{sale.customer.email}</td>
                     <td>{sale.storeLocation}</td>
                     <td>{sale.items.length}</td>
                     <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                   </tr>
                 ))}
                </tbody>
              </Table>
              <Pagination>
                 <Pagination.Prev onClick={priviousPage}/>
                 <Pagination.Item>{currentPage}</Pagination.Item>
                 <Pagination.Next onClick={nextPage}/>
              </Pagination>
            </div>
            </>
    )
  } 
  else{
    return (
      null
    );
  }
  
}

export default withRouter(Sales);