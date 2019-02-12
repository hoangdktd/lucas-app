// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import classnames from 'classnames';
// import {
//     Datagrid,
//     Create,
//     Edit,
//     EditButton,
//     List,
//     NumberField,
//     ReferenceManyField,
//     SimpleForm,
//     TextField,
//     TextInput,
// } from 'react-admin';

// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import { Link, translate, crudGetMany as crudGetManyAction } from 'react-admin';
// import compose from 'recompose/compose';
// import withStyles from '@material-ui/core/styles/withStyles';

// const styles = {
//     container: { width: '35em' },
//     rightAlignedCell: { textAlign: 'right' },
//     boldCell: { fontWeight: 'bold' },
// };

// class BasketEdit extends Component {
//     componentDidMount() {
//         this.fetchData();
//     }
//     fetchData() {
//         const {
//             record: { basket },
//             crudGetMany,
//         } = this.props;
//         // crudGetMany('products', basket.map(item => item.product_id));
//     }
//     render() {
//         const { classes, products, translate } = this.props;
//         const record ={basket: [{
//             product_id: 1,
//             quantity: 2
//         }, {
//             product_id: 2,
//             quantity: 1
//         }]};
//         const { basket } = record;
//         console.log(basket);
//         basket.map(item => {
//             console.log(item);
//             console.log(item.product_id);
//           });
//         return (
            
//             <Paper className={classes.container}>
//                 <SimpleForm>
//                     <TextInput source="name" />
//                 </SimpleForm>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>
//                                 {translate(
//                                     'resources.commands.fields.basket.reference'
//                                 )}
//                             </TableCell>
//                             <TableCell className={classes.rightAlignedCell}>
//                                 {translate(
//                                     'resources.commands.fields.basket.unit_price'
//                                 )}
//                             </TableCell>
//                             <TableCell className={classes.rightAlignedCell}>
//                                 {translate(
//                                     'resources.commands.fields.basket.quantity'
//                                 )}
//                             </TableCell>
//                             <TableCell className={classes.rightAlignedCell}>
//                                 {translate(
//                                     'resources.commands.fields.basket.total'
//                                 )}
//                             </TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {/* {basket.map(
//                             item =>
//                                 products[item.product_id] && (
//                                     <TableRow key={item.product_id}>
//                                         <TableCell>
//                                             <Link
//                                                 to={`/products/${
//                                                     item.product_id
//                                                 }`}
//                                             >
//                                                 {
//                                                     products[item.product_id]
//                                                         .reference
//                                                 }
//                                             </Link>
//                                         </TableCell>
//                                         <TableCell
//                                             className={classes.rightAlignedCell}
//                                         >
//                                             {products[
//                                                 item.product_id
//                                             ].price.toLocaleString(undefined, {
//                                                 style: 'currency',
//                                                 currency: 'USD',
//                                             })}
//                                         </TableCell>
//                                         <TableCell
//                                             className={classes.rightAlignedCell}
//                                         >
//                                             {item.quantity}
//                                         </TableCell>
//                                         <TableCell
//                                             className={classes.rightAlignedCell}
//                                         >
//                                             {(
//                                                 products[item.product_id]
//                                                     .price * item.quantity
//                                             ).toLocaleString(undefined, {
//                                                 style: 'currency',
//                                                 currency: 'USD',
//                                             })}
//                                         </TableCell>
//                                     </TableRow>
//                                 )
//                         )} */}
//                         <TableRow>
//                             <TableCell colSpan={2} />
//                             <TableCell>
//                                 {translate(
//                                     'resources.commands.fields.basket.sum'
//                                 )}
//                             </TableCell>
//                             <TableCell className={classes.rightAlignedCell}>
//                                 {/* {record.total_ex_taxes.toLocaleString(
//                                     undefined,
//                                     { style: 'currency', currency: 'USD' }
//                                 )} */}
//                             </TableCell>
//                         </TableRow>
//                         <TableRow>
//                             <TableCell colSpan={2} />
//                             <TableCell>
//                                 {translate(
//                                     'resources.commands.fields.basket.delivery'
//                                 )}
//                             </TableCell>
//                             <TableCell className={classes.rightAlignedCell}>
//                                 {/* {record.delivery_fees.toLocaleString(
//                                     undefined,
//                                     { style: 'currency', currency: 'USD' }
//                                 )} */}
//                             </TableCell>
//                         </TableRow>
//                         <TableRow>
//                             <TableCell colSpan={2} />
//                             <TableCell>
//                                 {translate(
//                                     'resources.commands.fields.basket.tax_rate'
//                                 )}
//                             </TableCell>
//                             <TableCell className={classes.rightAlignedCell}>
//                                 {/* {record.tax_rate.toLocaleString(undefined, {
//                                     style: 'percent',
//                                 })} */}
//                             </TableCell>
//                         </TableRow>
//                         <TableRow>
//                             <TableCell colSpan={2} />
//                             <TableCell className={classes.boldCell}>
//                                 {translate(
//                                     'resources.commands.fields.basket.total'
//                                 )}
//                             </TableCell>
//                             <TableCell
//                                 className={classnames(
//                                     classes.boldCell,
//                                     classes.rightAlignedCell
//                                 )}
//                             >
//                                 {/* {record.total.toLocaleString(undefined, {
//                                     style: 'currency',
//                                     currency: 'USD',
//                                 })} */}
//                             </TableCell>
//                         </TableRow>
//                     </TableBody>
//                 </Table>
//             </Paper>
//         );
//     }
// }

// const mapStateToProps = (state, props) => {
//     console.log(props);
//     const {
//         record: { basket },
//     } = props;
//     console.log(basket);
//     if(basket){
//         const productIds = basket.map(item => item.product_id);
//         console.log(state.admin.resources.products);
//         return {
//             products: productIds
//                 .map(productId => state.admin.resources.products.data[productId])
//                 .filter(r => typeof r !== 'undefined')
//                 .reduce((prev, next) => {
//                     prev[next.id] = next;
//                     return prev;
//                 }, {}),
//         };
//     } else {
//         return;
//     }
// };

// const enhance = compose(
//     translate,
//     withStyles(styles),
//     connect(
//         mapStateToProps,
//         {
//             crudGetMany: crudGetManyAction,
//         }
//     )
// );

// export default enhance(BasketEdit);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link, translate, crudGetMany as crudGetManyAction } from 'react-admin';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import {
    Datagrid,
    Create,
    Edit,
    EditButton,
    List,
    NumberField,
    ReferenceInput,
    ReferenceManyField,
    SearchInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
    NumberInput,
    Toolbar
} from 'react-admin';

const styles = {
    container: { width: '35em' },
    rightAlignedCell: { textAlign: 'right' },
    boldCell: { fontWeight: 'bold' },
};


class BasketEdit extends Component {
    constructor() {
        super();
        this.state = {
            product_id: '',
            quantity: 0,
            productName: '',
            link: '',
            price: 0,
            basket: []
        }
    };

    handleFormSubmit = (e) => {
        e.preventDefault();

        let basket = [...this.state.basket];

        basket.push({
            product_id: this.state.product_id, 
            productName: this.state.productName, 
            link: this.state.link, 
            price: this.state.price, 
            quantity: this.state.quantity
        });

        this.setState({
            basket,
            product_id: '',
            productName: '',
            link: '',
            quantity: 0,
            price: 0
        });
        console.log(this.state.basket)
    };

    handleInputChange = (e) => {
//         let input = e.target;
//         let id = e.target.id;
//         let value = input.value;
// console.log(id);
//         this.setState({
//             [id]: value
//         })
    };

    handleSaveClick = (e) => {
        e.preventDefault();

        let basket = [...this.state.basket];

        basket.push({
            product_id: this.state.product_id, 
            productName: this.state.productName, 
            link: this.state.link, 
            price: this.state.price, 
            quantity: this.state.quantity
        });

        this.setState({
            basket,
            product_id: '',
            productName: '',
            link: '',
            quantity: 0,
            price: 0
        });
        console.log(this.state.basket)
    };
    handleQuantityChange = (event, value) => {
        this.setState({
            quantity: value
        })
    };
    handleProductIdChange = (event, value) => {
        this.setState({
            product_id: value
        })
    };
    handleProductNameChange = (event, value) => {
        this.setState({
            productName: value
        })
    };
    handleLinkChange = (event, value) => {
        this.setState({
            link: value
        })
    };
    handlePriceChange= (event, value) => {
        this.setState({
            price: value
        })
    };
    render() {
        const { classes, record, translate } = this.props;
        
        // const product_id = this.state.product_id;
        // const quantity = this.state.quantity;
        const basket = this.state.basket;
        // const link = this.state.link;
        // const price = this.state.price;
        // const productName = this.state.productName;
        let total = 0;
        basket.map(item => {
            total = total + (item.quantity * item.price);
        });
        return (
            <Paper className={classes.container}>
                {/* <ProductForm
                    translate = {translate}
                    handleFormSubmit={ this.handleFormSubmit } 
                    handleInputChange={ this.handleInputChange } 
                    newProduct_id={ this.state.product_id } 
                    newQuantity={ this.state.quantity }
                    newLink={ this.state.link }
                    newPrice={ this.state.price }
                    newProductName={ this.state.productName }
                /> */}
                <SimpleForm>
                    <ReferenceInput
                        source="product_id"
                        reference="products"
                        label="resources.products.fields.product"
                        name="product_id"
                        onChange={this.handleProductIdChange}
                    >
                        <SelectInput source="name" />
                    </ReferenceInput>
                    <TextInput
                        source="product_id"
                        label="resources.products.fields.product"
                        name="product_id"
                        onChange={this.handleProductIdChange}
                    />
                    <TextInput
                        source="productName"
                        name="productName"
                        label={translate('pos.order.product_name')}
                        onChange={this.handleProductNameChange}
                    />
                    <TextInput
                        source="link"
                        name="link"
                        label={translate('pos.order.link')}
                        onChange={this.handleLinkChange}
                    />
                    <NumberInput 
                        label={translate('pos.order.price')}
                        source="price" 
                        name="price"
                        onChange={this.handlePriceChange}
                    />
                    <NumberInput 
                        label={translate('pos.order.quantity')}
                        source="quantity" 
                        name="quantity"
                        onChange={this.handleQuantityChange}
                    />
                </SimpleForm>
                <Button
                    size="small"
                    color="primary"
                    redirect="products"
                    submitOnEnter={true}
                    onClick={(e) => this.handleSaveClick(e)}
                >
                {translate('pos.order.add_product')}
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {translate(
                                    'pos.order.product_name'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {translate(
                                    'resources.commands.fields.basket.unit_price'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {translate(
                                    'resources.commands.fields.basket.quantity'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {translate(
                                    'resources.commands.fields.basket.total'
                                )}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.map(
                            item => (
                                <TableRow key={item.product_id}>
                                    <TableCell>
                                        {item.productName}
                                    </TableCell>
                                    <TableCell
                                        className={classes.rightAlignedCell}
                                    >
                                        {item.price.toLocaleString(
                                            undefined,
                                            { style: 'currency', currency: 'VND' }
                                        )}
                                    </TableCell>
                                    <TableCell
                                        className={classes.rightAlignedCell}
                                    >
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell
                                        className={classes.rightAlignedCell}
                                    >
                                        {(item.price * item.quantity).toLocaleString(
                                            undefined,
                                            { style: 'currency', currency: 'VND' }
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                        <TableRow>
                            <TableCell colSpan={2} />
                            <TableCell className={classes.boldCell}>
                                {translate(
                                    'resources.commands.fields.basket.total'
                                )}
                            </TableCell>
                            <TableCell
                                className={classnames(
                                    classes.boldCell,
                                    classes.rightAlignedCell
                                )}
                            >
                                {total.toLocaleString(
                                    undefined,
                                    { style: 'currency', currency: 'VND' }
                                )}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

const enhance = compose(
    translate,
    withStyles(styles),
);

export default enhance(BasketEdit);


class ProductForm extends React.Component {
    render() {
        return (
        <SimpleForm>
            {/* <ReferenceInput
                source="product_id"
                reference="products"
                label="resources.products.fields.product"
                name="product_id"
                onChange={this.handleProductIdChange}
            >
                <SelectInput source="name" />
            </ReferenceInput> */}
            <TextInput
                value={this.props.newProduct_id}
                label="resources.products.fields.product"
                id="product_id"
                onChange={this.props.handleInputChange}
            />
            <TextInput
                value={this.props.newProductName}
                id="productName"
                label="pos.order.product_name"
                onChange={this.props.handleInputChange}
            />
            <TextInput
                value={this.props.newLink}
                id="link"
                label="pos.order.link"
                onChange={this.props.handleInputChange}
            />
            <NumberInput 
                label="pos.order.price"
                value={this.props.newPrice}
                id="price"
                onChange={this.props.handleInputChange}
            />
            <NumberInput 
                label="pos.order.quantity"
                value={this.props.newQuantity}
                id="quantity"
                onChange={this.props.handleInputChange}
            />
        </SimpleForm>
        )
    }
  }
