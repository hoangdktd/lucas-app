import React from 'react';
import {
    BooleanField,
    Create,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    EditButton,
    Filter,
    FormTab,
    List,
    LongTextInput,
    NullableBooleanInput,
    NumberField,
    ReferenceManyField,
    Responsive,
    SearchInput,
    TabbedForm,
    TextField,
    TextInput,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/Person';

import NbItemsField from '../commands/NbItemsField';
import ProductReferenceField from '../products/ProductReferenceField';
import StarRatingField from '../reviews/StarRatingField';
import FullNameField from './FullNameField';
import SegmentsField from './SegmentsField';
import SegmentInput from './SegmentInput';
import SegmentsInput from './SegmentsInput';
import CustomerLinkField from './CustomerLinkField';
import MobileGrid from './MobileGrid';

export const VisitorIcon = Icon;

const VisitorFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <SearchInput source="displayName" />
        <SearchInput source="customerIdentity" />
    </Filter>
);

const colored = WrappedComponent => {
    const Colored = props =>
        props.record[props.source] > 500 ? (
            <span style={{ color: 'red' }}>
                <WrappedComponent {...props} />
            </span>
        ) : (
            <WrappedComponent {...props} />
        );

    Colored.displayName = `Colored(${WrappedComponent.displayName})`;

    return Colored;
};

export const ColoredNumberField = colored(NumberField);
ColoredNumberField.defaultProps = NumberField.defaultProps;

const listStyles = {
    nb_commands: { color: 'purple' },
};

export const VisitorList = withStyles(listStyles)(({ classes, ...props }) => (
    <List
        {...props}
        filters={<VisitorFilter />}
        sort={{ field: 'displayName', order: 'DESC' }}
        perPage={25}
    >
        <Responsive
            medium={
                <Datagrid>
                <TextField source="displayName" />
                <TextField source="customerIdentity" />
                <TextField source="address" />
                <DateField source="birthday" type="date" />
                <ColoredNumberField source="totalSpent" />
                <EditButton />
            </Datagrid>
            }
        />
    </List>
));

const VisitorTitle = ({ record }) =>
    record ? <FullNameField record={record} size={32} /> : null;

const editStyles = {
    first_name: { display: 'inline-block' },
    last_name: { display: 'inline-block', marginLeft: 32 },
    email: { width: 544 },
    displayName: { width: 544 },
    address: { maxWidth: 544 },
    zipcode: { display: 'inline-block' },
    city: { display: 'inline-block', marginLeft: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

export const VisitorEdit = withStyles(editStyles)(({ classes, ...props }) => (
    <Edit title={<VisitorTitle />} {...props}>
        <TabbedForm>
            <FormTab label="resources.customers.tabs.identity">
                <TextInput
                    source="displayName"
                    formClassName={classes.displayName}
                />
                <TextInput
                    source="customerIdentity"
                />
                <TextInput
                    type="email"
                    source="email"
                    validation={{ email: true }}
                    fullWidth={true}
                    formClassName={classes.email}
                />
                <DateInput source="birthday" />
            </FormTab>
            <FormTab label="resources.customers.tabs.address" path="address">
                <LongTextInput
                    source="address"
                    formClassName={classes.address}
                />
                {/* <TextInput source="zipcode" formClassName={classes.zipcode} />
                <TextInput source="city" formClassName={classes.city} /> */}
            </FormTab>
            {/* <FormTab label="resources.customers.tabs.orders" path="orders">
                <ReferenceManyField
                    addLabel={false}
                    sort={{ field: 'date', order: 'DESC' }}
                    reference="commands"
                    target="customer_id"
                >
                    <Datagrid>
                        <DateField source="date" />
                        <TextField source="reference" />
                        <NbItemsField />
                        <NumberField
                            source="total"
                            options={{ style: 'currency', currency: 'USD' }}
                        />
                        <TextField source="status" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
            <FormTab label="resources.customers.tabs.reviews" path="reviews">
                <ReferenceManyField
                    addLabel={false}
                    sort={{ field: 'date', order: 'DESC' }}
                    reference="reviews"
                    target="customer_id"
                >
                    <Datagrid filter={{ status: 'approved' }}>
                        <DateField source="date" />
                        <ProductReferenceField />
                        <StarRatingField />
                        <TextField
                            source="comment"
                            cellClassName={classes.comment}
                        />
                        <EditButton style={{ padding: 0 }} />
                    </Datagrid>
                </ReferenceManyField>
            </FormTab> */}
            {/* <FormTab label="resources.customers.tabs.stats" path="stats">
                <NullableBooleanInput source="has_newsletter" />
                <DateField
                    source="first_seen"
                    style={{ width: 128, display: 'inline-block' }}
                />
                <DateField
                    source="latest_purchase"
                    style={{ width: 128, display: 'inline-block' }}
                />
                <DateField
                    source="last_seen"
                    style={{ width: 128, display: 'inline-block' }}
                />
            </FormTab> */}
        </TabbedForm>
    </Edit>
));

export const VisitorCreate = withStyles(editStyles)(({ classes, ...props }) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.customers.tabs.identity">
                <TextInput
                    source="displayName"
                    formClassName={classes.displayName}
                />
                <TextInput
                    source="customerIdentity"
                />
                <TextInput
                    type="email"
                    source="email"
                    validation={{ email: true }}
                    fullWidth={true}
                    formClassName={classes.email}
                />
                <DateInput source="birthday" />
            </FormTab>
            <FormTab label="resources.customers.tabs.address" path="address">
                <LongTextInput
                    source="address"
                    formClassName={classes.address}
                />
            </FormTab>
        </TabbedForm>
    </Create>
));
