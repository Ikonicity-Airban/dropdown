"use client";

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

  const handleAddField = () => {
    setFields([...fields, { id: fieldCounter, type: fieldType, value: "" }]);
    setFieldCounter(fieldCounter + 1);
  };

  const handleRemoveField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleChange = (id: number, value: string | number | Date) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const handleSubmit = () => {
    console.log("Form Data:", fields);
    // Here you can add form validation and further processing
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {fields.map((field) => (
          <div key={field.id} className="flex items-center mb-2">
            <input
              className="border border-gray-300 rounded p-2 mr-2 flex-1"
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
          </div>
        ))}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
