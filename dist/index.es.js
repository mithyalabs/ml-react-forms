import React, { useState, useEffect } from 'react';
import { get, map, isString, isEmpty, indexOf, isArray, uniqueId } from 'lodash';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, FormLabel, FormGroup, FormControlLabel, Checkbox, Switch, RadioGroup, Radio, InputAdornment, IconButton, TextField as TextField$1, Paper, List, ListItem, ListItemText } from '@material-ui/core';
import PlacesAutocomplete, { getLatLng, geocodeByAddress } from 'react-places-autocomplete';
import { Close } from '@material-ui/icons';
import { Formik } from 'formik';

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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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

function toVal(mix) {
	var k, y, str='';
	if (mix) {
		if (typeof mix === 'object') {
			if (!!mix.push) {
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

var MUITextField = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var fieldError = get(formikProps, "errors." + fieldProps.name);
    var updatedProps = __assign(__assign({}, fieldProps), { error: !!fieldError, helperText: (fieldError || ''), onChange: formikProps.handleChange, value: get(formikProps, "values." + fieldProps.name) || '' });
    return (React.createElement(TextField, __assign({}, updatedProps)));
};

var getMenuOptions = function (options) {
    return map(options, function (item) {
        if (isString(item))
            return { name: item, value: item };
        return item;
    });
};

var MUISelectField = function (props) {
    var _a = props.fieldConfig, fieldConfig = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b, _c = props.fieldProps, fieldProps = _c === void 0 ? {} : _c;
    var label = fieldProps.label, _d = fieldProps.options, options = _d === void 0 ? [] : _d, emptyItem = fieldProps.emptyItem, helperText = fieldProps.helperText, selectProps = __rest(fieldProps, ["label", "options", "emptyItem", "helperText"]);
    var labelId = fieldConfig.id + "_label";
    var fieldError = get(formikProps, "errors." + fieldProps.name);
    var emptyItemText = (isString(emptyItem) ? emptyItem : 'None');
    var menuOptions = getMenuOptions(options);
    var value = get(formikProps, "values." + fieldProps.name) || ((selectProps.multiple) ? [] : '');
    return (React.createElement(FormControl, { error: !!fieldError },
        label &&
            (React.createElement(InputLabel, { id: labelId }, label)),
        React.createElement(Select, __assign({ labelId: labelId, id: fieldConfig.id, value: value, onChange: formikProps.handleChange }, selectProps),
            (emptyItem) &&
                (React.createElement(MenuItem, { value: "" },
                    React.createElement("em", null, emptyItemText))),
            map(menuOptions, function (item, index) { return (React.createElement(MenuItem, { key: fieldConfig.id + "_menu_item_" + index, value: item.value }, item.name)); })),
        (fieldError || fieldProps.helperText) &&
            (React.createElement(FormHelperText, null, fieldError || fieldProps.helperText))));
};

var MUICheckBox = function (props) {
    var _a = props.fieldConfig, fieldConfig = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b, _c = props.fieldProps, fieldProps = _c === void 0 ? {} : _c;
    var label = fieldProps.label, helperText = fieldProps.helperText, selectOptions = fieldProps.selectOptions, header = fieldProps.header, headerProps = fieldProps.headerProps, groupProps = fieldProps.groupProps, checkboxProps = __rest(fieldProps, ["label", "helperText", "selectOptions", "header", "headerProps", "groupProps"]);
    var fieldError = get(formikProps, "errors." + fieldProps.name);
    var value = get(formikProps, "values." + fieldProps.name);
    return (React.createElement(FormControl, { error: !!fieldError },
        (header) &&
            (React.createElement(FormLabel, __assign({}, headerProps), header)),
        React.createElement(FormGroup, __assign({}, groupProps), (!isEmpty(selectOptions)) ?
            (map(selectOptions, function (item, index) { return (React.createElement(FormControlLabel, { key: fieldConfig.id + "_check_" + index, control: React.createElement(Checkbox, __assign({ checked: (indexOf(value, item) > -1), onChange: formikProps.handleChange, value: item }, __assign(__assign({}, checkboxProps), { id: fieldConfig.id + "_check_" + index }))), label: item || '' })); })) : (React.createElement(FormControlLabel, { control: React.createElement(Checkbox, __assign({ checked: (value || false), onChange: formikProps.handleChange }, checkboxProps)), label: label || '' }))),
        (fieldError || helperText) &&
            (React.createElement(FormHelperText, null, fieldError || helperText))));
};

var MUISwitch = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.fieldProps, fieldProps = _b === void 0 ? {} : _b;
    var label = fieldProps.label, switchProps = __rest(fieldProps, ["label"]);
    var value = get(formikProps, "values." + fieldProps.name);
    var handleOnChange = function () {
        formikProps.setFieldValue(fieldProps.name, !value);
    };
    return (React.createElement(FormControlLabel, { control: React.createElement(Switch, __assign({ checked: !!value, onChange: handleOnChange, inputProps: { 'aria-label': 'secondary checkbox' }, value: value }, switchProps)), label: label || '' }));
};

var MUIRadio = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var header = fieldProps.header, _c = fieldProps.options, options = _c === void 0 ? [] : _c, headerProps = fieldProps.headerProps, helperText = fieldProps.helperText, radioProps = fieldProps.radioProps, radioGroupProps = fieldProps.radioGroupProps;
    var value = get(formikProps, "values." + fieldProps.name) || '';
    var menuOptions = getMenuOptions(options);
    var fieldError = get(formikProps, "errors." + fieldProps.name);
    return (React.createElement(FormControl, { error: !!fieldError },
        (header) &&
            (React.createElement(FormLabel, __assign({}, headerProps), header)),
        React.createElement(RadioGroup, __assign({ name: fieldProps.name, value: value, onChange: formikProps.handleChange }, radioGroupProps), map(menuOptions, function (option, index) {
            var value = option.value, name = option.name, rest = __rest(option, ["value", "name"]);
            return (React.createElement(FormControlLabel, __assign({ key: fieldProps.id + "_option_item_" + index, value: value, label: name, control: React.createElement(Radio, __assign({}, radioProps)) }, rest)));
        })),
        (fieldError || helperText) &&
            (React.createElement(FormHelperText, null, fieldError || helperText))));
};

var SearchField = function (props) {
    var address = props.address, fieldProps = props.fieldProps, _a = props.placeAutocompleteProps, placeAutocompleteProps = _a === void 0 ? {} : _a, value = props.value, resetField = props.resetField, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var inputProps = (value && value.lat && value.lng) ? ({
        endAdornment: (React.createElement(InputAdornment, { position: "end" },
            React.createElement(IconButton, { "aria-label": "remove selected place", edge: "end", onClick: function () { return resetField(); } },
                React.createElement(Close, null))))
    }) : {};
    var _c = fieldProps.textFieldProps, textFieldProps = _c === void 0 ? {} : _c;
    var fieldInputProps = __assign(__assign({}, textFieldProps.InputProps), inputProps);
    var fieldError = get(formikProps, "errors." + fieldProps.name);
    var updatedProps = __assign(__assign({}, __assign(__assign({}, textFieldProps), { InputProps: fieldInputProps })), { error: !!fieldError, helperText: (fieldError || '') });
    return (React.createElement("div", null,
        React.createElement(TextField$1, __assign({ value: address || '' }, placeAutocompleteProps.getInputProps({
            label: textFieldProps.label || 'Search Places',
            className: 'location-search-input'
        }), updatedProps))));
};
var LIST_CONTAINER_STYLES = { position: 'absolute', left: 0, top: '100%', right: 0, zIndex: 500 };
var PlaceList = function (props) {
    var _a = props.placeAutocompleteProps, placeAutocompleteProps = _a === void 0 ? {} : _a, listProps = props.listProps, listItemProps = props.listItemProps, listContainerStyle = props.listContainerStyle;
    var suggestions = placeAutocompleteProps.suggestions, getSuggestionItemProps = placeAutocompleteProps.getSuggestionItemProps;
    return (React.createElement("div", { className: "autocomplete-dropdown-container" },
        React.createElement(Paper, { style: __assign(__assign(__assign({}, LIST_CONTAINER_STYLES), listContainerStyle), { visibility: ((suggestions.length) ? 'visible' : 'hidden') }) },
            React.createElement(List, __assign({}, listProps), suggestions.map(function (suggestion) {
                var className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                // inline style for demonstration purpose
                var style = { cursor: 'pointer' };
                return (React.createElement(ListItem, __assign({ disableGutters: true, dense: true, selected: suggestion.active, key: suggestion.placeId }, getSuggestionItemProps(suggestion, {
                    className: className,
                    style: style
                }), __assign({}, listItemProps)),
                    React.createElement(ListItemText, { primary: suggestion.formattedSuggestion.mainText, secondary: suggestion.formattedSuggestion.secondaryText })));
            })))));
};
var FieldLayout = function (props) {
    var currentAddress = props.currentAddress, selectedValue = props.selectedValue, placeAutocompleteProps = props.placeAutocompleteProps, name = props.name, id = props.id, textFieldProps = props.textFieldProps;
    return (React.createElement("div", null,
        React.createElement(SearchField, { resetField: props.resetField, address: currentAddress, value: selectedValue, placeAutocompleteProps: placeAutocompleteProps, formikProps: props.formikProps, fieldProps: { name: name, id: id, textFieldProps: textFieldProps } }),
        React.createElement(PlaceList, { placeAutocompleteProps: placeAutocompleteProps, listContainerStyle: props.listContainerStyle })));
};
var MUIPlaceSuggest = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var _c = useState(''), address = _c[0], setAddress = _c[1];
    var placeAutocompleteProps = fieldProps.placeAutocompleteProps, locationNameKey = fieldProps.locationNameKey, outputResult = fieldProps.outputResult, fieldLayoutProps = __rest(fieldProps, ["placeAutocompleteProps", "locationNameKey", "outputResult"]);
    var selectedValue = formikProps.values[(fieldProps.name || '')];
    var locationName = formikProps.values[(locationNameKey || '')];
    React.useEffect(function () {
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
    return (React.createElement("div", { style: { position: 'relative' } },
        React.createElement(PlacesAutocomplete, __assign({ value: address, onChange: handleChange, onSelect: handleSelect }, placeAutocompleteProps), function (placeCompleteProps) { return (React.createElement(FieldLayout, __assign({ placeAutocompleteProps: placeCompleteProps, resetField: resetField, currentAddress: address, selectedValue: selectedValue, formikProps: formikProps }, fieldLayoutProps))); })));
};

var ComponentMapConfig = {};
var attachField = function (type, component, props) {
    if (isArray(type)) {
        map(type, function (item) { return ComponentMapConfig[item] = { component: component, props: props }; });
    }
    else
        ComponentMapConfig[type] = { component: component, props: props };
};
attachField('text', React.createElement(MUITextField, null), { type: 'text' });
attachField('password', React.createElement(MUITextField, null), { type: 'password' });
attachField('select', React.createElement(MUISelectField, null));
attachField('checkbox', React.createElement(MUICheckBox, null));
// attachField('date-picker', <MUIDatePicker />, { variant: 'inline', label: 'Select Date' });
// attachField('time-picker', <MUITimePicker />, { variant: 'inline', label: 'Select Time' });
attachField('location-suggest', React.createElement(MUIPlaceSuggest, null));
attachField('switch', React.createElement(MUISwitch, null));
attachField('radio', React.createElement(MUIRadio, null));
var BuildFormRow = function (props) {
    var schema = props.schema, rowId = props.rowId, formikProps = props.formikProps;
    var colItems = (!isArray(schema) ? [schema] : schema);
    var classes = useFormStyles();
    return (React.createElement("div", { className: classes.row }, map(colItems, function (item, index) {
        var componentConfig = ComponentMapConfig[item.type];
        if (!componentConfig)
            return React.createElement("div", { key: rowId + "_field_" + index });
        var fieldProps = __assign(__assign({ id: item.id, name: (item.name || item.valueKey) }, componentConfig.props), item.fieldProps);
        var Component = componentConfig.component;
        return (React.createElement("div", { key: rowId + "_field_" + index, className: clsx(item.classNames, classes.column), style: __assign({ flex: (item.flex || 1) }, item.styles) }, React.cloneElement(Component, { fieldProps: fieldProps, formikProps: formikProps, fieldConfig: item })));
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
    var schema = props.schema, formId = props.formId, formikProps = props.formikProps;
    var _a = useState(schema), formSchema = _a[0], setFormSchema = _a[1];
    useEffect(function () {
        setFormSchema(getUpdateSchema(schema, formId));
    }, [schema]);
    return (React.createElement(React.Fragment, null, map(formSchema, function (configRow, index) {
        var rowId = formId + "_row_" + index;
        return (React.createElement(BuildFormRow, { key: rowId, rowId: rowId, schema: configRow, formikProps: formikProps }));
    })));
};
var MLFormAction = function (props) {
    var formId = props.formId, _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, containerClassNames = props.containerClassNames, _b = props.submitButtonLayout, submitButtonLayout = _b === void 0 ? 'center' : _b, _c = props.submitButtonText, submitButtonText = _c === void 0 ? "Submit" : _c, submitButtonProps = props.submitButtonProps;
    var classes = useFormStyles();
    if (props.actionContent)
        return (React.cloneElement(props.actionContent || React.createElement("div", null), { formikProps: formikProps }));
    var layoutClassName = "action-" + submitButtonLayout;
    return (React.createElement("div", { className: clsx(classes.actionContainer, layoutClassName, containerClassNames) }, (props.actionContent) ?
        (React.cloneElement(props.actionContent || React.createElement("div", null), { formikProps: formikProps, formId: formId }))
        : (React.createElement(React.Fragment, null,
            React.createElement(Button, __assign({ type: "submit", variant: "contained", color: "primary" }, submitButtonProps), submitButtonText)))));
};
var MLFormBuilder = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.actionConfig, actionConfig = _b === void 0 ? {} : _b;
    return (React.createElement("form", { onSubmit: formikProps.handleSubmit },
        React.createElement(MLFormContent, __assign({}, props)),
        (actionConfig.displayActions !== false) &&
            (React.createElement(MLFormAction, __assign({ formId: props.formId, formikProps: formikProps }, actionConfig)))));
};
var useFormStyles = makeStyles(function () {
    return (createStyles({
        row: {
            display: 'flex'
        },
        column: {},
        actionContainer: {
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
        }
    }));
});

var ReactForm = function (props) {
    var config = props.config, formId = props.formId, _a = props.initialValues, initialValues = _a === void 0 ? {} : _a, onSubmit = props.onSubmit, actionConfig = props.actionConfig, formikProps = __rest(props, ["config", "formId", "initialValues", "onSubmit", "actionConfig"]);
    return (React.createElement(Formik, __assign({ initialValues: initialValues, onSubmit: onSubmit }, formikProps), function (formProps) { return (React.createElement(MLFormBuilder, { schema: config, formId: formId, actionConfig: actionConfig, formikProps: formProps })); }));
};

var index = './lib/ReactForm';

export default index;
export { BuildFormRow, MLFormAction, MLFormBuilder, MLFormContent, ReactForm, attachField };
//# sourceMappingURL=index.es.js.map
