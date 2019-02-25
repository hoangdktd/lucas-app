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

export const ChannelIcon = Icon;

const listStyles = {
    name: { padding: '0 12px 0 25px' },
};

export const ChannelList = withStyles(listStyles)(({ classes, ...props }) => (
    <List {...props} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid>
            <TextField source="name" className={classes.name} />
            <EditButton />
        </Datagrid>
    </List>
));

const ChannelTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.channels.name', { smart_count: 1 })} &quot;{
            record.name
        }&quot;
    </span>
));

export const ChannelEdit = props => (
    <Edit title={<ChannelTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const ChannelCreate = ({ classes, ...props }) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);
