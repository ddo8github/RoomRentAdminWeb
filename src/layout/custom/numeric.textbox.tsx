import React from 'react';
import {Form} from 'semantic-ui-react';
import {useField} from 'formik';
import NumberFormat, {NumberFormatValues} from 'react-number-format';

interface Props {
    placeholder: string;
    name: string;
    labelabove: string;
    numericChange?: (val: NumberFormatValues) => void;
}

function NumericTextbox(props: Props) {
    const [field, meta, helpers] = useField(props.name);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label dangerouslySetInnerHTML={{__html: props.labelabove}}/>
            <div className={'ui mini input'}>
                <NumberFormat isNumericString={true}
                              thousandSeparator={true}
                              onValueChange={(val) => {
                                  helpers.setError(undefined);
                                  helpers.setValue(val.floatValue);
                              }}
                              {...field}
                              {...props}
                /></div>
            {meta.touched && meta.error ?
                (<p style={{color: 'red'}} dangerouslySetInnerHTML={{__html: `* ${meta.error}`}}/>) : null}
        </Form.Field>
    );
}

export default NumericTextbox;
