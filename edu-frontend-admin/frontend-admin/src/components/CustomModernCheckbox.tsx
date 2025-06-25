interface CustomModernCheckboxProps {
  values: any;
  setFieldValue: any;
}
const CustomModernCheckbox: React.FC<CustomModernCheckboxProps> = ({
  values,
  setFieldValue,
}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={values.saveSubmenu}
        onChange={(e) => setFieldValue("saveSubmenu", e.target.checked)}
        className="peer hidden"
      />
      <div className="w-6 h-6 rounded-md bg-indigo-100 peer-checked:bg-indigo-100 flex items-center justify-center transition-all duration-200 shadow-sm">
        <svg
          className={`w-4 h-4 text-[#5580FF] transition-opacity ${
            values.saveSubmenu ? "opacity-100" : "opacity-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </label>
  );
};

export default CustomModernCheckbox;
