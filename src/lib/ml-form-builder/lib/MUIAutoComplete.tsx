import { TextField, CircularProgress, InputBaseComponentProps } from '@material-ui/core'
import Autocomplete, { AutocompleteProps, RenderInputParams } from '@material-ui/lab/Autocomplete'
import * as React from 'react'
import { IFieldProps } from '..';
import { FormikValues } from 'formik';
import { get } from 'lodash';
import axios, { CancelTokenSource } from 'axios'
type T = {}
export interface IMUIAutoCompleteProps extends Partial<AutocompleteProps<T>> {
    renderInputProps?: RenderInputParams
    inputProps?: InputBaseComponentProps
    delay?: number
    apiUrl?: string
    params?: object
    getOptionLabel?: (x: any) => string
    getRequestParam?: (query: string) => any
}
export interface IProps extends IFieldProps {
    fieldProps?: IMUIAutoCompleteProps
}
type TBaseType = {
    name?: string,
    title?: string
}
var timeoutHandle: NodeJS.Timeout;
var ajaxCallHandle: CancelTokenSource;
export const MUIAutocomplete: React.FC<IProps> = (props) => {
    const [query, setQuery] = React.useState<string>();
    const { fieldProps = {} as IMUIAutoCompleteProps, formikProps = {} as FormikValues } = props
    const {
        apiUrl = '' as string,
        delay = 300 as number,
        params = {},
        renderInputProps = {} as RenderInputParams,
        inputProps = {} as InputBaseComponentProps,
        getOptionLabel = undefined,
        getRequestParam = undefined,

    } = fieldProps
    const [options, setOptions] = React.useState<TBaseType[]>([]);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const defaultGetOptionLabel = (x: TBaseType) => { return x.name || x.title || '' }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuery(event.target.value)
        getQueryResponse(event.target.value);
    }
    const getQueryResponse = async (query: string) => {
        setLoading(true);
        timeoutHandle && clearTimeout(timeoutHandle)
        if (!query)
            setOptions([]);
        else {
            timeoutHandle = setTimeout(async () => {
                /**
                 * @const this.ajaxCallHandle`
                 * contains the token for previos request. If the subsequent request is made
                 * so the previous request with that token will be cancelled
                 */
                if (ajaxCallHandle)
                    ajaxCallHandle.cancel('Next Request is made for ' + query);
                ajaxCallHandle = axios.CancelToken.source();
                const additionalParams = (getRequestParam) && getRequestParam(query);
                try {
                    const response = await axios.get(apiUrl, {
                        params: {
                            ...params,
                            ...additionalParams
                        },
                        cancelToken: ajaxCallHandle.token
                    });
                    const res = await response.data;
                    setOptions(Object.keys(res).map(key => { return res[key] }))
                } catch (err) {
                    console.log('Request Error : ', err)
                }
            }, delay);
        }
        setLoading(false)

    }
    const onItemSelect = (event: React.ChangeEvent<{}>, value: TBaseType | null) => {
        event.preventDefault();

        if (value)
            formikProps.setFieldValue(get(fieldProps, 'name'), value.name || value.title || '', false)
    }
    return <Autocomplete
        onChange={onItemSelect}
        getOptionLabel={getOptionLabel ? getOptionLabel : defaultGetOptionLabel}
        onOpen={() => { setOpen(true) }}
        open={open}
        onClose={() => { setOpen(false) }}
        options={open ? options : []}
        renderInput={
            params => <TextField
                {...params}

                value={query}
                onChange={handleInputChange}
                label='Autocomplete'
                //fullWidth

                InputProps={{
                    ...params.InputProps,

                    endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="primary" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                    ),
                    ...inputProps,
                }}
                {...renderInputProps}
            />
        }

    />
}