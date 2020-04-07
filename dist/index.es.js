import React__default, { createElement, useEffect as useEffect$1, useState as useState$2, Fragment, cloneElement } from 'react';
import { map, isString, get, isEmpty, indexOf, filter, findIndex, reduce, forEach, isArray, uniqueId } from 'lodash';
import Button$1 from '@material-ui/core/Button';
import CircularProgress$1 from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, FormLabel, FormGroup, FormControlLabel, Checkbox, Switch, RadioGroup, Radio, InputAdornment, IconButton, TextField as TextField$1, Paper, List, ListItem, ListItemText, CircularProgress, Button } from '@material-ui/core';
import PlacesAutocomplete, { getLatLng, geocodeByAddress } from 'react-places-autocomplete';
import { Close } from '@material-ui/icons';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import Highlighter from 'react-highlight-words';
import { FieldArray, Formik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function toVal(mix) {
	var k, y, str='';
	if (mix) {
		if (typeof mix === 'object') {
			if (Array.isArray(mix)) {
				for (k=0; k < mix.length; k++) {
					if (mix[k] && (y = toVal(mix[k]))) {
						str && (str += ' ');
						str += y;
					}
				}
			} else {
				for (k in mix) {
					if (mix[k] && (y = toVal(k))) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else if (typeof mix !== 'boolean' && !mix.call) {
			str && (str += ' ');
			str += mix;
		}
	}
	return str;
}

function clsx () {
	var i=0, x, str='';
	while (i < arguments.length) {
		if (x = toVal(arguments[i++])) {
			str && (str += ' ');
			str += x;
		}
	}
	return str;
}

var getMenuOptions = function (options) {
    return map(options, function (item) {
        if (isString(item))
            return { name: item, value: item };
        return item;
    });
};
var getFieldError = function (fieldName, formikProps) {
    var fieldError = get(formikProps, "errors." + fieldName);
    var isTouched = get(formikProps, "touched." + fieldName);
    if (!isTouched && formikProps.submitCount < 1)
        return '';
    return fieldError;
};

var MUITextField = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var updatedProps = __assign(__assign({}, fieldProps), { error: !!fieldError, helperText: fieldError || fieldProps.helperText || '', onChange: formikProps.handleChange, onBlur: formikProps.handleBlur, value: get(formikProps, "values." + fieldProps.name) || '' });
    return (createElement(TextField, __assign({}, updatedProps)));
};

var MUISelectField = function (props) {
    var _a = props.fieldConfig, fieldConfig = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b, _c = props.fieldProps, fieldProps = _c === void 0 ? {} : _c;
    var label = fieldProps.label, _d = fieldProps.options, options = _d === void 0 ? [] : _d, emptyItem = fieldProps.emptyItem, helperText = fieldProps.helperText, formControlProps = fieldProps.formControlProps, formHelperTextProps = fieldProps.formHelperTextProps, _e = fieldProps.emptyMenuItemProps, emptyMenuItemProps = _e === void 0 ? {} : _e, _f = fieldProps.menuItemProps, menuItemProps = _f === void 0 ? {} : _f, _g = fieldProps.inputLabelProps, inputLabelProps = _g === void 0 ? {} : _g, selectProps = __rest(fieldProps, ["label", "options", "emptyItem", "helperText", "formControlProps", "formHelperTextProps", "emptyMenuItemProps", "menuItemProps", "inputLabelProps"]);
    var labelId = fieldConfig.id + "_label";
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var emptyItemText = (isString(emptyItem) ? emptyItem : 'None');
    var menuOptions = getMenuOptions(options);
    var value = get(formikProps, "values." + fieldProps.name) || ((selectProps.multiple) ? [] : '');
    return (createElement(FormControl, __assign({ error: !!fieldError }, formControlProps),
        label &&
            (createElement(InputLabel, __assign({ id: labelId }, inputLabelProps), label)),
        createElement(Select, __assign({ labelId: labelId, id: fieldConfig.id, value: value, onChange: formikProps.handleChange, onBlur: formikProps.handleBlur }, selectProps),
            (emptyItem) &&
                (createElement(MenuItem, __assign({ value: '' }, emptyMenuItemProps), emptyItemText)),
            map(menuOptions, function (item, index) { return (createElement(MenuItem, __assign({ key: fieldConfig.id + "_menu_item_" + index, value: item.value }, menuItemProps), item.name)); })),
        (fieldError || fieldProps.helperText) &&
            (createElement(FormHelperText, __assign({}, formHelperTextProps), fieldError || fieldProps.helperText))));
};

var MUICheckBox = function (props) {
    var _a = props.fieldConfig, fieldConfig = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b, _c = props.fieldProps, fieldProps = _c === void 0 ? {} : _c;
    var label = fieldProps.label, helperText = fieldProps.helperText, _d = fieldProps.options, options = _d === void 0 ? [] : _d, header = fieldProps.header, headerProps = fieldProps.headerProps, checkGroupProps = fieldProps.checkGroupProps, formControlProps = fieldProps.formControlProps, formHelperTextProps = fieldProps.formHelperTextProps, formControlLabelProps = fieldProps.formControlLabelProps, checkboxProps = __rest(fieldProps, ["label", "helperText", "options", "header", "headerProps", "checkGroupProps", "formControlProps", "formHelperTextProps", "formControlLabelProps"]);
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var value = get(formikProps, "values." + fieldProps.name);
    var menuOptions = getMenuOptions(options);
    return (createElement(FormControl, __assign({ error: !!fieldError }, formControlProps),
        (header) &&
            (createElement(FormLabel, __assign({}, headerProps), header)),
        createElement(FormGroup, __assign({}, checkGroupProps), (!isEmpty(menuOptions)) ?
            (map(menuOptions, function (item, index) { return (createElement(FormControlLabel, __assign({ key: fieldConfig.id + "_check_" + index, control: createElement(Checkbox, __assign({ checked: (indexOf(value, item.value) > -1), onBlur: formikProps.handleBlur, onChange: formikProps.handleChange, value: item.value }, __assign(__assign({}, checkboxProps), { id: fieldConfig.id + "_check_" + index }))), label: item.name || '' }, formControlLabelProps))); })) : (createElement(FormControlLabel, __assign({ control: createElement(Checkbox, __assign({ checked: (value || false), onBlur: formikProps.handleBlur, onChange: formikProps.handleChange }, checkboxProps)), label: label || '' }, formControlLabelProps)))),
        (fieldError || helperText) &&
            (createElement(FormHelperText, __assign({}, formHelperTextProps), fieldError || helperText))));
};

var MUISwitch = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.fieldProps, fieldProps = _b === void 0 ? {} : _b;
    var label = fieldProps.label, switchProps = __rest(fieldProps, ["label"]);
    var value = get(formikProps, "values." + fieldProps.name);
    var handleOnChange = function () {
        formikProps.setFieldValue(fieldProps.name, !value);
    };
    return (createElement(FormControlLabel, { control: createElement(Switch, __assign({ checked: !!value, onChange: handleOnChange, onBlur: formikProps.handleBlur, inputProps: { 'aria-label': 'secondary checkbox' }, value: value }, switchProps)), label: label || '' }));
};

var MUIRadio = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var header = fieldProps.header, _c = fieldProps.options, options = _c === void 0 ? [] : _c, headerProps = fieldProps.headerProps, helperText = fieldProps.helperText, radioProps = fieldProps.radioProps, radioGroupProps = fieldProps.radioGroupProps, formControlProps = fieldProps.formControlProps, formHelperTextProps = fieldProps.formHelperTextProps;
    var fieldValue = get(formikProps, "values." + fieldProps.name) || '';
    var menuOptions = getMenuOptions(options);
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    return (createElement(FormControl, __assign({ error: !!fieldError }, formControlProps),
        (header) &&
            (createElement(FormLabel, __assign({}, headerProps), header)),
        createElement(RadioGroup, __assign({ name: fieldProps.name, value: fieldValue, onChange: formikProps.handleChange, onBlur: formikProps.handleBlur }, radioGroupProps), map(menuOptions, function (option, index) {
            var value = option.value, name = option.name, rest = __rest(option, ["value", "name"]);
            return (createElement(FormControlLabel, __assign({ key: fieldProps.id + "_option_item_" + index, value: value + '', label: name, control: createElement(Radio, __assign({}, radioProps)) }, rest)));
        })),
        (fieldError || helperText) &&
            (createElement(FormHelperText, __assign({}, formHelperTextProps), fieldError || helperText))));
};

var useState = useState$2;
var SearchField = function (props) {
    var address = props.address, fieldProps = props.fieldProps, _a = props.placeAutocompleteProps, placeAutocompleteProps = _a === void 0 ? {} : _a, value = props.value, resetField = props.resetField, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var inputProps = (value && value.lat && value.lng) ? ({
        endAdornment: (createElement(InputAdornment, { position: "end" },
            createElement(IconButton, { "aria-label": "remove selected place", edge: "end", onClick: function () { return resetField(); } },
                createElement(Close, null))))
    }) : {};
    var _c = fieldProps.textFieldProps, textFieldProps = _c === void 0 ? {} : _c;
    var fieldInputProps = __assign(__assign({}, textFieldProps.InputProps), inputProps);
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var updatedProps = __assign(__assign({}, __assign(__assign({}, textFieldProps), { InputProps: fieldInputProps })), { error: !!fieldError, helperText: (fieldError || ''), name: fieldProps.name });
    return (createElement("div", null,
        createElement(TextField$1, __assign({ value: address || '' }, placeAutocompleteProps.getInputProps({
            label: textFieldProps.label || 'Search Places',
            className: 'location-search-input',
            onBlur: formikProps.handleBlur
        }), updatedProps))));
};
var LIST_CONTAINER_STYLES = { position: 'absolute', left: 0, top: '100%', right: 0, zIndex: 500 };
var PlaceList = function (props) {
    var _a = props.placeAutocompleteProps, placeAutocompleteProps = _a === void 0 ? {} : _a, listProps = props.listProps, listItemProps = props.listItemProps, listContainerStyle = props.listContainerStyle;
    var suggestions = placeAutocompleteProps.suggestions, getSuggestionItemProps = placeAutocompleteProps.getSuggestionItemProps;
    return (createElement("div", { className: "autocomplete-dropdown-container" },
        createElement(Paper, { style: __assign(__assign(__assign({}, LIST_CONTAINER_STYLES), listContainerStyle), { visibility: ((suggestions.length) ? 'visible' : 'hidden') }) },
            createElement(List, __assign({}, listProps), suggestions.map(function (suggestion) {
                var className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                // inline style for demonstration purpose
                var style = { cursor: 'pointer' };
                return (createElement(ListItem, __assign({ disableGutters: true, dense: true, selected: suggestion.active, key: suggestion.placeId }, getSuggestionItemProps(suggestion, {
                    className: className,
                    style: style
                }), __assign({}, listItemProps)),
                    createElement(ListItemText, { primary: suggestion.formattedSuggestion.mainText, secondary: suggestion.formattedSuggestion.secondaryText })));
            })))));
};
var FieldLayout = function (props) {
    var currentAddress = props.currentAddress, selectedValue = props.selectedValue, placeAutocompleteProps = props.placeAutocompleteProps, name = props.name, id = props.id, textFieldProps = props.textFieldProps;
    return (createElement("div", null,
        createElement(SearchField, { resetField: props.resetField, address: currentAddress, value: selectedValue, placeAutocompleteProps: placeAutocompleteProps, formikProps: props.formikProps, fieldProps: { name: name, id: id, textFieldProps: textFieldProps } }),
        createElement(PlaceList, { placeAutocompleteProps: placeAutocompleteProps, listContainerStyle: props.listContainerStyle })));
};
var MUIPlaceSuggest = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var _c = useState(''), address = _c[0], setAddress = _c[1];
    var placeAutocompleteProps = fieldProps.placeAutocompleteProps, locationNameKey = fieldProps.locationNameKey, outputResult = fieldProps.outputResult, fieldLayoutProps = __rest(fieldProps, ["placeAutocompleteProps", "locationNameKey", "outputResult"]);
    var selectedValue = formikProps.values[(fieldProps.name || '')];
    var locationName = formikProps.values[(locationNameKey || '')];
    useEffect$1(function () {
        setAddress(locationName || '');
    }, []);
    var handleChange = function (address) {
        setAddress(address);
    };
    var handleSelect = function (address) { return __awaiter(void 0, void 0, void 0, function () {
        var geoAdress, selectedAddress, latLng;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, geocodeByAddress(address)];
                case 1:
                    geoAdress = _a.sent();
                    selectedAddress = geoAdress[0];
                    if (!selectedAddress)
                        return [2 /*return*/];
                    return [4 /*yield*/, getLatLng(selectedAddress)];
                case 2:
                    latLng = _a.sent();
                    formikProps.setFieldValue(fieldProps.name, latLng);
                    setAddress(selectedAddress.formatted_address);
                    if (locationName)
                        formikProps.setFieldValue(locationNameKey, selectedAddress.formatted_address);
                    if (outputResult)
                        formikProps.setFieldValue(outputResult, selectedAddress);
                    return [2 /*return*/];
            }
        });
    }); };
    var resetField = function () {
        setAddress('');
        formikProps.setFieldValue(fieldProps.name);
    };
    return (createElement("div", { style: { position: 'relative' } },
        createElement(PlacesAutocomplete, __assign({ value: address, onChange: handleChange, onSelect: handleSelect }, placeAutocompleteProps), function (placeCompleteProps) { return (createElement(FieldLayout, __assign({ placeAutocompleteProps: placeCompleteProps, resetField: resetField, currentAddress: address, selectedValue: selectedValue, formikProps: formikProps }, fieldLayoutProps))); })));
};

var MUIDatePicker = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var value = get(formikProps, "values." + fieldProps.name);
    //const [selectedDate, setSelectedDate] = React.useState<MaterialUiPickersDate | null>(initValue ? initValue : null);
    var fieldError = get(formikProps, "errors." + fieldProps.name);
    var outputFormat = fieldProps.outputFormat, datePickerProps = __rest(fieldProps, ["outputFormat"]);
    var handleDateChange = function (date) {
        //setSelectedDate(date);
        if (!date) {
            formikProps.setFieldValue(fieldProps.name, date, false);
            return;
        }
        var dateValue = (outputFormat === 'date') ? date : date.format(outputFormat || fieldProps.format || 'MM/DD/YYYY');
        formikProps.setFieldValue(fieldProps.name, dateValue, false);
    };
    var updatedProps = __assign(__assign({}, datePickerProps), { error: !!fieldError, helperText: (fieldError || ''), onChange: handleDateChange, value: (!value) ? null : undefined, inputValue: (!value) ? '' : value, format: fieldProps.format || 'MM/DD/YYYY', onError: function (error) {
            // handle as a side effect
            if (error !== fieldError) {
                formikProps.setFieldError(fieldProps.name, error);
            }
        } });
    return (createElement(KeyboardDatePicker, __assign({}, updatedProps)));
};
var MUITimePicker = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var fieldError = get(formikProps, "errors." + fieldProps.name);
    var value = get(formikProps, "values." + fieldProps.name);
    var handleTimeChange = function (time) {
        if (time === null)
            formikProps.setFieldValue(fieldProps.name, time, false);
        else
            formikProps.setFieldValue(fieldProps.name, new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }), false);
    };
    var updatedProps = __assign(__assign({}, fieldProps), { error: !!fieldError, helperText: (fieldError || ''), onChange: handleTimeChange, value: (!value) ? null : undefined, inputValue: (!value) ? '' : value, onError: function (error) {
            if (error !== fieldError) {
                formikProps.setFieldError(fieldProps.name, error);
            }
        } });
    return (createElement(KeyboardTimePicker, __assign({}, updatedProps)));
};

var TIME_BETWEEN_REQS = 300;
var MUIAutocomplete = function (props) {
    var _a = useState$2(), query = _a[0], setQuery = _a[1];
    var _b = props.fieldProps, fieldProps = _b === void 0 ? {} : _b, _c = props.formikProps, formikProps = _c === void 0 ? {} : _c;
    var _d = fieldProps.highlighterProps, highlighterProps = _d === void 0 ? {
        highlightText: false,
        highlightColor: '#ffff00'
    } : _d, _e = fieldProps.options, options = _e === void 0 ? [] : _e, _f = fieldProps.apiUrl, apiUrl = _f === void 0 ? '' : _f, _g = fieldProps.params, params = _g === void 0 ? {} : _g, _h = fieldProps.renderInputProps, renderInputProps = _h === void 0 ? {} : _h, _j = fieldProps.inputProps, inputProps = _j === void 0 ? {} : _j, _k = fieldProps.getOptionLabel, getOptionLabel = _k === void 0 ? undefined : _k, _l = fieldProps.getRequestParam, getRequestParam = _l === void 0 ? undefined : _l, _m = fieldProps.getQueryResponse, getQueryResponse = _m === void 0 ? undefined : _m, _o = fieldProps.renderOption, renderOption = _o === void 0 ? undefined : _o, _p = fieldProps.outputKey, outputKey = _p === void 0 ? '' : _p, _q = fieldProps.onItemSelected, onItemSelected = _q === void 0 ? undefined : _q, autoCompleteProps = __rest(fieldProps, ["highlighterProps", "options", "apiUrl", "params", "renderInputProps", "inputProps", "getOptionLabel", "getRequestParam", "getQueryResponse", "renderOption", "outputKey", "onItemSelected"]);
    var _r = useState$2([]), defaultOptions = _r[0], setDefaultOptions = _r[1];
    var _s = useState$2(false), open = _s[0], setOpen = _s[1];
    var _t = useState$2(false), loading = _t[0], setLoading = _t[1];
    var defaultGetOptionLabel = function (x) { return x.label; };
    var _u = useState$2(''), globalTerm = _u[0], setGlobalTerm = _u[1];
    var _v = useState$2([]), globalQueries = _v[0], setGlobalQueries = _v[1];
    var handleQueryResponse = function (newTerm) { return __awaiter(void 0, void 0, void 0, function () {
        var result, newOptions_1, additionalParams, response, result, newOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    if (!getQueryResponse) return [3 /*break*/, 2];
                    return [4 /*yield*/, getQueryResponse(newTerm)];
                case 1:
                    result = _a.sent();
                    newOptions_1 = [];
                    result.forEach(function (element) {
                        if (typeof element === 'string') {
                            newOptions_1.push({
                                key: element,
                                label: element
                            });
                        }
                        else {
                            newOptions_1.push(element);
                        }
                    });
                    setLoading(false);
                    return [2 /*return*/, newOptions_1];
                case 2:
                    additionalParams = getRequestParam ? getRequestParam(newTerm) : {};
                    return [4 /*yield*/, axios.request({
                            url: apiUrl,
                            method: 'GET',
                            params: __assign(__assign({}, params), additionalParams)
                        })];
                case 3:
                    response = _a.sent();
                    result = response.data;
                    newOptions = [];
                    result.forEach(function (element) {
                        if (typeof element === 'string') {
                            newOptions.push({
                                key: element,
                                label: element
                            });
                        }
                        else {
                            var value = element.name || element.title || element.label || '';
                            newOptions.push({
                                key: value,
                                label: value
                            });
                        }
                    });
                    setLoading(false);
                    return [2 /*return*/, newOptions];
            }
        });
    }); };
    var handleChange = function (newTerm, isWaitingReq) {
        if (isWaitingReq === void 0) { isWaitingReq = false; }
        return __awaiter(void 0, void 0, void 0, function () {
            var queries, prevQueryIndex, lastQueryOrder, lastQueryIndex, lastQuery, now, newOptions, index, latestRespOrder, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setQuery(newTerm);
                        console.log(globalQueries);
                        if (!newTerm) {
                            setDefaultOptions([]);
                            return [2 /*return*/];
                        }
                        if (options.length > 0)
                            return [2 /*return*/];
                        if ((isWaitingReq && globalTerm !== newTerm) || !newTerm)
                            return [2 /*return*/];
                        setGlobalTerm(newTerm);
                        queries = __spreadArrays(globalQueries);
                        prevQueryIndex = findIndex(queries, function (q) { return q.term === newTerm; });
                        lastQueryOrder = reduce(queries, function (currentMaxId, query) {
                            return Math.max(currentMaxId, query.order);
                        }, -1);
                        if (prevQueryIndex !== -1) {
                            if (queries[prevQueryIndex].options) {
                                setDefaultOptions(queries[prevQueryIndex].options || []);
                            }
                            else {
                                queries[prevQueryIndex].order = Math.max(queries[prevQueryIndex].order, lastQueryOrder + 1);
                            }
                            return [2 /*return*/];
                        }
                        lastQueryIndex = findIndex(queries, function (q) { return q.order === lastQueryOrder; });
                        lastQuery = queries[lastQueryIndex];
                        now = new Date().getTime();
                        if (!(lastQuery && (now - lastQuery.sendAt < TIME_BETWEEN_REQS))) return [3 /*break*/, 1];
                        setGlobalQueries(__spreadArrays(queries));
                        setTimeout(function () {
                            handleChange(newTerm, true);
                        }, TIME_BETWEEN_REQS - (now - lastQuery.sendAt));
                        return [3 /*break*/, 5];
                    case 1:
                        queries.push({
                            term: newTerm,
                            sendAt: now,
                            order: (lastQueryOrder || 0) + 1
                        });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, handleQueryResponse(newTerm)];
                    case 3:
                        newOptions = _a.sent();
                        index = findIndex(queries, function (q) { return q.term === newTerm; });
                        latestRespOrder = reduce(queries, function (currentMaxId, query) {
                            if (!query.options)
                                return currentMaxId;
                            return Math.max(currentMaxId, query.order);
                        }, -1);
                        queries[index].options = newOptions;
                        if (latestRespOrder < queries[index].order) {
                            setDefaultOptions(newOptions);
                        }
                        else {
                            console.log('Ignoring results of:', newTerm);
                        }
                        setGlobalQueries(__spreadArrays(queries));
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log('error', error_1);
                        queries = filter(queries, function (q) { return q.term !== newTerm; });
                        setDefaultOptions([]);
                        setGlobalQueries(__spreadArrays(queries));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    var onItemSelect = function (event, value) {
        event.preventDefault();
        if (value) {
            if (onItemSelected)
                onItemSelected(value);
            else
                formikProps.setFieldValue(get(fieldProps, 'name'), value.label, false);
            if (outputKey)
                formikProps.setFieldValue(outputKey, value.key, false);
        }
    };
    var defaultRenderOptions = function (option, _a) {
        var inputValue = _a.inputValue;
        /*THIS WILL BE USED TO RENDER OPTION AND HIGHLIGHT IF USER DOESN'T PROVIDE ANY RENDER OPTIONS */
        return (createElement("div", null, (highlighterProps.highlightText === false) ?
            //NO HIGHLIGHT
            createElement("span", null, option.label) :
            //DEFAULT HIGHLIGHT WITH USER STYLES IF PROVIDED
            createElement(Highlighter, { searchWords: [inputValue], textToHighlight: option.label, highlightStyle: __assign({ backgroundColor: highlighterProps.highlightColor }, highlighterProps.highlighterStyles) })));
    };
    return createElement(Autocomplete, __assign({ onChange: onItemSelect, getOptionLabel: getOptionLabel ? getOptionLabel : defaultGetOptionLabel, onOpen: function () { setOpen(true); }, open: (open && (query !== undefined && query !== '')), onClose: function () { setOpen(false); }, options: open ? (options.length > 0 ? options : defaultOptions) : [], getOptionSelected: function (option, value) { return option.key === value.key; }, renderOption: renderOption ? renderOption : defaultRenderOptions, filterOptions: function (options) { return options; }, renderInput: function (params) { return createElement(TextField$1, __assign({}, params, { value: query, onChange: function (e) { return handleChange(e.target.value); }, fullWidth: true, InputProps: __assign(__assign(__assign({}, params.InputProps), { endAdornment: (createElement(Fragment, null,
                    loading ? createElement(CircularProgress, { color: "primary", size: 20 }) : null,
                    autoCompleteProps.freeSolo && params.InputProps.endAdornment)) }), inputProps) }, renderInputProps)); } }, autoCompleteProps));
};

/* interface IArrayItemProps extends TextFieldProps {
    fieldValue?: string
    formikProps?: FormikValues
    name?: string
    itemIndex?: number

} */
/* export const ArrayItem:React.FC<IArrayItemProps> = (props) => {
    const {fieldValue='',} = props;
    return (
        <div>
            <TextField/>
        </div>
    )
} */
var MUIFieldArray = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.fieldProps, fieldProps = _b === void 0 ? {} : _b;
    var itemType = fieldProps.itemType, _c = fieldProps.addButtonText, addButtonText = _c === void 0 ? 'Add' : _c, addButtonProps = fieldProps.addButtonProps, addButton = fieldProps.addButton, removeButton = fieldProps.removeButton, removeButtonProps = fieldProps.removeButtonProps;
    var values = get(formikProps, "values." + fieldProps.name);
    var itemComponentConfig = getComponentConfig(itemType);
    var classes = useStyles();
    return (React__default.createElement(FieldArray, { name: fieldProps.name, render: function (arrayHelpers) { return (React__default.createElement("div", null,
            (values || []).map(function (value, index) { return (React__default.createElement("div", { key: fieldProps.name + "-" + index, className: classes.arrayItem },
                React__default.cloneElement(itemComponentConfig.component, __assign({ name: fieldProps.name, itemIndex: index, arrayHelpers: arrayHelpers, fieldValue: value, formikProps: formikProps }, itemComponentConfig.props)),
                (removeButton) ? removeButton : (React__default.createElement(IconButton, __assign({ className: classes.arrayRemoveIcon, size: "small", onClick: function () { return arrayHelpers.remove(index); } }, removeButtonProps),
                    React__default.createElement(CloseIcon, null))))); }),
            (addButton) ? addButton : (React__default.createElement(Button, __assign({ type: "button", onClick: function () { return arrayHelpers.push({}); } }, addButtonProps), addButtonText)))); } }));
};
var useStyles = makeStyles(function () {
    return (createStyles({
        arrayItem: {
            position: 'relative'
        },
        arrayRemoveIcon: {
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translate(0,-50%)'
        }
    }));
});

var getOptions = function (startTime, endTime, interval, amPm) {
    var start = amPm ? moment(startTime, 'hh:mm a').toDate() : moment(startTime, 'HH:mm').toDate();
    var end = amPm ? moment(endTime, 'hh:mm a').toDate() : moment(endTime, 'HH:mm').toDate();
    var list = [];
    while (start.getTime() <= end.getTime()) {
        var item = amPm ? moment(start).format('hh:mm a') : moment(start).format('HH:mm');
        list.push({ name: item, value: item });
        start = new Date(start.getTime() + interval * 60000);
    }
    return list;
};
var MUIDropDownTimePicker = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.fieldConfig, fieldConfig = _b === void 0 ? {} : _b, _c = props.formikProps, formikProps = _c === void 0 ? {} : _c;
    var _d = fieldProps.formControlProps, formControlProps = _d === void 0 ? {} : _d, _e = fieldProps.startTime, startTime = _e === void 0 ? '00:00' : _e, _f = fieldProps.endTime, endTime = _f === void 0 ? '23:45' : _f, _g = fieldProps.interval, interval = _g === void 0 ? 15 : _g, _h = fieldProps.amPm, amPm = _h === void 0 ? false : _h, label = fieldProps.label, emptyItem = fieldProps.emptyItem, helperText = fieldProps.helperText, _j = fieldProps.inputLabelProps, inputLabelProps = _j === void 0 ? {} : _j, formHelperTextProps = fieldProps.formHelperTextProps, _k = fieldProps.menuItemProps, menuItemProps = _k === void 0 ? {} : _k, _l = fieldProps.emptyMenuItemProps, emptyMenuItemProps = _l === void 0 ? {} : _l, selectProps = __rest(fieldProps, ["formControlProps", "startTime", "endTime", "interval", "amPm", "label", "emptyItem", "helperText", "inputLabelProps", "formHelperTextProps", "menuItemProps", "emptyMenuItemProps"]);
    var labelId = fieldConfig.id + "_label";
    var value = get(formikProps, "values." + fieldProps.name) || '';
    var list = getOptions(startTime, endTime, interval, amPm);
    var emptyItemText = (isString(emptyItem) ? emptyItem : 'None');
    var onChange = function (event) {
        event.preventDefault();
        if (event.target.value)
            formikProps.setFieldValue(get(fieldProps, 'name'), event.target.value, false);
    };
    console.log(value);
    return (React__default.createElement(FormControl, __assign({}, formControlProps),
        label &&
            (React__default.createElement(InputLabel, __assign({ id: labelId }, inputLabelProps), label)),
        React__default.createElement(Select, __assign({ labelId: labelId, id: fieldConfig.id, value: value, onChange: onChange }, selectProps),
            (emptyItem) &&
                (React__default.createElement(MenuItem, __assign({ value: '' }, menuItemProps, emptyMenuItemProps), emptyItemText)),
            map(list, function (item, index) { return (React__default.createElement(MenuItem, __assign({}, menuItemProps, { key: fieldConfig.id + "_menu_item_" + index, value: item.value }), item.name)); }))));
};

var compare = function (value1, operator, value2) {
    switch (operator) {
        case '>': return value1 > value2;
        case '<': return value1 < value2;
        case '>=': return value1 >= value2;
        case '<=': return value1 <= value2;
        case '==': return value1 == value2;
        case '!=': return value1 != value2;
        case '===': return value1 === value2;
        case '!==': return value1 !== value2;
        default: return false;
    }
};
var getConditionalOutput = function (itemCondition, formikProps) {
    var itemValue = get(formikProps, "values." + itemCondition.key);
    return compare(itemValue, itemCondition.operator, itemCondition.compareValue);
};
var hasTruthyValue = function (logicalOperation, values, formikProps) {
    if (logicalOperation === void 0) { logicalOperation = 'AND'; }
    var outputResult = false;
    forEach(values, function (item, index) {
        var result = getConditionalOutput(item, formikProps);
        if (logicalOperation === 'AND' && !result) {
            outputResult = false;
            return false;
        }
        if (logicalOperation === 'OR' && result) {
            outputResult = true;
            return false;
        }
        if (index === values.length - 1) {
            outputResult = (logicalOperation === 'AND') ? true : false;
        }
        return;
    });
    return outputResult;
};
var getConditionalProps = function (itemConfig, formikProps) {
    var conditionInstructions = itemConfig.condition;
    if (!conditionInstructions || isEmpty(conditionInstructions.values)) {
        return { finalProps: {} };
    }
    var isValidCondition = hasTruthyValue(conditionInstructions.logicOpn, conditionInstructions.values || [], formikProps);
    //console.log('Conditional props valid condition', isValidCondition);
    if (isValidCondition) {
        /*
        IF CONDITION IS TRUE THEN RETURN THE TRUTHY PROPS ELSE RETURN THE DEFAULT PROPS
        */
        return { finalProps: conditionInstructions.postEffectProps };
    }
    else {
        if (conditionInstructions.hidden === true)
            return { finalProps: conditionInstructions.defaultProps, hidden: true };
        else
            return { finalProps: conditionInstructions.defaultProps, };
    }
};

var useEffect = useEffect$1, useState$1 = useState$2;
var ComponentMapConfig = {};
var getComponentConfig = function (type) {
    return ComponentMapConfig[type];
};
var attachField = function (type, component, props) {
    if (isArray(type)) {
        map(type, function (item) { return ComponentMapConfig[item] = { component: component, props: props }; });
    }
    else
        ComponentMapConfig[type] = { component: component, props: props };
};
var setDefaultProps = function (type, props) {
    if (isArray(type)) {
        map(type, function (item) { return ComponentMapConfig[item].props = __assign(__assign({}, ComponentMapConfig[item].props), props); });
    }
    else
        ComponentMapConfig[type].props = __assign(__assign({}, ComponentMapConfig[type].props), props);
};
attachField('text', createElement(MUITextField, null), { type: 'text' });
attachField('password', createElement(MUITextField, null), { type: 'password' });
attachField('select', createElement(MUISelectField, null));
attachField('checkbox', createElement(MUICheckBox, null));
attachField('date-picker', createElement(MUIDatePicker, null), { variant: 'inline', label: 'Select Date' });
attachField('time-picker', createElement(MUITimePicker, null), { variant: 'inline', label: 'Select Time' });
attachField('location-suggest', createElement(MUIPlaceSuggest, null));
attachField('switch', createElement(MUISwitch, null));
attachField('radio', createElement(MUIRadio, null));
attachField('autocomplete', createElement(MUIAutocomplete, null));
attachField('array', createElement(MUIFieldArray, null));
attachField('time-picker-select', createElement(MUIDropDownTimePicker, null));
var BuildFormRow = function (props) {
    var schema = props.schema, rowId = props.rowId, _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.settings, settings = _b === void 0 ? { horiontalSpacing: 10, verticalSpacing: 10, columnHorizontalPadding: 0 } : _b;
    var columnItems = get(schema, 'columns');
    var rowSettings = __assign(__assign({}, settings), get(schema, 'settings'));
    var colItems = (isArray(schema) ? schema : ((isArray(columnItems) ? columnItems : [schema])));
    var classes = useFormStyles();
    var rowStyle = { marginBottom: (rowSettings.verticalSpacing || 10) };
    return (createElement("div", { className: classes.row, style: rowStyle }, map(colItems, function (item, index) {
        var componentConfig = ComponentMapConfig[item.type];
        var horizontalSpacing = (index === (colItems.length - 1)) ? 0 : (rowSettings.horiontalSpacing || 10);
        if (!componentConfig)
            return createElement("div", { key: rowId + "_field_" + index });
        var conditionalProps = getConditionalProps(item, formikProps);
        var fieldProps = __assign(__assign(__assign({ id: item.id, name: (item.name || item.valueKey) }, componentConfig.props), item.fieldProps), conditionalProps.finalProps);
        var Component = componentConfig.component;
        if (conditionalProps.hidden === true)
            return createElement("div", { key: rowId + "_field_" + index });
        return (createElement("div", { key: rowId + "_field_" + index, className: clsx(item.classNames, classes.column), style: __assign({ flex: (item.flex || 1), marginRight: horizontalSpacing, paddingLeft: rowSettings.columnHorizontalPadding, paddingRight: rowSettings.columnHorizontalPadding }, item.styles) }, cloneElement(Component, { fieldProps: fieldProps, formikProps: formikProps, fieldConfig: item })));
    })));
};
var getUpdateSchema = function (schema, formId) {
    return map(schema, function (schemaItem) {
        if (isArray(schemaItem)) {
            return map(schemaItem, function (item) { return (__assign(__assign({}, item), { id: formId + "_" + uniqueId() })); });
        }
        return __assign(__assign({}, schemaItem), { id: formId + "_" + uniqueId() });
    });
};
var MLFormContent = function (props) {
    var schema = props.schema, formId = props.formId, formikProps = props.formikProps, settings = props.settings;
    var _a = useState$1(schema), formSchema = _a[0], setFormSchema = _a[1];
    useEffect(function () {
        setFormSchema(getUpdateSchema(schema, formId));
    }, [schema]);
    return (createElement(Fragment, null, map(formSchema, function (configRow, index) {
        var rowId = formId + "_row_" + index;
        return (createElement(BuildFormRow, { key: rowId, rowId: rowId, schema: configRow, formikProps: formikProps, settings: settings }));
    })));
};
var MLFormAction = function (props) {
    var formId = props.formId, _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, containerClassNames = props.containerClassNames, _b = props.submitButtonLayout, submitButtonLayout = _b === void 0 ? 'center' : _b, _c = props.submitButtonText, submitButtonText = _c === void 0 ? "Submit" : _c, submitButtonProps = props.submitButtonProps, loaderProps = props.loaderProps;
    var classes = useFormStyles();
    if (props.actionContent)
        return (cloneElement(props.actionContent || createElement("div", null), { formikProps: formikProps }));
    var layoutClassName = "action-" + submitButtonLayout;
    return (createElement("div", { className: clsx(classes.actionContainer, layoutClassName, containerClassNames) }, (props.actionContent) ?
        (cloneElement(props.actionContent || createElement("div", null), { formikProps: formikProps, formId: formId }))
        : (createElement(Fragment, null,
            createElement(Button$1, __assign({ type: "submit", disabled: formikProps.isSubmitting, variant: "contained", color: "primary" }, submitButtonProps), submitButtonText),
            (formikProps.isSubmitting) && (createElement(CircularProgress$1, __assign({ size: 24, color: "secondary", className: classes.submitLoader }, loaderProps)))))));
};
var MLFormBuilder = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.isInProgress, isInProgress = _b === void 0 ? false : _b, _c = props.actionConfig, actionConfig = _c === void 0 ? {} : _c;
    useEffect(function () {
        if (isInProgress === false)
            formikProps.setSubmitting(false);
    }, [isInProgress]);
    return (createElement("form", { onSubmit: formikProps.handleSubmit },
        createElement(MLFormContent, __assign({}, props)),
        (actionConfig.displayActions !== false) &&
            (createElement(MLFormAction, __assign({ formId: props.formId, formikProps: formikProps }, actionConfig)))));
};
var useFormStyles = makeStyles(function () {
    return (createStyles({
        row: {
            display: 'flex'
        },
        column: {},
        actionContainer: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            '&.action-center': {
                justifyContent: 'center'
            },
            '&.action-right': {
                justifyContent: 'flex-end'
            },
            '&.action-fullwidth > button': {
                flex: 1
            }
        },
        submitLoader: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            marginTop: -5
        }
    }));
});

var ReactForm = function (props) {
    var config = props.config, formId = props.formId, _a = props.initialValues, initialValues = _a === void 0 ? {} : _a, onSubmit = props.onSubmit, actionConfig = props.actionConfig, formSettings = props.formSettings, _b = props.isInProgress, isInProgress = _b === void 0 ? false : _b, formikProps = __rest(props, ["config", "formId", "initialValues", "onSubmit", "actionConfig", "formSettings", "isInProgress"]);
    return (createElement(Formik, __assign({ initialValues: initialValues, onSubmit: onSubmit }, formikProps), function (formProps) { return (createElement(MLFormBuilder, { schema: config, formId: formId, actionConfig: actionConfig, settings: formSettings, formikProps: formProps, isInProgress: isInProgress })); }));
};

var index = './lib/ReactForm';

export default index;
export { BuildFormRow, MLFormAction, MLFormBuilder, MLFormContent, MUIAutocomplete, MUICheckBox, MUIDatePicker, MUIDropDownTimePicker, MUIFieldArray, MUIPlaceSuggest, MUIRadio, MUISelectField, MUISwitch, MUITextField, MUITimePicker, ReactForm, attachField, getComponentConfig, setDefaultProps };
//# sourceMappingURL=index.es.js.map
