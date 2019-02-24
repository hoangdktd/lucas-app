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
    FormDataConsumer,
    SaveButton,
    showNotification 
} from 'react-admin';
import dataProviderFactory from '../dataProvider';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
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
    button: { margin: '1em', width: '120px' },
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

    onChange = event => {
        const changeObject = {};
        changeObject[event.target.name] =  event.target.value;
        this.setState(changeObject);
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
                        this.setState({
                            displayName: user.displayName,
                            email: user.email
                        });
                    });
            }
        );
    }

    handleSubmit = values => {
        const { push, record, showNotification } = this.props;
        const id= localStorage.getItem('id');
        dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER).then(
            dataProvider => {
                dataProvider(UPDATE, 'user', {
                    id: id,
                    data: {
                        displayName: this.state.displayName,
                        email: this.state.email
                    }
                })
                    .then(response => response.data.user)
                    .then(user => {
                        showNotification('Updated Account Profile');
                    }).catch(error => {
                        showNotification(error.message, 'error');
                    });
            }
        );
        const userId= localStorage.getItem('userId');
        if (this.state.oldPassword && this.state.newPassword && this.state.oldPassword !== ''  && this.state.newPassword !== '' ) {
            dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER).then(
                dataProvider => {
                    dataProvider(UPDATE, 'user/change-password', {
                        id: id,
                        data: {
                            userId: userId,
                            password: this.state.oldPassword,
                            newPassword: this.state.newPassword
                        }
                    })
                        .then(response => response.data.user)
                        .then(user => {
                            showNotification('Updated Account Profile');
                        }).catch(error => {
                            showNotification(error.message, 'error');
                        });
                }
            );
        }
    };

    render() {
        const {
            displayName,
            email,
            oldPassword,
            newPassword,
            confirmNewPassword
        } = this.state;
        const { classes, record, translate } = this.props;
        return ( 
            <Fragment>
            <SimpleForm handleSubmit={this.handleSubmit} validate={validateUserUpdate} toolbar={null} form="post-quick-create">
                    <TextInput
                        source="displayName"
                        name="displayName"
                        validate={required()}
                        defaultValue={this.state.displayName}
                        onChange={this.onChange}
                    />
                    <TextInput
                        type="email"
                        source="email"
                        name="email"
                        validation={{ email: true }}
                        validate={required()}
                        defaultValue={this.state.email}
                        onChange={this.onChange}
                    />
                    <TextInput
                        source="oldPassword"
                        name="oldPassword"
                        label="resources.account.fields.oldPassword"
                        type="password"
                        onChange={this.onChange}
                    />
                    <FormDataConsumer >
                        {({ formData, ...rest }) => formData.oldPassword &&
                            <TextInput
                                source="newPassword"
                                name="newPassword"
                                type="password"
                                {...rest}
                                validate={required()}
                                onChange={this.onChange}
                            />
                        }
                    </FormDataConsumer>
                    <FormDataConsumer >
                        {({ formData, ...rest }) => formData.oldPassword &&
                            <TextInput
                                source="confirmNewPassword"
                                name="confirmNewPassword"
                                type="password"
                                {...rest}
                                validate={required()}
                                onChange={this.onChange}
                            />
                        }
                    </FormDataConsumer>
            </SimpleForm>
            <SaveButton
                onClick={this.handleSubmit}
                className={classes.button}
            />
            </Fragment>
        );
    }
}


const mapStateToProps = state => ({
    recordLiveValues: getFormValues('post-quick-create')(state)
});

const enhance = compose(
    translate,
    withStyles(styles),
);

Account.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

// export default connect(mapStateToProps)(enhance(Account));
export default connect(null, {
    showNotification,
    push,
})(enhance(Account));