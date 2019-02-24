// import React from 'react';
// import {
//     translate,
//     Create,
//     Datagrid,
//     DateField,
//     Edit,
//     EditButton,
//     Filter,
//     FormTab,
//     List,
//     NumberInput,
//     Pagination,
//     ReferenceInput,
//     ReferenceManyField,
//     SelectInput,
//     TextField,
//     TextInput,
//     SimpleForm,
//     required,
//     Responsive,
//     SearchInput,
//     DateInput,
//     TabbedForm,
//     regex
// } from 'react-admin';
// import Chip from '@material-ui/core/Chip';
// import withStyles from '@material-ui/core/styles/withStyles';
// import Icon from '@material-ui/icons/Collections';
// import RichTextInput from 'ra-input-rich-text';
// import { userTypeList } from '../utilities/constant';
// import { userTypeRole } from '../utilities/constant';


// export const AccountIcon = Icon;

// const editStyles = {
//     first_name: { display: 'inline-block' },
//     last_name: { display: 'inline-block', marginLeft: 32 },
//     email: { width: 544 },
//     displayName: { width: 544 },
//     address: { maxWidth: 544 },
//     zipcode: { display: 'inline-block' },
//     city: { display: 'inline-block', marginLeft: 32 },
//     comment: {
//         maxWidth: '20em',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         whiteSpace: 'nowrap',
//     },
// };

// export const AccountList = (({ permissions, classes, ...props }) => (
//         <Responsive
//             medium={
//             <Datagrid>
//                 <TextField source="displayName" />
//                 <TextField source="userId" />
//                 <TextField source="email" />
//                 <TextField source="userType" />
//                 <DateField source="createdAt" type="date" />
//                 {permissions === userTypeRole[0] && <EditButton />}
//             </Datagrid>
//             }
//         />
//     </List>
// ));


// export const AccountEdit = withStyles(editStyles)(({ classes, ...props }) => (
//     <Edit {...props}>
//         <TabbedForm>
//             <FormTab label="resources.customers.tabs.identity">
//                 <TextInput
//                     source="displayName"
//                     formClassName={classes.displayName}
//                     validate={required()}
//                 />
//                 <TextInput
//                     type="email"
//                     source="email"
//                     validation={{ email: true }}
//                     fullWidth={true}
//                     formClassName={classes.email}
//                     validate={required()}
//                 />
//                 <DateInput source="birthday" />
//             </FormTab>
//             <FormTab label="resources.account.changePassword" path="address">
//                 <TextInput
//                     source="password"
//                     label="resources.account.fields.oldPassword"
//                     type="password"
//                     validate={required()}
//                 />
//             </FormTab>
//         </TabbedForm>
//     </Edit>
// ));




import React, { Component, Fragment } from 'react';
// import { GET_LIST, GET_MANY, Responsive, Title, GET_ } from 'react-admin';
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    DELETE_MANY,
    fetchUtils,
} from 'admin-on-rest';
import {
    translate,
    Create,
    Datagrid,
    DateField,
    Edit,
    EditButton,
    Filter,
    FormTab,
    fetchEnd,
    fetchStart,
    required,
    SimpleForm,
    LongTextInput,
    REDUX_FORM_NAME,
    TextInput,
    Responsive,
    SearchInput,
    DateInput,
    TabbedForm,
    regex,
    showNotification,
    FormDataConsumer,
    SaveButton
} from 'react-admin';
import dataProviderFactory from '../dataProvider';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { changeLocale, Title } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import { change, submit, isSubmitting } from 'redux-form';
import { getFormValues } from 'redux-form';

const styles = {
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em', width: '40px' },
};

const validateUserUpdate = (values) => {
    const errors = {};
    if (!values.displayName) {
        errors.displayName = 'Required';
    }
    if (!values.email) {
        errors.email = 'Required';
    }
    if (!values.confirmNewPassword ) {
        errors.confirmNewPassword = 'Required' ;
    } else if (values.confirmNewPassword !== values.newPassword) {
        errors.confirmNewPassword = 'Password mismatched' ;
    }
    return errors
};

class Account extends Component {
    state = {};
    constructor(props) {
        super();
        this.state = {
            displayName: '',
            email: '',
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        };
    }

    componentDidMount() {
        const id= localStorage.getItem('id');

        dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER).then(
            dataProvider => {

                dataProvider(GET_ONE, 'user', {
                    id: id
                })
                    .then(response => response.data)
                    .then(user => {
                        console.log('user');
                        console.log(user);
                        this.setState({
                            displayName: user.displayName,
                            email: user.email
                        });
                    });
            }
        );
    }

    handleSubmit = values => {
        console.log(values);
        console.log(this.state);
        console.log(this.props);
        const id= localStorage.getItem('id');
        dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER).then(
            dataProvider => {
                dataProvider(UPDATE, 'user', {
                    id: id,
                    data: {
                        displayName: this.state.displayName,
                        email: this.state.email,
                        oldPassword: this.state.oldPassword,
                        newPassword: this.state.newPassword
                    }
                })
                    .then(response => response.data.user)
                    .then(user => {
                        console.log('user');
                    });
            }
        );
    };

    render() {
        const {
            displayName,
            email,
            oldPassword,
            newPassword,
            confirmNewPassword
        } = this.state;
        return ( 
            <Fragment>
            <SimpleForm handleSubmit={this.handleSubmit} validate={validateUserUpdate} toolbar={null} form="post-quick-create">
                    <TextInput
                        source="displayName"
                        validate={required()}
                        defaultValue={this.state.displayName}
                    />
                    <TextInput
                        type="email"
                        source="email"
                        validation={{ email: true }}
                        validate={required()}
                        defaultValue={this.state.email}
                    />
                    <TextInput
                        source="oldPassword"
                        label="resources.account.fields.oldPassword"
                        type="password"
                    />
                    <FormDataConsumer >
                        {({ formData, ...rest }) => formData.oldPassword &&
                            <TextInput
                                source="newPassword"
                                type="password"
                                {...rest}
                                validate={required()}
                            />
                        }
                    </FormDataConsumer>
                    <FormDataConsumer >
                        {({ formData, ...rest }) => formData.oldPassword &&
                            <TextInput
                                source="confirmNewPassword"
                                type="password"
                                {...rest}
                                validate={required()}
                            />
                        }
                    </FormDataConsumer>
            </SimpleForm>
            <SaveButton
                onClick={this.handleSubmit}
                width={'80'}
            />
            </Fragment>
        );
    }
}


const mapStateToProps = state => ({
    recordLiveValues: getFormValues('post-quick-create')(state)
});

export default connect(mapStateToProps)(Account);