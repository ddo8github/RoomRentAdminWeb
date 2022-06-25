import React from 'react';
import {useField} from 'formik';
import {Form} from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    isnumber: number;
}

function TextInputCustom(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props} type={props.isnumber === 1 ? 'number' : 'text'}/>
            {meta.touched && meta.error ?
                (<p style={{color: 'red'}} dangerouslySetInnerHTML={{__html: `* ${meta.error}`}}/>) : null}
        </Form.Field>
    );
}

export default TextInputCustom;
