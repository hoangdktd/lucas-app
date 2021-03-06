import React from 'react';
import {
    translate,
    Datagrid,
    Create,
    Edit,
    EditButton,
    List,
    NumberField,
    ReferenceManyField,
    SimpleForm,
    TextField,
    TextInput,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/Bookmark';

import ThumbnailField from '../products/ThumbnailField';
import ProductRefField from '../products/ProductRefField';
import { userTypeRole } from '../utilities/constant';
export const ChannelIcon = Icon;

const listStyles = {
    id: { padding: '0 12px 0 25px' },
};

export const ChannelList = withStyles(listStyles)(({ classes, ...props }) => (
    <List {...props} sort={{ field: 'id', order: 'ASC' }}>
        <Datagrid>
            <TextField source="id" className={classes.id} label="resources.channels.fields.channelId" />
            <EditButton />
        </Datagrid>
    </List>
));

const ChannelTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.channels.id', { smart_count: 1 })} &quot;{
            record.id
        }&quot;
    </span>
));

export const ChannelEdit = ({ permissions, ...props }) => (
    <Edit title={<ChannelTitle />} {...props}>
        <SimpleForm>
            {permissions === userTypeRole[0] && <TextInput source="id" label="resources.channels.fields.channelId"/> }
        </SimpleForm>
    </Edit>
);

export const ChannelCreate = ({ classes, ...props }) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" label="resources.channels.fields.channelId"/>
        </SimpleForm>
    </Create>
);
