'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var lodash = require('lodash');
var Button = _interopDefault(require('@material-ui/core/Button'));
var styles = require('@material-ui/core/styles');
var TextField = _interopDefault(require('@material-ui/core/TextField'));
var core = require('@material-ui/core');
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
    var fieldError = lodash.get(formikProps, "errors." + fieldProps.name);
    var updatedProps = __assign(__assign({}, fieldProps), { error: !!fieldError, helperText: (fieldError || ''), onChange: formikProps.handleChange, value: lodash.get(formikProps, "values." + fieldProps.name) || '' });
    return (React__default.createElement(TextField, __assign({}, updatedProps)));
};

var MUISelectField = function (props) {
    var _a = props.fieldConfig, fieldConfig = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b, _c = props.fieldProps, fieldProps = _c === void 0 ? {} : _c;
    var label = fieldProps.label, _d = fieldProps.options, options = _d === void 0 ? [] : _d, emptyItem = fieldProps.emptyItem, helperText = fieldProps.helperText, selectProps = __rest(fieldProps, ["label", "options", "emptyItem", "helperText"]);
    var labelId = fieldConfig.id + "_label";
    var fieldError = lodash.get(formikProps, "errors." + fieldProps.name);
    var emptyItemText = (lodash.isString(emptyItem) ? emptyItem : 'None');
    var menuOptions = lodash.map(options, function (item) {
        if (lodash.isString(item))
            return { name: item, value: item };
        return item;
    });
    var value = lodash.get(formikProps, "values." + fieldProps.name) || ((selectProps.multiple) ? [] : '');
    return (React__default.createElement(core.FormControl, { error: !!fieldError },
        label &&
            (React__default.createElement(core.InputLabel, { id: labelId }, label)),
        React__default.createElement(core.Select, __assign({ labelId: labelId, id: fieldConfig.id, value: value, onChange: formikProps.handleChange }, selectProps),
            (emptyItem) &&
                (React__default.createElement(core.MenuItem, { value: "" },
                    React__default.createElement("em", null, emptyItemText))),
            lodash.map(menuOptions, function (item, index) { return (React__default.createElement(core.MenuItem, { key: fieldConfig.id + "_menu_item_" + index, value: item.value }, item.name)); })),
        (fieldError || fieldProps.helperText) &&
            (React__default.createElement(core.FormHelperText, null, fieldError || fieldProps.helperText))));
};

var MUICheckBox = function (props) {
    var _a = props.fieldConfig, fieldConfig = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b, _c = props.fieldProps, fieldProps = _c === void 0 ? {} : _c;
    var label = fieldProps.label, helperText = fieldProps.helperText, selectOptions = fieldProps.selectOptions, checkboxProps = __rest(fieldProps, ["label", "helperText", "selectOptions"]);
    var fieldError = lodash.get(formikProps, "errors." + fieldProps.name);
    var value = lodash.get(formikProps, "values." + fieldProps.name);
    return (React__default.createElement(core.FormControl, { error: !!fieldError },
        (!lodash.isEmpty(selectOptions)) ?
            (lodash.map(selectOptions, function (item, index) { return (React__default.createElement(core.FormControlLabel, { key: fieldConfig.id + "_check_" + index, control: React__default.createElement(core.Checkbox, __assign({ checked: (lodash.indexOf(value, item) > -1), onChange: formikProps.handleChange, value: item }, __assign(__assign({}, checkboxProps), { id: fieldConfig.id + "_check_" + index }))), label: item || '' })); })) : (React__default.createElement(core.FormControlLabel, { control: React__default.createElement(core.Checkbox, __assign({ checked: (value || false), onChange: formikProps.handleChange }, checkboxProps)), label: label || '' })),
        (fieldError || helperText) &&
            (React__default.createElement(core.FormHelperText, null, fieldError || helperText))));
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
var BuildFormRow = function (props) {
    var schema = props.schema, rowId = props.rowId, formikProps = props.formikProps;
    var colItems = (!lodash.isArray(schema) ? [schema] : schema);
    var classes = useFormStyles();
    return (React__default.createElement("div", { className: classes.row }, lodash.map(colItems, function (item, index) {
        var componentConfig = ComponentMapConfig[item.type];
        if (!componentConfig)
            return React__default.createElement("div", { key: rowId + "_field_" + index });
        var fieldProps = __assign(__assign({ id: item.id, name: (item.name || item.valueKey) }, componentConfig.props), item.fieldProps);
        var Component = componentConfig.component;
        return (React__default.createElement("div", { key: rowId + "_field_" + index, className: clsx(item.classNames, classes.column), style: __assign({ flex: (item.flex || 1) }, item.styles) }, React__default.cloneElement(Component, { fieldProps: fieldProps, formikProps: formikProps, fieldConfig: item })));
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
    var schema = props.schema, formId = props.formId, formikProps = props.formikProps;
    var _a = React.useState(schema), formSchema = _a[0], setFormSchema = _a[1];
    React.useEffect(function () {
        setFormSchema(getUpdateSchema(schema, formId));
    }, [schema]);
    return (React__default.createElement(React__default.Fragment, null, lodash.map(formSchema, function (configRow, index) {
        var rowId = formId + "_row_" + index;
        return (React__default.createElement(BuildFormRow, { key: rowId, rowId: rowId, schema: configRow, formikProps: formikProps }));
    })));
};
var MLFormAction = function (props) {
    var formId = props.formId, _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, containerClassNames = props.containerClassNames, _b = props.submitButtonLayout, submitButtonLayout = _b === void 0 ? 'center' : _b, _c = props.submitButtonText, submitButtonText = _c === void 0 ? "Submit" : _c, submitButtonProps = props.submitButtonProps;
    var classes = useFormStyles();
    if (props.actionContent)
        return (React__default.cloneElement(props.actionContent || React__default.createElement("div", null), { formikProps: formikProps }));
    var layoutClassName = "action-" + submitButtonLayout + ";";
    return (React__default.createElement("div", { className: clsx(classes.actionContainer, layoutClassName, containerClassNames) }, (props.actionContent) ?
        (React__default.cloneElement(props.actionContent || React__default.createElement("div", null), { formikProps: formikProps, formId: formId }))
        : (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Button, __assign({ variant: "contained", color: "primary" }, submitButtonProps), submitButtonText)))));
};
var MLFormBuilder = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.actionConfig, actionConfig = _b === void 0 ? {} : _b;
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
            display: 'flex',
            justifyContent: 'center',
            '& .action-center': {
                justifyContent: 'center'
            },
            '& .action-right': {
                justifyContent: 'right'
            },
            '& .action-fullwidth > button': {
                flex: 1
            }
        }
    }));
});

var ReactForm = function (props) {
    var config = props.config, formId = props.formId, _a = props.initialValues, initialValues = _a === void 0 ? {} : _a, onSubmit = props.onSubmit, actionConfig = props.actionConfig, formikProps = __rest(props, ["config", "formId", "initialValues", "onSubmit", "actionConfig"]);
    return (React__default.createElement(formik.Formik, __assign({ initialValues: initialValues, onSubmit: onSubmit }, formikProps), function (formProps) { return (React__default.createElement(MLFormBuilder, { schema: config, formId: formId, actionConfig: actionConfig, formikProps: formProps })); }));
};

var index = './lib/ReactForm';

exports.BuildFormRow = BuildFormRow;
exports.MLFormAction = MLFormAction;
exports.MLFormBuilder = MLFormBuilder;
exports.MLFormContent = MLFormContent;
exports.ReactForm = ReactForm;
exports.attachField = attachField;
exports.default = index;
//# sourceMappingURL=index.js.map
