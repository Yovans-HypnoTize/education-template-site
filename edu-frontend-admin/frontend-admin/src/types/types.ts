export type breadCrumbType = {
  currentPath: string;
  transformedCurrentPath: string;
};

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SubMenuField {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  fieldType: string;
  removeBadgeIconAvailable: boolean;
}

export interface SubMenuItem {
  [x: string]: any;
  id: string;
  title: string;
  fields?: SubMenuField[];
  children?: SubMenuItem[];
}

export interface FormFieldConfig {
  fieldType:
    | "textbox"
    | "textbox-outlined"
    | "basic-select"
    | "autocomplete-outlined"
    | "color-picker"
    | "image-upload"
    | "outlined-phone-input"
    | "number"
    | "password"
    | "textarea"
    | "select"
    | "multiselect"
    | "autocomplete"
    | "radio"
    | "checkbox"
    | "date"
    | "datetime"
    | "time"
    | "fileupload"
    | "switch"
    | "datepicker"
    | "timepicker"
    | "hourtimepicker"
    | "radioGroupOptions";
  name: string;
  showLabel?: boolean;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  optionPlaceholder?: string;
  onChange?: any;
}
