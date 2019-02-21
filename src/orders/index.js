import React from 'react';
import {
    translate,
    Create,
    Datagrid,
    DateField,
    Edit,
    EditButton,
    Filter,
    FormTab,
    List,
    NumberInput,
    ReferenceInput,
    SelectInput,
    TextField,
    TextInput,
    SimpleForm,
    required,
    Responsive,
    SearchInput,
    DateInput,
    TabbedForm,
    Pagination,
    AutocompleteInput,
    DisabledInput,
    NumberField
} from 'react-admin';
import { FormDataConsumer } from 'react-admin';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/AttachMoney';
import RichTextInput from 'ra-input-rich-text';
import { orderStatusEnum } from '../utilities/constant';
import { typeDesignerEnum } from '../utilities/constant';
import { paymentStatusEnum } from '../utilities/constant';
import { userTypeRole } from '../utilities/constant';
// import CustomerReferenceField from '../visitors/CustomerReferenceField';
// import StarRatingField from '../reviews/StarRatingField';
// import GridList from './GridList';
// import Poster from './Poster';

export const OrderIcon = Icon;

const quickFilterStyles = {
    root: {
        marginBottom: '0.7em',
    },
};

const QuickFilter = translate(
    withStyles(quickFilterStyles)(({ classes, label, translate }) => (
        <Chip className={classes.root} label={translate(label)} />
    ))
);

export const OrderFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <SearchInput source="customerIdentity" label="resources.order.fields.customer_id"/>
        <SearchInput source="idPackage" label="resources.order.fields.idPackage"/>
        <SearchInput
            label="resources.order.fields.infoOrderLink"
            source="infoOrderLink"
        />
        <DateInput source="startDate" />
        <DateInput source="endDate" />
    </Filter>
);


const listStyles = {
    nb_commands: { color: 'purple' },
};
const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
export const OrderList = withStyles(listStyles)(({ classes, ...props }) => (
    <List
        {...props}
        filters={<OrderFilter />}
        sort={{ field: 'updatedAt', order: 'DESC' }}
        perPage= {25}
        pagination={<PostPagination />}
    >
        <Responsive
            medium={
                <Datagrid>
                <TextField source="customerIdentity" />
                <TextField source="saleId" />
                <TextField source="channel" />
                <NumberField source="priceOrder" options={{ style: 'currency', currency: 'VND' }}/>
                <TextField source="infoOrderLink" />
                <TextField source="typeDesigner" />
                <TextField source="idPackage" />
                <TextField source="packageOrder" />
                <DateField source="createDate" type="date" />
                <EditButton />
            </Datagrid>
            }
        />
    </List>
));

const editStyles = {
    first_name: { display: 'inline-block' },
    last_name: { display: 'inline-block', marginLeft: 32 },
    fullWidth: { maxWidth: 544 },
    hidden: {overflow: 'hidden'},
};
const userID= localStorage.getItem('id');
const user_ID= localStorage.getItem('userId');
const postDefaultValue = { saleId: userID };
export const OrderCreate = withStyles(editStyles)(({ classes, ...props }) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.order.createOrder" formClassName={classes.fullWidth} defaultValue={postDefaultValue}>
                <ReferenceInput
                    source="customerIdentity"
                    reference="customers"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    validate={required()}
                >
                    <AutocompleteInput
                        fullWidth={true}
                        formClassName={classes.fullWidth}
                        optionText={choice =>
                            `${choice.customerIdentity}`
                        }
                        options={{
                            fullWidth: true,
                        }}
                    />
                </ReferenceInput>
                <ReferenceInput
                    source="saleId"
                    reference="user"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    validate={required()}
                    value={userID}
                    defaultValue= {userID}
                >
                    <AutocompleteInput
                        defaultValue= {userID}
                        fullWidth={true}
                        formClassName={classes.fullWidth}
                        optionText={choice =>
                            `${choice.userId}`
                        }
                        options={{
                            fullWidth: true,
                        }}
                        value={userID}
                    />
                </ReferenceInput>
                {/* <DisabledInput
                    source="saleId"
                    label="Sale ID"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    defaultValue= {userID}
                    disable= {true}
                    validate={required()}
                    hidden={true}
                /> */}
                <TextInput
                    source="channel"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                />
                <DateInput
                    source="createDate"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    defaultValue={new Date()}
                    validate={required()}
                />
                <DateInput
                    source="finishedDate"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                />
                <NumberInput
                    source="priceOrder"
                    validate={required()}
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    
                />
                <TextInput
                    source="note"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                />
                <TextInput
                    source="infoOrderLink"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    validate={required()}
                />
                <TextInput
                    source="backupOrderLink"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                />
                <SelectInput
                    source="status"
                    choices={[
                        {id: orderStatusEnum[0], name: orderStatusEnum[0]},
                        {id: orderStatusEnum[1], name: orderStatusEnum[1]},
                        {id: orderStatusEnum[2], name: orderStatusEnum[2]},
                    ]}
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    translateChoice={true}
                    validate={required()}
                />
                <SelectInput
                    source="paymentStatus"
                    choices={[
                        {id: paymentStatusEnum[0], name: paymentStatusEnum[0]},
                        {id: paymentStatusEnum[1], name: paymentStatusEnum[1]},
                    ]}
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    translateChoice={true}
                    validate={required()}
                />

                <SelectInput
                    source="typeDesigner"
                    choices={[
                        {id: typeDesignerEnum[0], name: typeDesignerEnum[0]},
                        {id: typeDesignerEnum[1], name: typeDesignerEnum[1]},
                    ]}
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    translateChoice={true}
                    validate={required()}
                />
                <ReferenceInput
                    source="designerId"
                    reference="user"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                >
                    <AutocompleteInput
                        fullWidth={true}
                        formClassName={classes.fullWidth}
                        optionText={choice =>
                            `${choice.userId}`
                        }
                        options={{
                            fullWidth: true,
                        }}
                    />
                </ReferenceInput>

                <TextInput
                    source="idPackage"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                />
                <FormDataConsumer 
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                >
                    {({ formData, ...rest }) => formData.idPackage &&
                        <NumberInput
                            source="numberPackage"
                            fullWidth={true}
                            formClassName={classes.fullWidth}
                            {...rest}
                            validate={required()}
                        />
                    }
                </FormDataConsumer>
            </FormTab>
        </TabbedForm>
    </Create>
));


export const OrderEdit = withStyles(editStyles)(({ classes, ...props }) => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="resources.order.editOrder">
                <ReferenceInput
                    source="customerIdentity"
                    reference="customers"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    validate={required()}
                >
                    <AutocompleteInput
                        fullWidth={true}
                        formClassName={classes.fullWidth}
                        optionText={choice =>
                            `${choice.customerIdentity}`
                        }
                        options={{
                            fullWidth: true,
                        }}
                    />
                </ReferenceInput>
                <ReferenceInput
                    source="saleId"
                    reference="user"
                    filter={{ userRole: userTypeRole[1] }}
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    validate={required()}
                >
                    <AutocompleteInput
                        fullWidth={true}
                        formClassName={classes.fullWidth}
                        optionText={choice =>
                            `${choice.userId}`
                        }
                        options={{
                            fullWidth: true,
                        }}
                    />
                </ReferenceInput>
                <TextInput
                    source="channel"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                />
                <DateInput
                    source="createDate"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    defaultValue={new Date()}
                    validate={required()}
                />
                <DateInput
                source="finishedDate"
                fullWidth={true}
                formClassName={classes.fullWidth}
                />
                <NumberInput
                    source="priceOrder"
                    validate={required()}
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                />
                <TextInput
                    source="note"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                />
                <TextInput
                    source="infoOrderLink"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    validate={required()}
                />
                <TextInput
                    source="backupOrderLink"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                />
                <SelectInput
                    source="status"
                    choices={[
                        {id: orderStatusEnum[0], name: orderStatusEnum[0]},
                        {id: orderStatusEnum[1], name: orderStatusEnum[1]},
                        {id: orderStatusEnum[2], name: orderStatusEnum[2]},
                        {id: orderStatusEnum[3], name: orderStatusEnum[3]},
                    ]}
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    translateChoice={true}
                    validate={required()}
                />
                <SelectInput
                    source="paymentStatus"
                    choices={[
                        {id: paymentStatusEnum[0], name: paymentStatusEnum[0]},
                        {id: paymentStatusEnum[1], name: paymentStatusEnum[1]},
                    ]}
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    translateChoice={true}
                    validate={required()}
                />
                <SelectInput
                    source="typeDesigner"
                    choices={[
                        {id: typeDesignerEnum[0], name: typeDesignerEnum[0]},
                        {id: typeDesignerEnum[1], name: typeDesignerEnum[1]},
                    ]}
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                    translateChoice={true}
                    validate={required()}
                />
                <ReferenceInput
                    source="designerId"
                    reference="user"
                    fullWidth={true}
                    formClassName={classes.fullWidth}
                >
                    <AutocompleteInput
                        fullWidth={true}
                        formClassName={classes.fullWidth}
                        optionText={choice =>
                            `${choice.userId}`
                        }
                        options={{
                            fullWidth: true,
                        }}
                    />
                </ReferenceInput>
            </FormTab>
        </TabbedForm>
    </Edit>
));