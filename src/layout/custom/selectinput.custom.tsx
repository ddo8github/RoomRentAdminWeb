import React from 'react';
import {useField} from 'formik';
import {Form, Select} from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
    isLoading: boolean;
    onChange?: (value: any) => void;
}

function SelectInputCustom(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select options={props.options}
                    clearable
                    value={field.value || null}
                    onChange={(event, data) => {
                        helpers.setValue(data.value);
                        if (props.onChange) {
                            props.onChange(data);
                        }
                    }}
                    onBlur={() => helpers.setTouched(true)}
                    placeholder={props.placeholder}
                    loading={props.isLoading}
                    disabled={props.isLoading}
            />
            {meta.touched && meta.error ? (<p style={{color: 'red'}}>{`* ${meta.error}`}</p>) : null}
        </Form.Field>
    );
}

export default SelectInputCustom;
