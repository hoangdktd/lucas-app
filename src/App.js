import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import { ListGuesser } from 'react-admin';
import logo from './logo.svg';
import './App.css';

import authProvider from './authProvider';
import sagas from './sagas';
import themeReducer from './themeReducer';
import Login from './Login';
import Layout from './Layout';
import Menu from './Menu';
import { Dashboard } from './dashboard';
import customRoutes from './routes';
import englishMessages from './i18n/en';

import {
    VisitorList,
    VisitorEdit,
    VisitorCreate,
    VisitorIcon,
} from './visitors';
import { CommandList, CommandEdit, CommandCreate, CommandIcon } from './commands';
import { OrderList, OrderEdit, OrderCreate, OrderIcon } from './orders';
import {
    ProductList,
    ProductCreate,
    ProductEdit,
    ProductIcon,
} from './products';
import { ChannelList, ChannelEdit, ChannelIcon, ChannelCreate} from './channels';
import { ReviewList, ReviewEdit, ReviewIcon } from './reviews';
import { UserList, UserEdit, UserCreate, UserIcon } from './users';
import { AccountEdit, AccountIcon } from './account';

import dataProviderFactory from './dataProvider';
import { userTypeRole } from './utilities/constant';
const i18nProvider = locale => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
};

class App extends Component {
    state = { dataProvider: null };

    async componentWillMount() {

        const dataProvider = await dataProviderFactory(
            process.env.REACT_APP_DATA_PROVIDER
        );

        this.setState({ dataProvider });
    }

    render() {
        const { dataProvider } = this.state;

        if (!dataProvider) {
            return (
                <div className="loader-container">
                    <div className="loader">Loading...</div>
                </div>
            );
        }

        return (
            <Admin
                title="Posters Galore Admin"
                dataProvider={dataProvider}
                customReducers={{ theme: themeReducer }}
                customSagas={sagas}
                customRoutes={customRoutes}
                authProvider={authProvider}
                dashboard={Dashboard}
                loginPage={Login}
                appLayout={Layout}
                menu={Menu}
                locale="en"
                i18nProvider={i18nProvider}
            >
                {permissions => [

                <Resource
                    name="customers"
                    list={VisitorList}
                    edit={VisitorEdit}
                    create={VisitorCreate}
                    icon={VisitorIcon}
                />,
                <Resource
                    name="commands"
                    list={CommandList}
                    edit={CommandEdit}
                    create={CommandCreate}
                    icon={CommandIcon}
                    options={{ label: 'Orders' }}
                />,
                <Resource
                    name="order"
                    list={OrderList}
                    edit={OrderEdit}
                    create={OrderCreate}
                    icon={OrderIcon}
                    options={{ label: 'Orders' }}
                />,
                <Resource
                    name="products"
                    list={ProductList}
                    create={ProductCreate}
                    edit={ProductEdit}
                    icon={ProductIcon}
                />,
                <Resource
                    name="channels"
                    list={ChannelList}
                    edit={permissions === userTypeRole[0] ? ChannelEdit : null}
                    create={ChannelCreate}
                    icon={ChannelIcon}
                />,
                <Resource
                    name="reviews"
                    list={ReviewList}
                    edit={ReviewEdit}
                    icon={ReviewIcon}
                />,
                <Resource
                    name="user"
                    list={UserList}
                    edit={permissions === userTypeRole[0] ? UserEdit : null}
                    create={permissions === userTypeRole[0] ? UserCreate : null}
                    icon={UserIcon}
                />,

                ]}
            </Admin>
        );
    }
}

export default App;
