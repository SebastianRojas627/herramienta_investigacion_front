interface ComponentProps {
  title: string;
  handleChange: any;
  type: string;
  name: string;
  value: string;
  placeholder?: string
}

// TO DO add optional placeholder

const FormField = ({
  title,
  handleChange,
  type,
  name,
  value,
  placeholder = ''
}: ComponentProps) => {
  return (
    <>
      <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700">
          {title}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
          
        />
      </div>
    </>
  );
};

export default FormField;
