import React from 'react';
import {useField} from 'formik';
import {Form, Input} from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    labelabove: string;
}

function TextInputCustom(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label dangerouslySetInnerHTML={{__html: props.labelabove}}></label>
            <Input {...field} {...props} type={'text'} size={'mini'}/>
            {meta.touched && meta.error ?
                (<p style={{color: 'red'}} dangerouslySetInnerHTML={{__html: `* ${meta.error}`}}/>) : null}
        </Form.Field>
    );
}

export default TextInputCustom;
