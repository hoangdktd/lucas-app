import React from 'react';
import {
    translate,
    AutocompleteInput,
    BooleanInput,
    DateInput,
    EditController,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TitleForRecord,
    Create
} from 'react-admin';
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';

import Basket from './Basket';
import BasketEdit from './BasketEdit';

const CommandTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.commands.name', { smart_count: 1 })} #{
            record.reference
        }
    </span>
));

const createStyles = {
    root: { display: 'flex', alignItems: 'flex-start' },
    form: { flexGrow: 2, marginRight: '2em' },
};

const CommandCreate = ({ classes, ...props }) => (
    <Create {...props}>
        <div className={classes.root}>
            <Card className={classes.form}>
                <SimpleForm>
                    <DateInput source="date" />
                    <ReferenceInput
                        source="customerIdentity"
                        reference="customers"
                    >
                        <AutocompleteInput
                            optionText={choice =>
                                `${choice.displayName}`
                            }
                        />
                    </ReferenceInput>
                    <SelectInput
                        source="status"
                        choices={[
                            { id: 'delivered', name: 'delivered' },
                            { id: 'ordered', name: 'ordered' },
                            { id: 'cancelled', name: 'cancelled' },
                            { id: 'unknown', name: 'unknown', disabled: true },
                        ]}
                    />
                    <BooleanInput source="returned" />
                </SimpleForm>
            </Card>
            <BasketEdit record={[]} />
        </div>
    </Create>
);

export default withStyles(createStyles)(CommandCreate);
