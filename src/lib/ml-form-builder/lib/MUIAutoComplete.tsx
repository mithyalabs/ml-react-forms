import { CircularProgress, InputBaseComponentProps, TextField } from '@material-ui/core';
import Autocomplete, { AutocompleteProps, RenderInputParams, RenderOptionState } from '@material-ui/lab/Autocomplete';
import { FormikValues } from 'formik';
import { filter, findIndex, get, isString, reduce } from 'lodash';
import * as React from 'react';
import Highlighter from "react-highlight-words";
import { FormConfig, IFieldProps } from '..';
import { getFieldError } from '../Utils';



export interface IHighlighterProps { //Prop for default highlighter 
    highlightText?: boolean //this props will be used if nad only if this is true
    highlightColor?: string //Highlight color
    highlighterStyles?: object //additional highlight styles

}
const TIME_BETWEEN_REQS = 300;

export interface TQueries<T> {
    term: string,
    sendAt: number,
    order: number,
    options?: T[]
}
export interface IMUIAutoCompleteProps<T> extends Partial<AutocompleteProps<T>> {
    options?: T[]
    renderInputProps?: RenderInputParams
    inputProps?: InputBaseComponentProps
    highlighterProps?: IHighlighterProps
    getQueryResponse?: (newTerm: string) => Promise<Array<T>>
    onItemSelected?: (value: T | T[] | null) => void
    multiple?: boolean
    transformValues?: (values: any) => T | T[],
    clearOnSelect?: boolean; // default: false
}
export interface IProps<T> extends IFieldProps {
    fieldProps?: IMUIAutoCompleteProps<T>
}

export const MUIAutocomplete = <T extends Record<string, any> | string>(props: IProps<T>) => {
    const [query, setQuery] = React.useState<string>();
    console.log(props);
    const ref = React.useRef<HTMLDivElement | null>(null);
    const { fieldProps = {} as IMUIAutoCompleteProps<T>, formikProps = {} as FormikValues, fieldConfig = {} as FormConfig } = props
    const fieldError = getFieldError((fieldConfig.valueKey || ''), formikProps);
    const error = !!fieldError;
    const {
        highlighterProps = {
            highlightText: false,
            highlightColor: '#ffff00'
        } as IHighlighterProps,
        options = [],
        renderInputProps = {} as RenderInputParams,
        inputProps = {} as InputBaseComponentProps,
        getQueryResponse = undefined,
        clearOnSelect = false,
        onItemSelected = undefined,
        getOptionLabel = () => '',
        transformValues,
        multiple,
        ...autoCompleteProps
    } = fieldProps
    const [defaultOptions, setDefaultOptions] = React.useState<T[]>([]);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [globalTerm, setGlobalTerm] = React.useState<string>('')
    const [globalQueries, setGlobalQueries] = React.useState<TQueries<T>[]>([])
    const value = get(formikProps, `values.${get(fieldConfig, 'valueKey') || ''}`) || (multiple ? [] : null);
    const handleQueryResponse = async (newTerm: string) => {
        setLoading(true);
        if (getQueryResponse) {
            try {
                const result = await getQueryResponse(newTerm)
                let newOptions: Array<T> = []
                result.forEach((element) => {
                    newOptions.push(element)
                })
                setLoading(false)
                return newOptions
            } catch (e) {
                setLoading(false)
            }

        }
        return [];
    }
    const handleChange = async (newTerm: string, isWaitingReq: boolean = false): Promise<void> => {
        if (options.length > 0) return
        setQuery(newTerm)
        if (!newTerm) { setDefaultOptions([]); return }
        if ((isWaitingReq && globalTerm !== newTerm) || !newTerm) return;
        setGlobalTerm(newTerm)
        let queries = [...globalQueries]
        let prevQueryIndex = findIndex(queries, q => q.term === newTerm);
        let lastQueryOrder = reduce(queries, function (currentMaxId, query) {
            return Math.max(currentMaxId, query.order);
        }, -1);
        if (prevQueryIndex !== -1) {
            if (queries[prevQueryIndex].options) {
                setDefaultOptions(queries[prevQueryIndex].options || []);
            }
            else {
                queries[prevQueryIndex].order = Math.max(queries[prevQueryIndex].order, lastQueryOrder + 1);

            }
            return;
        }
        let lastQueryIndex = findIndex(queries, q => q.order === lastQueryOrder);
        let lastQuery = queries[lastQueryIndex];
        let now = new Date().getTime();
        if (lastQuery && (now - lastQuery.sendAt < TIME_BETWEEN_REQS)) {
            setGlobalQueries([...queries])
            setTimeout(() => {
                handleChange(newTerm, true)
            }, TIME_BETWEEN_REQS - (now - lastQuery.sendAt))
        }
        else {
            queries.push({
                term: newTerm,
                sendAt: now,
                order: (lastQueryOrder || 0) + 1
            });
            try {
                let newOptions = await handleQueryResponse(newTerm);
                let index = findIndex(queries, q => q.term === newTerm);
                let latestRespOrder = reduce(queries, function (currentMaxId, query) {
                    if (!query.options) return currentMaxId;
                    return Math.max(currentMaxId, query.order);
                }, -1);
                queries[index].options = newOptions;

                if (latestRespOrder < queries[index].order) {
                    setDefaultOptions(newOptions);
                }
                else {
                    // console.log('Ignoring results of:', newTerm)
                }
                setGlobalQueries([...queries])
            } catch (error) {
                console.log('error', error)
                queries = filter(queries, q => q.term !== newTerm);
                setDefaultOptions([]);
                setGlobalQueries([...queries])
            }
        }
    }

    const onItemSelect = (event: React.ChangeEvent<{}>, value: T | T[] | null) => {
        event.preventDefault();
        if (clearOnSelect) {
            setQuery('');
        }
        if (value) {
            if (onItemSelected)
                onItemSelected(value);
            else {
                formikProps.setFieldValue(get(fieldConfig, 'valueKey'), value, false)
            }

        }
    }

    const onInputChange = (event: React.ChangeEvent<{}>, values: string, reason: "input" | "reset" | "clear") => {
        if (event) {
            event.preventDefault();
            if (reason === 'clear') {
                if (onItemSelected) {
                    onItemSelected((multiple ? [] : (isString(value) ? values : null)) as T);
                } else {
                    formikProps.setFieldValue(get(fieldConfig, 'valueKey'), multiple ? [] : (isString(value) ? values : null), false)

                }
            } else if (reason === 'input') {
                console.log(value, event)
            }
        }
    }

    const defaultRenderOptions = (option: T, { inputValue }: RenderOptionState) => {
        /*THIS WILL BE USED TO RENDER OPTION AND HIGHLIGHT IF USER DOESN'T PROVIDE ANY RENDER OPTIONS */
        return (
            <div>

                {
                    (highlighterProps.highlightText === false) ?
                        //NO HIGHLIGHT
                        <span>
                            {getOptionLabel(option)}
                        </span> :
                        //DEFAULT HIGHLIGHT WITH USER STYLES IF PROVIDED
                        <Highlighter
                            searchWords={[inputValue]}
                            textToHighlight={getOptionLabel(option)}
                            highlightStyle={{
                                backgroundColor: highlighterProps.highlightColor,
                                ...highlighterProps.highlighterStyles
                            }}
                        />
                }
            </div>
        );
    }
    const multipleProp = multiple ? { multiple: true as true } : {};
    return <Autocomplete
        onChange={onItemSelect}
        onInputChange={onInputChange}
        getOptionLabel={getOptionLabel}
        onOpen={() => { setOpen(true) }}
        open={open}
        onClose={() => { setOpen(false) }}
        options={options.length > 0 ? options : defaultOptions}
        renderOption={defaultRenderOptions}
        id={fieldConfig.valueKey}
        disableClearable={clearOnSelect}
        value={transformValues ? transformValues(value) : value}
        renderInput={
            params => <TextField
                {...params}
                value={query}
                ref={ref}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e.target.value as string)}
                fullWidth
                error={error}
                helperText={fieldError}
                {...renderInputProps}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="primary" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                    ),
                    ...renderInputProps.InputProps || {}

                }}
                inputProps={{
                    ...params.inputProps,
                    ...inputProps,
                    autoComplete: 'new-password',
                }}

            />
        }
        {...multipleProp}
        {...autoCompleteProps}
    />
}
