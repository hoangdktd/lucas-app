import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import SettingsIcon from '@material-ui/icons/Settings';
import LabelIcon from '@material-ui/icons/Label';
import {
    translate,
    DashboardMenuItem,
    MenuItemLink,
    Responsive,
    WithPermissions
} from 'react-admin';
import { withRouter } from 'react-router-dom';

import { VisitorIcon } from './visitors';
import { CommandIcon } from './commands';
import { OrderIcon } from './orders';
import { ProductIcon } from './products';
import { ChannelIcon } from './channels';
import { ReviewIcon } from './reviews';
import { UserIcon } from './users';
import { userTypeRole } from './utilities/constant';
const items = [
    { name: 'customers', icon: <VisitorIcon /> },
    // { name: 'segments', icon: <LabelIcon /> },
    // { name: 'commands', icon: <CommandIcon /> },
    { name: 'orders', icon: <OrderIcon />},
    // { name: 'products', icon: <ProductIcon /> },
    { name: 'channels', icon: <ChannelIcon /> },
    // { name: 'reviews', icon: <ReviewIcon /> },
    { name: 'user', icon: <UserIcon /> , permissions:  userTypeRole[0]},
    { name: 'account', icon: <UserIcon />},
];

const Menu = ({ onMenuClick, translate, logout }) => (
    <div>
        <DashboardMenuItem onClick={onMenuClick} />
        {items.map(item => (
            !item.permissions ?
            <MenuItemLink
                key={item.name}
                to={`/${item.name}`}
                primaryText={translate(`resources.${item.name}.name`, {
                    smart_count: 2,
                })}
                leftIcon={item.icon}
                onClick={onMenuClick}
            /> :
            <WithPermissions
                render={({ permissions }) => (
                    permissions === item.permissions
                        ? <MenuItemLink
                            key={item.name}
                            to={`/${item.name}`}
                            primaryText={translate(`resources.${item.name}.name`, {
                                smart_count: 2,
                            })}
                            leftIcon={item.icon}
                            onClick={onMenuClick}
                        />
                        : null
                )}
            />
        ))}
        <Responsive
            xsmall={
                <MenuItemLink
                    to="/configuration"
                    primaryText={translate('pos.configuration')}
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                />
            }
            medium={null}
        />
        <Responsive xsmall={logout} medium={null} />
    </div>
);

const enhance = compose(
    withRouter,
    connect(
        state => ({
            theme: state.theme,
            locale: state.i18n.locale,
        }),
        {}
    ),
    translate
);

export default enhance(Menu);
