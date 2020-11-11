import React,{useState,useEffect} from 'react';
import {ListGroup, ListGroupItem, Table} from 'react-bootstrap';

function Sale(props) {
    const [sale,setSale]=useState({});
    const [loading,setLoading]=useState(true);

    function itemTotal(items){
        let amount = 0;
        items.forEach(e => {
            amount += (e.price * e.quantity);
        });
        return amount;
    }
    
    
    useEffect( ()=>{
        fetch(`https://web422assign.herokuapp.com/api/sales/${props.id}`)
        .then(res => res.json())
        .then((data) => {
                if (data._id) {
                    props.viewedSale(data._id);
                    setSale(data);
                }else{
                    setSale({});
                }
                setLoading(false);
            })
        .catch((e)=>console.log("Error"+e));
    },[props.id]);

    if(loading){
        return null; //NOTE: This can be changed to render a <Loading /> Component for a better user experiense
    }else{
        if(sale._id){
            return(
                <div>
                    <h1>Sale: {sale._id}</h1>
                    <h2>Customer</h2>
                    <ListGroup>
                        <ListGroupItem><strong>email:</strong>{sale.customer.email}</ListGroupItem>
                        <ListGroupItem><strong>age:</strong>{sale.customer.age}</ListGroupItem>
                        <ListGroupItem><strong>satisfaction:</strong>{sale.customer.satisfaction} / 5</ListGroupItem>
                    </ListGroup>
                    <h2>Items: ${itemTotal(sale.items).toFixed(2)}</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sale.items.map((item, index)=>(
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            );
        }else{
            return (
                <div>
                    <h1>
                        Unable to find Sale
                    </h1>
                    <p>
                        id: {props.id}
                    </p>
                </div>
            )
        }
    }
}

export default Sale;