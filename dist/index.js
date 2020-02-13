'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var lodash = require('lodash');
var Button = _interopDefault(require('@material-ui/core/Button'));
var CircularProgress = _interopDefault(require('@material-ui/core/CircularProgress'));
var styles = require('@material-ui/core/styles');
var TextField = _interopDefault(require('@material-ui/core/TextField'));
var core = require('@material-ui/core');
var PlacesAutocomplete = require('react-places-autocomplete');
var PlacesAutocomplete__default = _interopDefault(PlacesAutocomplete);
var icons = require('@material-ui/icons');
var pickers = require('@material-ui/pickers');
var formik = require('formik');

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

var getMenuOptions = function (options) {
    return lodash.map(options, function (item) {
        if (lodash.isString(item))
            return { name: item, value: item };
        return item;
    });
};
var getFieldError = function (fieldName, formikProps) {
    var fieldError = lodash.get(formikProps, "errors." + fieldName);
    var isTouched = lodash.get(formikProps, "touched." + fieldName);
    if (!isTouched)
        return '';
    return fieldError;
};

var MUITextField = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var updatedProps = __assign(__assign({}, fieldProps), { error: !!fieldError, helperText: (fieldError || ''), onChange: formikProps.handleChange, onBlur: formikProps.handleBlur, value: lodash.get(formikProps, "values." + fieldProps.name) || '' });
    return (React__default.createElement(TextField, __assign({}, updatedProps)));
};

var MUISelectField = function (props) {
    var _a = props.fieldConfig, fieldConfig = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b, _c = props.fieldProps, fieldProps = _c === void 0 ? {} : _c;
    var label = fieldProps.label, _d = fieldProps.options, options = _d === void 0 ? [] : _d, emptyItem = fieldProps.emptyItem, helperText = fieldProps.helperText, formControlProps = fieldProps.formControlProps, formHelperTextProps = fieldProps.formHelperTextProps, selectProps = __rest(fieldProps, ["label", "options", "emptyItem", "helperText", "formControlProps", "formHelperTextProps"]);
    var labelId = fieldConfig.id + "_label";
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var emptyItemText = (lodash.isString(emptyItem) ? emptyItem : 'None');
    var menuOptions = getMenuOptions(options);
    var value = lodash.get(formikProps, "values." + fieldProps.name) || ((selectProps.multiple) ? [] : '');
    return (React__default.createElement(core.FormControl, __assign({ error: !!fieldError }, formControlProps),
        label &&
            (React__default.createElement(core.InputLabel, { id: labelId }, label)),
        React__default.createElement(core.Select, __assign({ labelId: labelId, id: fieldConfig.id, value: value, onChange: formikProps.handleChange, onBlur: formikProps.handleBlur }, selectProps),
            (emptyItem) &&
                (React__default.createElement(core.MenuItem, { value: "" },
                    React__default.createElement("em", null, emptyItemText))),
            lodash.map(menuOptions, function (item, index) { return (React__default.createElement(core.MenuItem, { key: fieldConfig.id + "_menu_item_" + index, value: item.value }, item.name)); })),
        (fieldError || fieldProps.helperText) &&
            (React__default.createElement(core.FormHelperText, __assign({}, formHelperTextProps), fieldError || fieldProps.helperText))));
};

var MUICheckBox = function (props) {
    var _a = props.fieldConfig, fieldConfig = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b, _c = props.fieldProps, fieldProps = _c === void 0 ? {} : _c;
    var label = fieldProps.label, helperText = fieldProps.helperText, selectOptions = fieldProps.selectOptions, header = fieldProps.header, headerProps = fieldProps.headerProps, groupProps = fieldProps.groupProps, formControlProps = fieldProps.formControlProps, formHelperTextProps = fieldProps.formHelperTextProps, formControlLabelProps = fieldProps.formControlLabelProps, checkboxProps = __rest(fieldProps, ["label", "helperText", "selectOptions", "header", "headerProps", "groupProps", "formControlProps", "formHelperTextProps", "formControlLabelProps"]);
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var value = lodash.get(formikProps, "values." + fieldProps.name);
    return (React__default.createElement(core.FormControl, __assign({ error: !!fieldError }, formControlProps),
        (header) &&
            (React__default.createElement(core.FormLabel, __assign({}, headerProps), header)),
        React__default.createElement(core.FormGroup, __assign({}, groupProps), (!lodash.isEmpty(selectOptions)) ?
            (lodash.map(selectOptions, function (item, index) { return (React__default.createElement(core.FormControlLabel, __assign({ key: fieldConfig.id + "_check_" + index, control: React__default.createElement(core.Checkbox, __assign({ checked: (lodash.indexOf(value, item) > -1), onBlur: formikProps.handleBlur, onChange: formikProps.handleChange, value: item }, __assign(__assign({}, checkboxProps), { id: fieldConfig.id + "_check_" + index }))), label: item || '' }, formControlLabelProps))); })) : (React__default.createElement(core.FormControlLabel, __assign({ control: React__default.createElement(core.Checkbox, __assign({ checked: (value || false), onBlur: formikProps.handleBlur, onChange: formikProps.handleChange }, checkboxProps)), label: label || '' }, formControlLabelProps)))),
        (fieldError || helperText) &&
            (React__default.createElement(core.FormHelperText, __assign({}, formHelperTextProps), fieldError || helperText))));
};

var MUISwitch = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.fieldProps, fieldProps = _b === void 0 ? {} : _b;
    var label = fieldProps.label, switchProps = __rest(fieldProps, ["label"]);
    var value = lodash.get(formikProps, "values." + fieldProps.name);
    var handleOnChange = function () {
        formikProps.setFieldValue(fieldProps.name, !value);
    };
    return (React__default.createElement(core.FormControlLabel, { control: React__default.createElement(core.Switch, __assign({ checked: !!value, onChange: handleOnChange, onBlur: formikProps.handleBlur, inputProps: { 'aria-label': 'secondary checkbox' }, value: value }, switchProps)), label: label || '' }));
};

var MUIRadio = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var header = fieldProps.header, _c = fieldProps.options, options = _c === void 0 ? [] : _c, headerProps = fieldProps.headerProps, helperText = fieldProps.helperText, radioProps = fieldProps.radioProps, radioGroupProps = fieldProps.radioGroupProps, formControlProps = fieldProps.formControlProps, formHelperTextProps = fieldProps.formHelperTextProps;
    var fieldValue = lodash.get(formikProps, "values." + fieldProps.name) || '';
    var menuOptions = getMenuOptions(options);
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    return (React__default.createElement(core.FormControl, __assign({ error: !!fieldError }, formControlProps),
        (header) &&
            (React__default.createElement(core.FormLabel, __assign({}, headerProps), header)),
        React__default.createElement(core.RadioGroup, __assign({ name: fieldProps.name, value: fieldValue, onChange: formikProps.handleChange, onBlur: formikProps.handleBlur }, radioGroupProps), lodash.map(menuOptions, function (option, index) {
            var value = option.value, name = option.name, rest = __rest(option, ["value", "name"]);
            return (React__default.createElement(core.FormControlLabel, __assign({ key: fieldProps.id + "_option_item_" + index, value: value + '', label: name, control: React__default.createElement(core.Radio, __assign({}, radioProps)) }, rest)));
        })),
        (fieldError || helperText) &&
            (React__default.createElement(core.FormHelperText, __assign({}, formHelperTextProps), fieldError || helperText))));
};

var SearchField = function (props) {
    var address = props.address, fieldProps = props.fieldProps, _a = props.placeAutocompleteProps, placeAutocompleteProps = _a === void 0 ? {} : _a, value = props.value, resetField = props.resetField, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var inputProps = (value && value.lat && value.lng) ? ({
        endAdornment: (React__default.createElement(core.InputAdornment, { position: "end" },
            React__default.createElement(core.IconButton, { "aria-label": "remove selected place", edge: "end", onClick: function () { return resetField(); } },
                React__default.createElement(icons.Close, null))))
    }) : {};
    var _c = fieldProps.textFieldProps, textFieldProps = _c === void 0 ? {} : _c;
    var fieldInputProps = __assign(__assign({}, textFieldProps.InputProps), inputProps);
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var updatedProps = __assign(__assign({}, __assign(__assign({}, textFieldProps), { InputProps: fieldInputProps })), { error: !!fieldError, helperText: (fieldError || ''), name: fieldProps.name });
    return (React__default.createElement("div", null,
        React__default.createElement(core.TextField, __assign({ value: address || '' }, placeAutocompleteProps.getInputProps({
            label: textFieldProps.label || 'Search Places',
            className: 'location-search-input',
            onBlur: formikProps.handleBlur
        }), updatedProps))));
};
var LIST_CONTAINER_STYLES = { position: 'absolute', left: 0, top: '100%', right: 0, zIndex: 500 };
var PlaceList = function (props) {
    var _a = props.placeAutocompleteProps, placeAutocompleteProps = _a === void 0 ? {} : _a, listProps = props.listProps, listItemProps = props.listItemProps, listContainerStyle = props.listContainerStyle;
    var suggestions = placeAutocompleteProps.suggestions, getSuggestionItemProps = placeAutocompleteProps.getSuggestionItemProps;
    return (React__default.createElement("div", { className: "autocomplete-dropdown-container" },
        React__default.createElement(core.Paper, { style: __assign(__assign(__assign({}, LIST_CONTAINER_STYLES), listContainerStyle), { visibility: ((suggestions.length) ? 'visible' : 'hidden') }) },
            React__default.createElement(core.List, __assign({}, listProps), suggestions.map(function (suggestion) {
                var className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                // inline style for demonstration purpose
                var style = { cursor: 'pointer' };
                return (React__default.createElement(core.ListItem, __assign({ disableGutters: true, dense: true, selected: suggestion.active, key: suggestion.placeId }, getSuggestionItemProps(suggestion, {
                    className: className,
                    style: style
                }), __assign({}, listItemProps)),
                    React__default.createElement(core.ListItemText, { primary: suggestion.formattedSuggestion.mainText, secondary: suggestion.formattedSuggestion.secondaryText })));
            })))));
};
var FieldLayout = function (props) {
    var currentAddress = props.currentAddress, selectedValue = props.selectedValue, placeAutocompleteProps = props.placeAutocompleteProps, name = props.name, id = props.id, textFieldProps = props.textFieldProps;
    return (React__default.createElement("div", null,
        React__default.createElement(SearchField, { resetField: props.resetField, address: currentAddress, value: selectedValue, placeAutocompleteProps: placeAutocompleteProps, formikProps: props.formikProps, fieldProps: { name: name, id: id, textFieldProps: textFieldProps } }),
        React__default.createElement(PlaceList, { placeAutocompleteProps: placeAutocompleteProps, listContainerStyle: props.listContainerStyle })));
};
var MUIPlaceSuggest = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var _c = React.useState(''), address = _c[0], setAddress = _c[1];
    var placeAutocompleteProps = fieldProps.placeAutocompleteProps, locationNameKey = fieldProps.locationNameKey, outputResult = fieldProps.outputResult, fieldLayoutProps = __rest(fieldProps, ["placeAutocompleteProps", "locationNameKey", "outputResult"]);
    var selectedValue = formikProps.values[(fieldProps.name || '')];
    var locationName = formikProps.values[(locationNameKey || '')];
    React__default.useEffect(function () {
        setAddress(locationName || '');
    }, []);
    var handleChange = function (address) {
        setAddress(address);
    };
    var handleSelect = function (address) { return __awaiter(void 0, void 0, void 0, function () {
        var geoAdress, selectedAddress, latLng;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, PlacesAutocomplete.geocodeByAddress(address)];
                case 1:
                    geoAdress = _a.sent();
                    selectedAddress = geoAdress[0];
                    if (!selectedAddress)
                        return [2 /*return*/];
                    return [4 /*yield*/, PlacesAutocomplete.getLatLng(selectedAddress)];
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
    return (React__default.createElement("div", { style: { position: 'relative' } },
        React__default.createElement(PlacesAutocomplete__default, __assign({ value: address, onChange: handleChange, onSelect: handleSelect }, placeAutocompleteProps), function (placeCompleteProps) { return (React__default.createElement(FieldLayout, __assign({ placeAutocompleteProps: placeCompleteProps, resetField: resetField, currentAddress: address, selectedValue: selectedValue, formikProps: formikProps }, fieldLayoutProps))); })));
};

var MUIDatePicker = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var fieldError = lodash.get(formikProps, "errors." + fieldProps.name);
    var outputFormat = fieldProps.outputFormat, datePickerProps = __rest(fieldProps, ["outputFormat"]);
    var updatedProps = __assign(__assign({}, datePickerProps), { error: !!fieldError, helperText: (fieldError || ''), onChange: function (date) {
            if (!date) {
                formikProps.setFieldValue(fieldProps.name, '', false);
                return;
            }
            var dateValue = (outputFormat === 'date') ? date : date.format(outputFormat || fieldProps.format || 'YYYY-MM-DD');
            formikProps.setFieldValue(fieldProps.name, dateValue, false);
        }, inputValue: lodash.get(formikProps, "values." + fieldProps.name) || null, onError: function (error) {
            // handle as a side effect
            if (error !== fieldError) {
                formikProps.setFieldError(fieldProps.name, error);
            }
        } });
    return (React__default.createElement(pickers.KeyboardDatePicker, __assign({}, updatedProps)));
};
var MUITimePicker = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var fieldError = lodash.get(formikProps, "errors." + fieldProps.name);
    var updatedProps = __assign(__assign({}, fieldProps), { error: !!fieldError, helperText: (fieldError || ''), onChange: function (time) { return formikProps.setFieldValue(fieldProps.name, time, false); }, value: lodash.get(formikProps, "values." + fieldProps.name) || '', onError: function (error) {
            // handle as a side effect
            if (error !== fieldError) {
                formikProps.setFieldError(fieldProps.name, error);
            }
        } });
    return (React__default.createElement(pickers.TimePicker, __assign({}, updatedProps)));
};

var ComponentMapConfig = {};
var attachField = function (type, component, props) {
    if (lodash.isArray(type)) {
        lodash.map(type, function (item) { return ComponentMapConfig[item] = { component: component, props: props }; });
    }
    else
        ComponentMapConfig[type] = { component: component, props: props };
};
attachField('text', React__default.createElement(MUITextField, null), { type: 'text' });
attachField('password', React__default.createElement(MUITextField, null), { type: 'password' });
attachField('select', React__default.createElement(MUISelectField, null));
attachField('checkbox', React__default.createElement(MUICheckBox, null));
attachField('date-picker', React__default.createElement(MUIDatePicker, null), { variant: 'inline', label: 'Select Date' });
attachField('time-picker', React__default.createElement(MUITimePicker, null), { variant: 'inline', label: 'Select Time' });
attachField('location-suggest', React__default.createElement(MUIPlaceSuggest, null));
attachField('switch', React__default.createElement(MUISwitch, null));
attachField('radio', React__default.createElement(MUIRadio, null));
var BuildFormRow = function (props) {
    var schema = props.schema, rowId = props.rowId, formikProps = props.formikProps, _a = props.settings, settings = _a === void 0 ? { horiontalSpacing: 10, verticalSpacing: 10, columnHorizontalPadding: 0 } : _a;
    var columnItems = lodash.get(schema, 'columns');
    var rowSettings = __assign(__assign({}, settings), lodash.get(schema, 'settings'));
    var colItems = (lodash.isArray(schema) ? schema : ((lodash.isArray(columnItems) ? columnItems : [schema])));
    var classes = useFormStyles();
    var rowStyle = { marginBottom: (rowSettings.verticalSpacing || 10) };
    return (React__default.createElement("div", { className: classes.row, style: rowStyle }, lodash.map(colItems, function (item, index) {
        var componentConfig = ComponentMapConfig[item.type];
        var horizontalSpacing = (index === (colItems.length - 1)) ? 0 : (rowSettings.horiontalSpacing || 10);
        if (!componentConfig)
            return React__default.createElement("div", { key: rowId + "_field_" + index });
        var fieldProps = __assign(__assign({ id: item.id, name: (item.name || item.valueKey) }, componentConfig.props), item.fieldProps);
        var Component = componentConfig.component;
        return (React__default.createElement("div", { key: rowId + "_field_" + index, className: clsx(item.classNames, classes.column), style: __assign({ flex: (item.flex || 1), marginRight: horizontalSpacing, paddingLeft: rowSettings.columnHorizontalPadding, paddingRight: rowSettings.columnHorizontalPadding }, item.styles) }, React__default.cloneElement(Component, { fieldProps: fieldProps, formikProps: formikProps, fieldConfig: item })));
    })));
};
var getUpdateSchema = function (schema, formId) {
    return lodash.map(schema, function (schemaItem) {
        if (lodash.isArray(schemaItem)) {
            return lodash.map(schemaItem, function (item) { return (__assign(__assign({}, item), { id: formId + "_" + lodash.uniqueId() })); });
        }
        return __assign(__assign({}, schemaItem), { id: formId + "_" + lodash.uniqueId() });
    });
};
var MLFormContent = function (props) {
    var schema = props.schema, formId = props.formId, formikProps = props.formikProps, settings = props.settings;
    var _a = React.useState(schema), formSchema = _a[0], setFormSchema = _a[1];
    React.useEffect(function () {
        setFormSchema(getUpdateSchema(schema, formId));
    }, [schema]);
    return (React__default.createElement(React__default.Fragment, null, lodash.map(formSchema, function (configRow, index) {
        var rowId = formId + "_row_" + index;
        return (React__default.createElement(BuildFormRow, { key: rowId, rowId: rowId, schema: configRow, formikProps: formikProps, settings: settings }));
    })));
};
var MLFormAction = function (props) {
    var formId = props.formId, _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, containerClassNames = props.containerClassNames, _b = props.submitButtonLayout, submitButtonLayout = _b === void 0 ? 'center' : _b, _c = props.submitButtonText, submitButtonText = _c === void 0 ? "Submit" : _c, submitButtonProps = props.submitButtonProps, loaderProps = props.loaderProps;
    var classes = useFormStyles();
    if (props.actionContent)
        return (React__default.cloneElement(props.actionContent || React__default.createElement("div", null), { formikProps: formikProps }));
    var layoutClassName = "action-" + submitButtonLayout;
    return (React__default.createElement("div", { className: clsx(classes.actionContainer, layoutClassName, containerClassNames) }, (props.actionContent) ?
        (React__default.cloneElement(props.actionContent || React__default.createElement("div", null), { formikProps: formikProps, formId: formId }))
        : (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Button, __assign({ type: "submit", disabled: formikProps.isSubmitting, variant: "contained", color: "primary" }, submitButtonProps), submitButtonText),
            (formikProps.isSubmitting) && (React__default.createElement(CircularProgress, __assign({ size: 24, color: "secondary", className: classes.submitLoader }, loaderProps)))))));
};
var MLFormBuilder = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.isInProgress, isInProgress = _b === void 0 ? false : _b, _c = props.actionConfig, actionConfig = _c === void 0 ? {} : _c;
    React.useEffect(function () {
        if (isInProgress === false)
            formikProps.setSubmitting(false);
    }, [isInProgress]);
    console.log('Current formik props', formikProps);
    return (React__default.createElement("form", { onSubmit: formikProps.handleSubmit },
        React__default.createElement(MLFormContent, __assign({}, props)),
        (actionConfig.displayActions !== false) &&
            (React__default.createElement(MLFormAction, __assign({ formId: props.formId, formikProps: formikProps }, actionConfig)))));
};
var useFormStyles = styles.makeStyles(function () {
    return (styles.createStyles({
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
    return (React__default.createElement(formik.Formik, __assign({ initialValues: initialValues, onSubmit: onSubmit }, formikProps), function (formProps) { return (React__default.createElement(MLFormBuilder, { schema: config, formId: formId, actionConfig: actionConfig, settings: formSettings, formikProps: formProps, isInProgress: isInProgress })); }));
};

var index = './lib/ReactForm';

exports.BuildFormRow = BuildFormRow;
exports.MLFormAction = MLFormAction;
exports.MLFormBuilder = MLFormBuilder;
exports.MLFormContent = MLFormContent;
exports.MUICheckBox = MUICheckBox;
exports.MUIDatePicker = MUIDatePicker;
exports.MUIPlaceSuggest = MUIPlaceSuggest;
exports.MUIRadio = MUIRadio;
exports.MUISelectField = MUISelectField;
exports.MUISwitch = MUISwitch;
exports.MUITextField = MUITextField;
exports.MUITimePicker = MUITimePicker;
exports.ReactForm = ReactForm;
exports.attachField = attachField;
exports.default = index;
//# sourceMappingURL=index.js.map
