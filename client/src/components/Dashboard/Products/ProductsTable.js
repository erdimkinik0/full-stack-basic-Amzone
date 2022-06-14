import "../../../css/products.css"

const ProductsTable = (props) => {


    return (
        <div className="">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                   {

                        props.data &&
                            props.data.map((item) => {
                                return <tr>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td></td>
                                    </tr>

                            })
                            

                   }
                    <tr className="active-row">
                        <td>Melissa</td>
                        <td>5150</td>
                    </tr>
                   
                </tbody>
            </table>


        </div>
    )

}

export default ProductsTable;