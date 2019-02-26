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
    Pagination,
    ReferenceInput,
    ReferenceManyField,
    SelectInput,
    TextField,
    TextInput,
    SimpleForm,
    required,
    Responsive,
    SearchInput,
    DateInput,
    TabbedForm,
    regex
} from 'react-admin';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/Collections';
import RichTextInput from 'ra-input-rich-text';
import { userTypeList } from '../utilities/constant';
import { userTypeRole } from '../utilities/constant';
// import CustomerReferenceField from '../visitors/CustomerReferenceField';
// import StarRatingField from '../reviews/StarRatingField';
import GridList from './GridList';
// import Poster from './Poster';
import FullNameField from './FullNameField';

export const UserIcon = Icon;

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

export const UserFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <SearchInput source="id" label="resources.user.fields.id"/>
        <SearchInput
            label="resources.user.fields.username"
            source="displayName"
        />
    </Filter>
);

// export const UserList = props => (
//     <List
//         {...props}
//         filters={<UserFilter />}
//         perPage={20}
//         sort={{ field: 'id', order: 'ASC' }}
//     >
//         <GridList />
//     </List>
// );


const listStyles = {
    nb_commands: { color: 'purple' },
};
const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
export const UserList = withStyles(listStyles)(({ permissions, classes, ...props }) => (
    <List
        {...props}
        filters={<UserFilter />}
        sort={{ field: 'displayName', order: 'DESC' }}
        pagination={<PostPagination />}
    >
        <Responsive
            medium={
            <Datagrid>
                <TextField source="displayName" />
                <TextField source="id" />
                <TextField source="email" />
                <TextField source="userType" />
                <DateField source="createdAt" type="date" />
                {permissions === userTypeRole[0] && <EditButton />}
            </Datagrid>
            }
        />
    </List>
));

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

export const UserCreate = withStyles(editStyles)(({ classes, ...props }) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.customers.tabs.identity">
                <TextInput
                    source="displayName"
                    formClassName={classes.displayName}
                    validate={required()}
                />
                <TextInput
                    source="id"
                    label="User ID"
                    validate={required()}
                />
                <SelectInput
                    source="userRole"
                    choices={[
                        {id: 0, name: userTypeList[0]},
                        {id: 1, name: userTypeList[1]},
                        {id: 2, name: userTypeList[2]},
                        {id: 3, name: userTypeList[3]}
                    ]}
                    translateChoice={true}
                    validate={required()}
                />
                <TextInput
                    source="password"
                    label="resources.user.fields.userPassword"
                    type="password"
                    validate={required()}
                />
                <TextInput
                    type="email"
                    source="email"
                    validation={{ email: true }}
                    fullWidth={true}
                    formClassName={classes.email}
                />
                {/* <DateInput source="createdAt" /> */}
            </FormTab>
            {/* <FormTab label="resources.customers.tabs.address" path="address">
                <LongTextInput
                    source="address"
                    formClassName={classes.address}
                />
            </FormTab> */}
        </TabbedForm>
    </Create>
));

const VisitorTitle = ({ record }) =>
record ? <FullNameField record={record} size={32} /> : null;

export const UserEdit = withStyles(editStyles)(({ classes, ...props }) => (
    <Edit title={<VisitorTitle />} {...props}>
        <TabbedForm>
            <FormTab label="resources.customers.tabs.identity">
                <TextInput
                    source="displayName"
                    formClassName={classes.displayName}
                    validate={required()}
                />
                <TextInput
                    source="id"
                    label="User ID"
                    validate={required()}
                />
                <SelectInput
                    source="userRole"
                    choices={[
                        {id: 0, name: userTypeList[0]},
                        {id: 1, name: userTypeList[1]},
                        {id: 2, name: userTypeList[2]},
                        {id: 3, name: userTypeList[3]}
                    ]}
                    translateChoice={true}
                    validate={required()}
                />
                <TextInput
                    type="email"
                    source="email"
                    validation={{ email: true }}
                    fullWidth={true}
                    formClassName={classes.email}
                />
                {/* <DateInput source="birthday" /> */}
            </FormTab>
            {/* <FormTab label="resources.customers.tabs.address" path="address">
                <LongTextInput
                    source="address"
                    formClassName={classes.address}
                />
            </FormTab> */}
        </TabbedForm>
    </Edit>
));