import React, { useState } from "react";

interface Field {
  id: number;
  type: string;
  value: string | number | Date;
}

const DynamicForm: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [fieldType, setFieldType] = useState<string>("text");
  const [fieldCounter, setFieldCounter] = useState<number>(0);
  const [formData, setFormData] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  const handleAddField = () => {
    setFields([...fields, { id: fieldCounter, type: fieldType, value: "" }]);
    setFieldCounter(fieldCounter + 1);
  };

  const handleRemoveField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[id];
      return newErrors;
    });
  };

  const handleChange = (id: number, value: string | number | Date) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, value } : field))
    );
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value) {
        delete newErrors[id];
      } else {
        newErrors[id] = "This field is required";
      }
      return newErrors;
    });
  };

  const validateFields = (): boolean => {
    const newErrors: { [key: number]: string } = {};
    fields.forEach((field) => {
      if (!field.value) {
        newErrors[field.id] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const data = fields.reduce((acc, field) => {
      acc[`field-${field.id}`] = field.value;
      return acc;
    }, {} as { [key: string]: string | number | Date });

    setFormData(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <select
          className="border border-gray-300 rounded p-2 mr-2"
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddField}
        >
          Add Field
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.id} className="flex items-center mb-2">
            <input
              className={`border ${
                errors[field.id] ? "border-red-500" : "border-gray-300"
              } rounded p-2 mr-2 flex-1`}
              type={field.type}
              value={field.value as string}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              type="button"
              onClick={() => handleRemoveField(field.id)}
            >
              Remove
            </button>
            {errors[field.id] && (
              <span className="text-red-500 text-sm ml-2">
                {errors[field.id]}
              </span>
            )}
          </div>
        ))}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          type="submit"
        >
          Submit
        </button>
      </form>
      {formData && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Form Data:</h2>
          <pre className="bg-gray-100 p-4 rounded">{formData}</pre>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;
